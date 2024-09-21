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

router.get('/expenses/:id', expenseController.listExpenses)

router.post('/expenses/:id', expenseController.createExpense)

router.put('/expenses/:id', expenseController.updateExpense)

router.delete('/expenses/:id', expenseController.deleteExpense)


module.exports = router