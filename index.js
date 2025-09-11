const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config({quiet: true});
const {connectDB} = require("./config/db");
const router = require('./router/routes');

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api',router)


app.get('/api/health', (req, res)=>{
    res.status(200).json({
        status:"Ok",
        uptime: `${Math.floor(process.uptime())}`,
        uptime_human: `${Math.floor(process.uptime()/60)} min`
    })
})

connectDB()
app.listen(3000, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
})