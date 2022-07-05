const express = require('express')
const { esAdmin } = require('../../middleware/admin')

const {
    postNuevoCarrito,
    borrarCarrito,
    obtenerCarritoProducots,
    postNuevoProducto,
    borrarProdutoCarrito
} = require('../../controllers/carrito.controller')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/', esAdmin, postNuevoCarrito)
router.delete('/:carritoId', esAdmin, borrarCarrito)
router.get('/:carritoId', esAdmin, obtenerCarritoProducots)
router.post('/:carritoId/productos/:productoId', esAdmin, postNuevoProducto)
router.delete('/:carritoId/productos/:productoId', esAdmin, borrarProdutoCarrito)

module.exports = router