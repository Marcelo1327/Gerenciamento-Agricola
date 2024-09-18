const jwt = require('jsonwebtoken')
const SECRET_KEY = 'seuSegredoSuperSeguro';

function authenticToken(req, res) {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        console.log(token)
        return res.status(401).json({ err : 'Acesso negado' })
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json({ err: 'Token inválido ou expirado'})
        }

        req.user = user
    })
   
}

module.exports = authenticToken