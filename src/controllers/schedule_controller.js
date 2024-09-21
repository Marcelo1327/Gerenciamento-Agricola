const Schedule = require('../models/schedule')
const {validateToken} = require('../services/tokenServices')

exports.createActicity = async (req, res) => {
    const {activityDescription, startDate, endDate, activityStatus} = req.body
    const cropId = req.params.cropId
    
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    
    
    if(!activityDescription || !startDate || !activityStatus){
        return res.status(400).json({ err: 'Por favor, verifique os campos obrigatórios e tente novamente.'})
    }

    try {
        await validateToken(token)
        const activity = await new Schedule({
            cropId,
            activityDescription,
            startDate,
            endDate,
            activityStatus
        })
        activity.save()
        res.status(201).json({ activity })
    } catch (err) {
        res.status(400).json(err.message)
    }
}

exports.getActivity = async (req, res) => {
    const cropId = req.params.cropId
    
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    try {
        await validateToken(token)
        const activity = await Schedule.find({ cropId })
        res.status(200).json({ activity })
    } catch (err) {
        res.status(400).json(err.message)        
    }

}

exports.updateActivity = async (req, res) => {
    const activityId = req.params.activityId
    const asctivityDate = req.body
    
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    try {
        await validateToken(token)
        const activity = await Schedule.findByIdAndUpdate(activityId, asctivityDate)
        res.status(200).json({ activity })
    } catch (err) {
        res.status(400).json(err.message)        
    }

}

exports.deleteActivity = async (req, res) => {
    const activityId = req.params.activityId
    
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    try {
        await validateToken(token)
        const activity = await Schedule.findByIdAndDelete(activityId)
        res.status(200).json({ activity })
    } catch (err) {
        res.status(400).json(err.message)        
    }

}