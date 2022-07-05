const express = require('express')
const productosRouter = require('./productos/productos.router')
const carritosRouter = require('./carritos/carritos.router')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use('/productos', productosRouter)
router.use('/carritos', carritosRouter)

module.exports = router