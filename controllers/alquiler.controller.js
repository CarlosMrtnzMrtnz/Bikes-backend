const mongoose = require('mongoose')
const Alquiler = require('../models/alquiler.models')
const estacionModel = require('../models/estaciones.models')
const bicicletaModel = require('../models/bicicletas.models')
const alquiler = require('../models/alquiler.models')


exports.getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.find()
            .populate('usuario')
            .populate('estacionSalida')
        res.status(200).json(alquileres)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener alquileres', details: error.message })
    }
}

exports.getAlquilerById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de alquiler inválido' })
        }
        const alquiler = await Alquiler.find({usuario:id})
            .populate('usuario')
            .populate('bicicleta')
            .populate('estacionSalida')
        if (!alquiler) {
            return res.status(404).json({ error: 'Alquiler no encontrado' })
        }
        res.status(200).json(alquiler)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener alquiler', details: error.message })
    }
}

exports.createAlquiler = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { usuario, bicicleta, estacionSalida, fechaInicio, activo } = req.body

        if (!usuario || !bicicleta || !estacionSalida) {
            return res.status(400).json({ error: 'Datos incompletos para crear alquiler' })
        }
        if (
            !mongoose.Types.ObjectId.isValid(usuario) ||
            !mongoose.Types.ObjectId.isValid(bicicleta) ||
            !mongoose.Types.ObjectId.isValid(estacionSalida)
        ) {
            return res.status(400).json({ error: 'ID de usuario, bicicleta o estación inválido' })
        }

        const ocupado = await alquiler.findOne({usuario:usuario, activo:true})
        if (ocupado) {
            return res.status(400).json({error:'Usuario tiene un alquiler'})
        }

        const bike = await bicicletaModel.findById(bicicleta).session(session)
        if (!bike || bike.estado !== "disponible") {
            return res.status(400).json({ error: 'La bicicleta no está disponible' })
        }

        const station = await estacionModel.findById(estacionSalida).session(session)
        if (!station || station.bicicletasDisponibles <= 0) {
            return res.status(400).json({ error: 'La estación no tiene bicicletas disponibles' })
        }

        const nuevoAlquiler = new Alquiler({
            usuario,
            bicicleta,
            estacionSalida,
            fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(),
            activo: activo !== undefined ? activo : true
        })

        const alquilado = await nuevoAlquiler.save({ session })

        await estacionModel.findByIdAndUpdate(
            estacionSalida,
            { $inc: { bicicletasDisponibles: -1 } },
            { new: true, runValidators: true, session }
        )

        await bicicletaModel.findByIdAndUpdate(
            bicicleta,
            { $set: { estado: "ocupada" } },
            { new: true, runValidators: true, session }
        )

        await session.commitTransaction()
        session.endSession()

        return res.status(201).json(alquilado)

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ error: 'Error al crear alquiler', details: error.message })
    }
}


exports.updateAlquiler = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de alquiler inválido' })
        }
        const updateData = req.body
        if (updateData.usuario && !mongoose.Types.ObjectId.isValid(updateData.usuario)) {
            return res.status(400).json({ error: 'ID de usuario inválido' })
        }
        if (updateData.bicicleta && !mongoose.Types.ObjectId.isValid(updateData.bicicleta)) {
            return res.status(400).json({ error: 'ID de bicicleta inválido' })
        }
        if (updateData.estacionSalida && !mongoose.Types.ObjectId.isValid(updateData.estacionSalida)) {
            return res.status(400).json({ error: 'ID de estación inválido' })
        }
        
        const alquilerActualizado = await Alquiler.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
        if (!alquilerActualizado) {
            return res.status(404).json({ error: 'Alquiler no encontrado' })
        }
        res.status(200).json(alquilerActualizado)
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar alquiler', details: error.message })
    }
}

exports.estatus = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    let rent = await Alquiler.findById(id)
    if (!rent) {
      return res.status(404).json({ message: "Alquiler no encontrado" })
    }

    // asignar cambios al documento
    rent = Object.assign(rent, body)

    const update = await rent.save()
    if (!update) {
      return res.status(500).json({ message: "No se pudo actualizar el alquiler" })
    }

    // actualizar la bicicleta
    const biciUpdate = await bicicletaModel.findByIdAndUpdate(
      rent.bicicleta,
      { $set: { estacion: rent.estacionLlegada, estado: "disponible" } },
      { new: true, runValidators: true }
    )

    if (!biciUpdate) {
      return res.status(500).json({ message: "No se pudo actualizar la bicicleta" })
    }

    // actualizar la estación
    await estacionModel.findByIdAndUpdate(rent.estacionLlegada, {
      $inc: { bicicletasDisponibles: +1 },
    })

    return res.status(200).json({
      message: "Alquiler actualizado correctamente",
      alquiler: update,
      bicicleta: biciUpdate,
    })
  } catch (error) {
    return res.status(400).json({
      error: "Error al actualizar alquiler",
      details: error.message,
    })
  }
}

exports.deleteAlquiler = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de alquiler inválido' })
        }
        const alquilerEliminado = await Alquiler.findByIdAndDelete(id)
        if (!alquilerEliminado) {
            return res.status(404).json({ error: 'Alquiler no encontrado' })
        }
        res.status(200).json({ mensaje: 'Alquiler eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar alquiler', details: error.message })
    }
}