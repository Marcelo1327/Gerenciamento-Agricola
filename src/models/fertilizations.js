const mongoose = require('mongoose')

const fertilizationSchema = mongoose.Schema({
    cropId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Crops'},
    typeOfFertilizer: {type: String, required: true},
    dateAplication: {type: Date, required: true},
    quantit: {type: Number, required: true},
    obs: String
})

module.exports = mongoose.model('Fertilization', fertilizationSchema)