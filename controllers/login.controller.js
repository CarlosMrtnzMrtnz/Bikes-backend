const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')

exports.login = async (req, res)=> {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(400).json({error:"Email invalido!"})
        }

        if (user.password != password) {
            return res.status(400).json({error:"Password invalido!"})
        }

        const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
        const payload = {
            userName: user.userName,
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, SECRET_JWT_KEY, {expiresIn:'24h'})

        if (!token) {
            return res.status(400).json({error:"Un authorized"})
        }
        return res.status(200).json({token, payload})

    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesion', details: error.message })
    }
}