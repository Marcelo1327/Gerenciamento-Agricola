const express = require('express')
const router = express.Router()
const cropsController = require('../controllers/cropsController')
const expenseController = require('../controllers/expenseController')

router.get('/', cropsController.getCrops)

router.get('/:id', cropsController.getCrop)

router.post('/', cropsController.createCrop)

router.put('/:id', cropsController.updateCrop)

router.delete('/:id', cropsController.deleteCrop)

//area expenses

router.get('/:id/expenses', expenseController.listExpenses)

router.post('/:id/expenses', expenseController.createExpense)

router.put('/:id/expenses/:id', expenseController.updateExpense)

router.delete('/:id/expenses/:id', expenseController.deleteExpense)


module.exports = router