const mongoose = require('mongoose')
const estacionModel = require('../models/estaciones.models')
const Bicicleta = require('../models/bicicletas.models')
const estacion = require('../models/estaciones.models')

exports.getEstaciones = async (req, res) => {
    try {
        const estaciones = await estacionModel.find()
        res.status(200).json(estaciones)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estaciones', details: error.message })
    }
}

exports.getEstacionById = async (req, res) => {
    try {
        const { id } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }
        const estacion = await estacionModel.findById(id)
        
        if (!estacion) {
            return res.status(404).json({ error: 'Estación no encontrada' })
        }
        res.status(200).json(estacion)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la estación', details: error.message })
    }
}

exports.createEstacion = async (req, res) => {
    try {
        const { nombre, ubicacion} = req.body
        if (!nombre || !ubicacion || typeof ubicacion.latitud !== 'number' || typeof ubicacion.longitud !== 'number') {
            return res.status(400).json({ error: 'Datos incompletos o inválidos para crear la estación' })
        }
        let estacion = await estacionModel.findOne({nombre})
        if (!!estacion) {
            return res.status(400).json({ error: 'Estacion ya existe!' })
        }
        console.log(estacion);
        
        const nuevaEstacion = new estacionModel({
            nombre,
            ubicacion
        })
        await nuevaEstacion.save()
        res.status(201).json(nuevaEstacion)
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la estación', details: error.message })
    }
}

exports.updateEstacion = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }
        const updateData = req.body
        if (updateData.ubicacion && (typeof updateData.ubicacion.latitud !== 'number' || typeof updateData.ubicacion.longitud !== 'number')) {
            return res.status(400).json({ error: 'Ubicación inválida' })
        }
        const estacionActualizada = await estacionModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
        if (!estacionActualizada) {
            return res.status(404).json({ error: 'Estación no encontrada' })
        }
        res.status(200).json(estacionActualizada)
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la estación', details: error.message })
    }
}

exports.deleteEstacion = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }
        const estacionEliminada = await estacionModel.findByIdAndDelete(id)
        if (!estacionEliminada) {
            return res.status(404).json({ error: 'Estación no encontrada' })
        }
        if (estacionEliminada) {
            await Bicicleta.updateMany({estacion:id},{$set:{estacion:null}})
        }
        return res.status(200).json({ mensaje: 'Estación eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la estación', details: error.message })
    }
}