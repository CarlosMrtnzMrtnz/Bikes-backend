const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 10
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Por favor ingresa un email válido']
    },
    password: {
        type: String,
        required: true,
        minLenght: 4,
        maxLenght: 10
    }
},{
    versionKey: false,
    timestamps: true
}
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel

/*
{
    "userName": "carlos",
    "email": "carlos@email.com",
    "password": "abcd1234"
}
*/