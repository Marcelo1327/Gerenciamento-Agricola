const mongoose = require('mongoose')

const cropsSchema = mongoose.Schema({
    nameOfCrop: {type: String, required: true},
    startData: {type: Date},
    endData: {type: Date},
    typeOfCulture: {type: String},
    status: {type: String, enum: ['in-progress', 'conluded', 'cancelled'], default: 'in-progress'}
})

module.exports = mongoose.model('Crops', cropsSchema)