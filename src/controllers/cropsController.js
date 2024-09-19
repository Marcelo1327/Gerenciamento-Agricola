const Crop = require('../models/crops')
const {validateToken} = require('../services/tokenServices')

exports.createCrop = async(req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const cropData = req.body

    try {
        await validateToken(token)
        const crop = new Crop(cropData)
        await crop.save()

        res.status(200).json({ crop })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

exports.getCrops = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
  
    try {
        await validateToken(token)
        const crop = await Crop.find({})

        res.status(200).json({ crop })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

exports.getCrop = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const cropId = req.params.id
  
    try {
        await validateToken(token)
        const crop = await Crop.findById(cropId)

        res.status(200).json({ crop })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

exports.updateCrop = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const cropId = req.params.id
    const cropData = req.body

    try {
        await validateToken(token)
        const crop = await Crop.findByIdAndUpdate(cropId, cropData)
    
        res.status(200).json({ crop })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

exports.deleteCrop = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const cropId = req.params.id

    try {
        await validateToken(token)
        const crop = await Crop.findByIdAndDelete(cropId)
    
        res.status(200).json({ crop })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}