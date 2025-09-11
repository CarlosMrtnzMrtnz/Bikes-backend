const mongoose = require('mongoose')

const alquilerSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta',
        required: true
    },
    estacionSalida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estacion',
        required: true
    },
    estacionLlegada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estacion',
        default:null
    },
    fechaInicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaFin: {
        type: Date,
        default:null
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

const alquiler = mongoose.model('Alquiler', alquilerSchema)

module.exports = alquiler


/*
{
    "usuario": "68bd08a73c8584ec7da0d161",
    "bicicleta": "64f7b2e2c2a4a2e5d8b1c456",
    "estacionSalida": "68ba2515629a5ec38ba3f175",
    "fechaInicio": "2025-09-06T10:00:00.000Z",
    "fechaFin": "2025-09-06T12:00:00.000Z",
    "activo": true
}
*/