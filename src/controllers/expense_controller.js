const Expense = require('../models/expenses')
const {validateToken} = require('../services/tokenServices')

exports.createExpense = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
  

    const {typeOfExpense, date, value, description} = req.body
    const cropId = req.params.id
    
    if(!typeOfExpense || !date || !value || !description) {
       return res.status(400).json({ err: 'Por favor, verifique os campos obrigatórios e tente novamente.'})
    }
    
    try {
        await validateToken(token)
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
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
  

    const cropId = req.params.id
    
    try {
        await validateToken(token)
        const expenses = await Expense.find({ cropId })
       
        res.status(200).json({ expenses })
    } catch (err) {
        res.status(404).json({ err: err.message})
    }
}

exports.updateExpense = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
  

    const expenseId = req.params.id
    const expenseData = req.body
    
    try {
        await validateToken(token)
        const expense = await Expense.findByIdAndUpdate(expenseId, expenseData)
        
        res.status(200).json({ expense })
    } catch (err) {
        res.status(500).json({ err: err.message})
    }
}

exports.deleteExpense = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
  

    const expenseId = req.params.id
    
    try {
        await validateToken(token)
        const expense = await Expense.findByIdAndDelete(expenseId)
        res.status(200).json({ expense })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}