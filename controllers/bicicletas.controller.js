const mongoose = require('mongoose')
const Bicicleta = require('../models/bicicletas.models')
const estacionModel = require('../models/estaciones.models')
const estacion = require('../models/estaciones.models')


exports.getBicicletas = async (req, res) => {
    try {
        const id = req.params.id
        let bicicletas
        if (id) {
            bicicletas = await Bicicleta.find({estacion:id}).populate('estacion')
        } else{
            bicicletas = await Bicicleta.find().populate('estacion')
        }
        return res.status(200).json(bicicletas)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicletas', details: error.message })
    }
}

exports.getBicicletaById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de bicicleta inválido' })
        }
        const bicicleta = await Bicicleta.findById(id).populate('estacion')
        if (!bicicleta) {
            return res.status(404).json({ error: 'Bicicleta no encontrada' })
        }
        res.status(200).json(bicicleta)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta', details: error.message })
    }
}

exports.createBicicleta = async (req, res) => {
    try {
        const { serial, estado, estacion } = req.body
        if (!serial || !estado || !estacion) {
            return res.status(400).json({ error: 'Datos incompletos para crear bicicleta' })
        }
        if (!mongoose.Types.ObjectId.isValid(estacion)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }
        const existe = await Bicicleta.findOne({ serial })
        if (existe) {
            return res.status(400).json({ error: 'El serial ya está registrado' })
        }
        const station = await estacionModel.findById(estacion)

        if (!station) {
            return res.status(400).json({ error: 'La estación no existe' })
        }
        
        if (station.bicicletasDisponibles <= (station.capacidad - 2) ) {
            const capacidad = await estacionModel.findByIdAndUpdate(estacion, {$inc:{bicicletasDisponibles:1}},{new: true, runValidators: true})
            
            const nuevaBicicleta = new Bicicleta({ serial, estado, estacion })
            await nuevaBicicleta.save()
            return res.status(201).json(nuevaBicicleta)
            
        }
        return res.status(400).json({ error: 'Estación no puede tener mas bicicletas' })


    } catch (error) {
        res.status(400).json({ error: 'Error al crear bicicleta', details: error.message })
    }
}

exports.updateBicicleta = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de bicicleta inválido' })
        }

        const updateData = req.body
        if (updateData.estacion && !mongoose.Types.ObjectId.isValid(updateData.estacion)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }

        const station = await estacion.findById(updateData.estacion)
        if (station) {
            
            const bicicletaActualizada = await Bicicleta.findByIdAndUpdate(
                id,
                { $set:{ estado: updateData.estado, estacion: updateData.estacion } },
                { new: true, runValidators: true }
            )
            if (!bicicletaActualizada) {
                return res.status(404).json({ error: 'Bicicleta no encontrada' })
            }
            return res.status(200).json(bicicletaActualizada)
        }
        
        return res.status(400).json({ error: 'ID de estación inválido' })

    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar bicicleta', details: error.message })
    }
}

exports.deleteBicicleta = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de bicicleta inválido' })
        }
        const bicicletaEliminada = await Bicicleta.findByIdAndDelete(id)
        if (!bicicletaEliminada) {
            return res.status(404).json({ error: 'Bicicleta no encontrada' })
        }
        res.status(200).json({ mensaje: 'Bicicleta eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar bicicleta', details: error.message })
    }
}