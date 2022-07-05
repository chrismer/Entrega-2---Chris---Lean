const {  CarritosDao } = require('../models/daos/indexApi')
    //const  CarritosDao  = require('../models/daos/cart/CarritoDaoMongoDB')
const { productosApi } = require('./productos.controller')

const carritoApi = new CarritosDao()

const postNuevoCarrito = async(req, res) => {
    try {
        const totalCarritos = await carritoApi.getAll()
        const carritoNuevo = {
            id: totalCarritos.length + 1,
            timestamp: Date.now(),
            products: [],
        }
        carritoApi.save(carritoNuevo)
        return res.json({ response: `Carrito nuevo creado exitosamente: Id:${carritoNuevo.id}` })
    } catch (error) {
        return res.json({ Error: `No se pudo realizar esta acción`, error })
    }

}
const borrarCarrito = (req, res) => {
    try {
        const carritoId = req.params.carritoId
        carritoApi.deleteById(carritoId)
        return res.json({ response: `Su carro id:${carritoId} fué eliminado` })
    } catch (error) {
        return res.json({ Error: `No se pudo realizar esta acción`, error })
    }
}
const obtenerCarritoProductos = async(req, res) => {
    try {
        const carritoId = req.params.cartId
        const elCarrito = await carritoApi.getById(carritoId)
            //retorna un array donde tengo que especificar la posicion
        return res.json(elCarrito[0].products)
    } catch (error) {
        return res.json({ Error: `No se pudo realizar esta acción`, error })
    }
}
const postNuevoProducto = async(req, res) => {
    try {
        const carritoId = req.params.carritoId
        const productoId = req.params.productoId
        const allProductos = await productosApi.getAll()
        const elProducto = allProductos.find(prod => prod.id === +productoId)
        const elCarrito = await carritoApi.getById(carritoId)
        elCarrito[0].productos.push(elProducto)

        await carritoApi.updateById(carritoId, elCarrito[0])
        return res.json({ response: 'Se agregó el producto al carro.' })
    } catch (error) {
        return res.json({ Error: `No se pudo realizar esta acción`, error })
    }
}
const borrarProductoCarrito = async(req, res) => {
    try {
        const carritoId = req.params.carritoId
        const productoId = req.params.productoId
        const elCarrito = await carritoApi.getById(carritoId)
        const index = elCarrito[0].productos.findIndex(prod => prod.id === +productoId);
        elCarrito[0].productos.splice(index, 1)

        await carritoApi.updateById(carritoId, elCarrito[0])
        return res.json({ response: 'Se eliminó el producto del carrito.' })
    } catch (error) {
        return res.json({ Error: `No se pudo realizar esta acción`, error })
    }
}

module.exports = {
    postNuevoCarrito,
    borrarCarrito,
    obtenerCarritoProductos,
    postNuevoProducto,
    borrarProductoCarrito
}