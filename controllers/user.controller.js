const mongoose = require('mongoose')
const userModel = require('../models/user.models')

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de usuario inválido' })
        }
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario', details: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.status(400).json({ error: 'Datos incompletos para crear usuario' })
        }
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ error: 'El email ya está registrado' })
        }
        const newUser = new userModel({ userName, email, password })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ error: 'Error al crear usuario', details: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de usuario inválido' })
        }
        const updateData = req.body
        const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar usuario', details: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de usuario inválido' })
        }
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message })
    }
}