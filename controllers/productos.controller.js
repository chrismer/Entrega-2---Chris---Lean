const { ProductosDao } = require('../models/daos/indexApi')
    //const ProductosDao = require('../models/daos/products/ProductosDaoMongoDB')

const productosApi = new ProductosDao()

const obtenerTodosProductos = async(req, res) => {
    const todosLosProductos = await productosApi.getAll()
    return res.json(todosLosProductos)
};
const obtenerProductoPorId = async(req, res) => {
    const { productoId } = req.params
    const productoBuscado = await productosApi.getById(productoId)
    return res.json(productoBuscado);
};
const guardarProducto = async(req, res) => {
    const idCount = await productosApi.getAll()
    const { name, desc, image, price, stock } = req.body;
    if (!name || !desc || !image || !price || !stock) return { error: 'Todos los campos son obligatorios!' };
    const nuevoProducto = {
        id: idCount.length + 1,
        code: idCount.length + 1,
        timestamp: Date.now(),
        name,
        desc,
        image,
        price,
        stock
    };
    productosApi.save(nuevoProducto)
    return res.json({ response: `Se agregó el nuevo Producto: ${nuevoProducto.id}` })
};
const actualizarProducto = (req, res) => {
    const { productoId } = req.params
    const { name, desc, price, image, stock } = req.body
    const nuevoProducto = { name, desc, price, image, stock }

    if (!name || !desc || !image || !price || !stock) return res.json({ error: 'Todos los campos son obligatorios!' });

    const actualizarProducto = productosApi.updateById(productoId, nuevoProducto)
    return res.json({ response: `Se actualizó el Producto: ${productoId}` })
}
const borrarProducto = (req, res) => {
    const { productoId } = req.params
    const borrarProducto = productosApi.deleteById(productoId)
    if (borrarProducto.error) return res.status(404).send(borrarProducto.error);
    return res.json({ response: `Se eliminó el Producto: ${productoId}` });
};

module.exports = {
    productosApi,
    obtenerTodosProductos,
    obtenerProductoPorId,
    guardarProducto,
    actualizarProducto,
    borrarProducto,
}