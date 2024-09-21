const Fertilizer = require('../models/fertilizations')
const {validateToken} = require('../services/tokenServices')

exports.createFertilization = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    
    const { typeOfFertilizer, dateAplication, quantit, obs } = req.body
    const cropId = req.params.cropId

    if(!dateAplication || !typeOfFertilizer || !quantit){
        return res.status(400).json({ err: 'Por favor, verifique os campos obrigatórios e tente novamente.'})
    }
    
    try {
        await validateToken(token)
        const fertilizer = await new Fertilizer({
            cropId,
            typeOfFertilizer,
            dateAplication,
            quantit,
            obs
        })
        fertilizer.save()
        res.status(201).json({ fertilizer })
    } catch (err) {
        res.status(400).json(err.message)
    }
}

exports.getFertlization = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const cropId = req.params.cropId
    
    try {
        await validateToken(token)
        const fertilizations = await Fertilizer.find({ cropId })
        res.status(200).json({ fertilizations })
    } catch (err) {
        res.status(404).json({ err: 'Fertilização não encontrada'})
    }
}

exports.updateFertilization = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const fertilizationId = req.params.fertilizationId
    const fertilizationData = req.body

    try {
        await validateToken(token)
        const fertilization = await Fertilizer.findByIdAndUpdate(fertilizationId, fertilizationData)
        res.status(201).json({message: "Atualizado com sucesso", fertilization })        
    } catch (err) {
        res.satus(400).json(err.message)
    }
}

exports.deleteFertilization = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const fertilizationId = req.params.fertilizationId
    
    try {
        await validateToken(token)
        const fertilization = await Fertilizer.findByIdAndDelete(fertilizationId)
        res.status(200).json({ message: "Excluido com sucesso", fertilization })
    } catch (err) {
        
    }
}