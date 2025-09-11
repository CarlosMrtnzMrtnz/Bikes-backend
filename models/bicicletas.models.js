// En bicicletas.models.js
const mongoose = require('mongoose')

const bicicletaSchema = mongoose.Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'mantenimiento'],
        default: 'disponible'
    },
    estacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estacion',
        required: false
    }
    
}, {
    versionKey: false,
    timestamps: true
})

const bicicleta = mongoose.model('Bicicleta', bicicletaSchema)

module.exports = bicicleta

/*
{
    "serial": "ABC12345",
    "estado": "disponible",
    "estacion": "68bdcdacb9cc639440c14dd3"
}
*/