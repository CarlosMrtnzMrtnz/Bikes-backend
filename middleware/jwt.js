const jwt = require('jsonwebtoken')


exports.verifyToekn = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({error:"Token no suministrado!"})
        }

        token = token.split(' ')[1]
        SECRET_JWT_KEY = process.env.SECRET_JWT_KEY

        jwt.verify(token, SECRET_JWT_KEY, (error, decode)=> {
            if (error) {
                return res.status(401).json({error: "Token invalido!"})
            }
            req.decode = decode
            next()
        })
    } catch (error) {
        res.status(500).json({error:'Error al desencriptar token'})
    }
}