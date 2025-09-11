const mongoose = require('mongoose')

const estacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    ubicacion: {
        latitud: {
            type: Number,
            required: true
        },
        longitud: {
            type: Number,
            required: true
        }
    },
    capacidad: {
        type: Number,
        default: 5,
        max: 5,
        min: 0
    },
    bicicletasDisponibles: { 
        type: Number, 
        default: 0, 
        min: 0 }
}, {
    versionKey: false,
    timestamps: true
})

const estacion = mongoose.model('Estacion', estacionSchema)

module.exports = estacion

/*
{
    "nombre": "Estación Central",
    "ubicacion": {
        "latitud": 19.432608,
        "longitud": -99.133209
    }
}

{
    "nombre": "Estación Central",
    "ubicacion": {
        "latitud": 19.432608,
        "longitud": -99.133209
    }
}

{
  "nombre": "Pino Suárez",
  "ubicacion": {
    "latitud": 19.4320,
    "longitud": -99.1325
  }
}

{
  "nombre": "Hidalgo",
  "ubicacion": {
    "latitud": 19.43738,
    "longitud": -99.14690
  }
}
*/ 