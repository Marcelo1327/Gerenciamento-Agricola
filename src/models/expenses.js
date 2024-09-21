const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    cropId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Crops'},
    typeOfExpense: {type: String, enum:['workforce', 'fertilizers', 'machinery', 'defensive']},
    date: {type: Date, required: true},
    value: {type: Number, required: true},
    description: {type: String}
})

module.exports = mongoose.model('Expense', expenseSchema)