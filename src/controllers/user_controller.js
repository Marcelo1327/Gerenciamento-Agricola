const User = require('../models/user')
const bcrypt = require('bcryptjs')

const { generateAndStoreToken, validateToken, revokeToken } = require('../services/tokenServices');
;


exports.getUser = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    try {
        const decoded = await validateToken(token)
        const user = await User.find({_id: decoded.userId})

        res.status(200).json({ user })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
    
}
   
exports.postUser = async (req, res) => {
    let { name, email, password } = req.body

    try {
        const hashPassword = await bcrypt.hash(password, 2)
        let user = new User({ name, email, password: hashPassword })
        await user.save()

        res.status(201).json({ message: 'Usuário salvo com sucesso!' })
    } catch (err) {
        res.status(500).json({ err: 'Erro ao salvar o usuário' })
    }
}

exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    
    
    try {
        const user = await User.findOne({ email }) 
        if(!user) {
            return res.status(401).json({ message: 'Credenciais Inválidas' })
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Credenciais Inválidas' })
        }
        
        const token = await generateAndStoreToken(user._id)
        
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json(err.message)
    }
   
}

exports.deleteUser = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    try {
        const decoded = await validateToken(token)
        const user = await User.findByIdAndDelete(decoded.userId)

        res.status(200).json({ user })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]
    const updateData = req.body


    try {
        const decoded = await validateToken(token)
        const user = await User.findByIdAndUpdate(decoded.userId, updateData)

        res.status(200).json({ user })
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}