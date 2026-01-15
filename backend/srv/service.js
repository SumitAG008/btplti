const cds = require('@sap/cds')
const axios = require('axios')

module.exports = cds.service.impl(async function() {
  const { RSURequests, Budgets, ApprovalWorkflows, VestingSchedules } = this.entities

  // Validation function
  this.on('validateRSURequest', async (req) => {
    const { requestId } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    // Validate budget availability
    const budget = await SELECT.one.from(Budgets).where({ ID: request.budgetId })
    if (budget.remainingBudget < request.totalValue) {
      return req.error(400, 'Insufficient budget available')
    }

    // Validate employee/candidate data
    if (request.requestType === 'EMPLOYEE') {
      // Validate against SuccessFactors
      const isValid = await validateEmployeeInSF(request.employeeId)
      if (!isValid) {
        return req.error(400, 'Employee not found in SuccessFactors')
      }
    } else if (request.requestType === 'CANDIDATE') {
      // Validate against SmartRecruiters
      const isValid = await validateCandidateInSR(request.candidateId)
      if (!isValid) {
        return req.error(400, 'Candidate not found in SmartRecruiters')
      }
    }

    // Update status
    await UPDATE(RSURequests, requestId).with({ status: 'VALIDATED' })
    
    return 'Request validated successfully'
  })

  // Calculate vesting value
  this.on('calculateVestingValue', async (req) => {
    const { requestId } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    const vestingSchedule = await SELECT.one.from(VestingSchedules).where({ ID: request.vestingScheduleId })
    const totalValue = request.numberOfShares * request.sharePrice
    
    // Calculate based on vesting schedule
    let vestingValue = totalValue
    if (vestingSchedule.vestingType === 'GRADED') {
      vestingValue = totalValue * (vestingSchedule.vestingPercentage / 100)
    }

    // Update request
    await UPDATE(RSURequests, requestId).with({ totalValue: vestingValue })
    
    return vestingValue
  })

  // Check budget availability
  this.on('checkBudgetAvailability', async (req) => {
    const { budgetId, amount } = req.data
    const budget = await SELECT.one.from(Budgets).where({ ID: budgetId })
    
    return budget.remainingBudget >= amount
  })

  // Submit for approval
  this.on('submitForApproval', async (req) => {
    const { requestId } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    // Create approval workflow based on guidelines
    const approvalWorkflow = await createApprovalWorkflow(request)
    
    // Update request status
    await UPDATE(RSURequests, requestId).with({ 
      status: 'SUBMITTED',
      approvalLevel: 1,
      currentApproverId: approvalWorkflow.approverId
    })
    
    return { message: 'Request submitted for approval', workflowId: approvalWorkflow.ID }
  })

  // Approve request
  this.on('approveRequest', async (req) => {
    const { requestId, approverId } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    // Update approval workflow
    const db = await cds.connect.to('db')
    await db.run(
      UPDATE(ApprovalWorkflows)
        .set({ status: 'APPROVED', actionDate: new Date() })
        .where({ requestId: requestId, approverId: approverId, status: 'PENDING' })
    )

    // Check if all approvals are complete
    const pendingApprovals = await SELECT.from(ApprovalWorkflows)
      .where({ requestId: requestId, status: 'PENDING' })
    
    if (pendingApprovals.length === 0) {
      // All approvals complete
      await UPDATE(RSURequests, requestId).with({ status: 'APPROVED' })
      
      // Allocate budget
      await allocateBudget(request.budgetId, request.totalValue)
    } else {
      // Move to next approval level
      const nextApproval = await SELECT.one.from(ApprovalWorkflows)
        .where({ requestId: requestId, status: 'PENDING' })
        .orderBy({ approvalLevel: 'asc' })
      
      await UPDATE(RSURequests, requestId).with({ 
        approvalLevel: nextApproval.approvalLevel,
        currentApproverId: nextApproval.approverId
      })
    }
    
    return { message: 'Request approved', status: 'APPROVED' }
  })

  // Reject request
  this.on('rejectRequest', async (req) => {
    const { requestId, reason } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    // Update approval workflow
    const db = await cds.connect.to('db')
    await db.run(
      UPDATE(ApprovalWorkflows)
        .set({ status: 'REJECTED', comments: reason, actionDate: new Date() })
        .where({ requestId: requestId, status: 'PENDING' })
    )

    // Update request status
    await UPDATE(RSURequests, requestId).with({ status: 'REJECTED' })
    
    return { message: 'Request rejected', reason: reason }
  })

  // Publish to SuccessFactors
  this.on('publishToSuccessFactors', async (req) => {
    const { requestId } = req.data
    const request = await SELECT.one.from(RSURequests).where({ ID: requestId })
    
    if (!request) {
      return req.error(404, 'Request not found')
    }

    if (request.status !== 'APPROVED') {
      return req.error(400, 'Only approved requests can be published to SuccessFactors')
    }

    // Prepare data for SuccessFactors MDF Object
    const sfData = {
      userId: request.employeeId || request.candidateId,
      planId: request.requestNumber,
      cycleNumber: new Date().getFullYear(),
      grantDate: request.grantDate,
      numberOfShares: request.numberOfShares,
      sharePrice: request.sharePrice,
      totalValue: request.totalValue,
      currency: request.currency,
      vestingStartDate: request.vestingStartDate,
      vestingEndDate: request.vestingEndDate,
      status: 'validated'
    }

    // Publish to SuccessFactors via OData API
    const published = await publishToSFMDF(sfData)
    
    if (published) {
      await UPDATE(RSURequests, requestId).with({ 
        publishedToSF: true,
        publishedToSFDate: new Date(),
        status: 'COMPLETED'
      })
      
      return { message: 'Successfully published to SuccessFactors', data: sfData }
    } else {
      return req.error(500, 'Failed to publish to SuccessFactors')
    }
  })

  // Helper functions
  async function validateEmployeeInSF(employeeId) {
    try {
      // TODO: Implement SuccessFactors OData API call
      const sfService = await cds.connect.to('SuccessFactors')
      const result = await sfService.run(SELECT.from('PerPerson').where({ personIdExternal: employeeId }))
      return result.length > 0
    } catch (error) {
      console.error('Error validating employee in SF:', error)
      return false
    }
  }

  async function validateCandidateInSR(candidateId) {
    try {
      // TODO: Implement SmartRecruiters API call
      // This would require SmartRecruiters API integration
      return true // Placeholder
    } catch (error) {
      console.error('Error validating candidate in SR:', error)
      return false
    }
  }

  async function createApprovalWorkflow(request) {
    // Create approval workflow based on business rules
    // This is a simplified version - actual implementation would be more complex
    const approvals = []
    
    // Level 1: Manager approval
    approvals.push({
      requestId: request.ID,
      approvalLevel: 1,
      approverId: request.managerId,
      approvalRole: 'MANAGER',
      status: 'PENDING'
    })
    
    // Level 2: HR approval (if amount exceeds threshold)
    if (request.totalValue > 100000) {
      approvals.push({
        requestId: request.ID,
        approvalLevel: 2,
        approvalRole: 'HR',
        status: 'PENDING'
      })
    }
    
    // Level 3: Board Area Head approval
    approvals.push({
      requestId: request.ID,
      approvalLevel: approvals.length + 1,
      approvalRole: 'BOARD_AREA_HEAD',
      status: 'PENDING'
    })

    // Insert approvals
    for (const approval of approvals) {
      await INSERT.into(ApprovalWorkflows).entries(approval)
    }
    
    return approvals[0]
  }

  async function allocateBudget(budgetId, amount) {
    const budget = await SELECT.one.from(Budgets).where({ ID: budgetId })
    await UPDATE(Budgets, budgetId).with({ 
      allocatedBudget: budget.allocatedBudget + amount,
      remainingBudget: budget.remainingBudget - amount
    })
  }

  async function publishToSFMDF(data) {
    try {
      // TODO: Implement actual SuccessFactors OData API call to MDF Object
      // This would use the SuccessFactors OData API to create/update MDF objects
      const sfService = await cds.connect.to('SuccessFactors')
      // await sfService.run(INSERT.into('LTI_ACR').entries(data))
      return true // Placeholder
    } catch (error) {
      console.error('Error publishing to SuccessFactors:', error)
      return false
    }
  }
})
