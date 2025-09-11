const express = require('express')
const { getEstaciones, getEstacionById, createEstacion, updateEstacion, deleteEstacion } = require('../controllers/estaciones.controller')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { getAlquileres, getAlquilerById, createAlquiler, updateAlquiler, deleteAlquiler, estatus } = require('../controllers/alquiler.controller')
const { getBicicletas, getBicicletaById, createBicicleta, updateBicicleta, deleteBicicleta } = require('../controllers/bicicletas.controller')
const { login } = require('../controllers/login.controller')
const router = express.Router()


//--------------Rutas Estaciones--------------------------

router.get('/estaciones', getEstaciones)
router.get('/estacion/:id', getEstacionById)
router.post('/estacion', createEstacion)
router.put('/estacion/:id', updateEstacion)
router.delete('/estacion/:id', deleteEstacion)


//--------------Rutas Usuarios---------------------------

router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


//-------------Rutas Bicicletas--------------------------

router.get('/bicicletas/', getBicicletas)
router.get('/bicicletas/:id', getBicicletas)
router.get('/bicicleta/:id', getBicicletaById)
router.post('/bicicleta', createBicicleta)
router.put('/bicicleta/:id', updateBicicleta)
router.delete('/bicicleta/:id', deleteBicicleta)


//-------------Rutas Alquiler---------------------------

router.get('/alquiler', getAlquileres)
router.get('/alquiler/:id', getAlquilerById)
router.post('/alquiler', createAlquiler)
router.put('/alquiler/:id', updateAlquiler)
router.put('/alquiler/status/:id', estatus)
router.delete('/alquiler/:id', deleteAlquiler)

//-------------Ruta Login----------------------------

router.post('/login', login)

module.exports = router