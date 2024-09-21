const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    cropId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Crops'},
    activityDescription: {type: String},
    startDate: {type: Date, required: true},
    endDate: {type: Date},
    activityStatus: {type: String, enum:['pending', 'completed'], default: 'pending'}
}) 

module.exports = mongoose.model('Schedule', scheduleSchema)