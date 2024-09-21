const express = require('express')
const router = express.Router()
const cropsController = require('../controllers/crops_controller')
const expenseController = require('../controllers/expense_controller')
const fertilizationController = require('../controllers/fertilizations_controller')
const scheduleController = require('../controllers/schedule_controller')

router.get('/', cropsController.getCrops)

router.get('/:id', cropsController.getCrop)

router.post('/', cropsController.createCrop)

router.put('/:id', cropsController.updateCrop)

router.delete('/:id', cropsController.deleteCrop)

//area expenses

router.get('/:cropId/expenses', expenseController.listExpenses)

router.post('/:cropId/expenses', expenseController.createExpense)

router.put('/:cropId/expenses/:fertilizationId', expenseController.updateExpense)

router.delete('/:cropId/expenses/:fertilizationId', expenseController.deleteExpense)

//area fertilizer

router.get('/:cropId/fertilizations', fertilizationController.getFertlization)

router.post('/:cropId/fertilizations', fertilizationController.createFertilization)

router.put('/:cropId/fertilizations/:fertilizationId', fertilizationController.updateFertilization)

router.delete('/:cropId/fertilizations/:fertilizationId', fertilizationController.deleteFertilization)


//area schedule

router.get('/:cropId/schedule', scheduleController.getActivity)

router.post('/:cropId/schedule', scheduleController.createActicity)

router.put('/:cropId/schedule/:activityId', scheduleController.updateActivity)

router.delete('/:cropId/schedule/:activityId', scheduleController.deleteActivity)

module.exports = router