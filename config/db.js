const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL

        await mongoose.connect(MONGO_URL)
        console.log("Conected to database!");
        
    } catch (error) {
        console.log(error);
        setTimeout(this.connectDB, 5000)
    }
    const db = mongoose.connection;
    db.on('connected', () => console.log('MongoDB conectado'));
    db.on('disconnected', () => console.warn('MongoDB desconectado'));
    db.on('reconnected', () => console.log('MongoDB reconectado'));
    db.on('error', err => console.error('MongoDB error:', err));
    db.on('reconnectFailed', () => console.error('Reconexión a MongoDB fallida'));
}

