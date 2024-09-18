const jwt = require('jsonwebtoken')
const SECRET_KEY = 'seuSegredoSuperSeguro'
const Token = require('../../src/models/token')

const validateToken = async(token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)

        const dbToken = await Token.findOne({
            token,
            userId: decoded.userId,
            expiresAt: { $gt: new Date() },
            idRevoked: false
        })

        if(!dbToken) {
            throw new Error('Token inválido ou expirado');
        }
        return decoded
    } catch (err) {
        throw new Error('Token inválido ou expirado')
    }
}

module.exports = validateToken