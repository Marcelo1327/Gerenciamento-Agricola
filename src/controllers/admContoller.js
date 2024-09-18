const User = require('../models/user')

exports.adminUpdateUser = async (req, res) => {
    const updateData = req.body
    const userId = req.params.id

    try {
        const user = await User.findByIdAndUpdate(userId, updateData)
        res.status(200).json({ user, message: 'Usuário atualizado com sucesso' })
    } catch (err) {
        res.status(500).json({ err: 'Erro ao atualizar' })
    }
}

exports.adminDeteleUser = async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({ user, message: 'Usuário deletado com sucesso' })
    } catch (err) {
        res.status(500).json({ err: 'Erro ao deletar' })
    }
}
