const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true},
    isRevoked: { type: Boolean, default: false}
})

module.exports = mongoose.model('Token', tokenSchema)