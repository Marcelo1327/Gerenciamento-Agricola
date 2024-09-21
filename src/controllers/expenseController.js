const Expense = require('../models/expenses')
const Crop = require('../models/crops')

exports.createExpense = async (req, res) => {
    const {typeOfExpense, date, value, description} = req.body
    const cropId = req.params.id

    try {
        const expense = await new Expense({
            cropId,
            typeOfExpense,
            date,
            value,
            description
        })
        expense.save()
        
        res.status(200).json({ crop })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

exports.listExpenses = async (req, res) => {
    const cropId = req.params.id

    try {
        const expenses = await Expense.find({ cropId })
        res.status(200).json({ expenses})
    } catch (err) {
        res.status(500).json({ err: err.message})
    }
}

exports.updateExpense = async (req, res) => {
    const expenseId = req.params.id
    const expenseData = req.body

    try {
        const expense = await Expense.findByIdAndUpdate(expenseId, expenseData)
        const crop = await Crop.findOne({ cropId: expense.cropId})
        res.status(200).json({ expense })
    } catch (err) {
        res.status(500).json({ err: err.message})
    }
}

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id

    try {
        const expense = await Expense.findByIdAndDelete(expenseId)
        res.status(200).json({ expense })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}