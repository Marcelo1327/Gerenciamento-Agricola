const jwt = require('jsonwebtoken')
const SECRET_KEY = 'seuSegredoSuperSeguro'
const Token = require('../../src/models/token')

const generateAndStoreToken = async (userId) => {
    const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: '1h' })
    
    if (!userId) {
        throw new Error('userId is required');
    }

    const newToken = new Token({
        userId,
        token,
        expiresAt: new Date(Date.now() + 3600000)
    })
    await newToken.save()
    return token
}

const validateToken = async(token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        const dbToken = await Token.find({
            userId: decoded.userId,
            token,
            expiresAt: { $gt: new Date() },
            idRevoked: false
        })

        if(!dbToken) {
            throw new Error('Usuário não autenticado');
        }
        return decoded
    } catch (err) {
        throw new Error('Usuário não autenticado')
    }
}

const revokeToken = async (token) => {
    await Token.updateOne({ token: token}, { isRevoked: true})
}

const removeExpiredTokens = async () => {
    await Token.deleteMany({ expiresAt: { $lt: new Date() } });
};


module.exports = {
    generateAndStoreToken,
    validateToken,
    revokeToken,
    removeExpiredTokens
};