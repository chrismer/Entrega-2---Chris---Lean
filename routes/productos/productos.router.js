const express = require('express')
const { esAdmin } = require('../../middleware/admin')
const {
    obtenerTodos,
    obtenerPorId,
    guardarProducto,
    actualizarProducto,
    borrarProducto,
} = require('../../controllers/productos.controller')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', obtenerTodos)

router.get('/:productoId', esAdmin, obtenerPorId)

router.post('/', esAdmin, guardarProducto)

router.put('/:productoId', esAdmin, actualizarProducto)

router.delete('/:productoId', esAdmin, borrarProducto)

module.exports = router;