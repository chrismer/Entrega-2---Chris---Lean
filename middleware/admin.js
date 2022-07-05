//CAMBIAR PARA SER ADMIN
const usuarioAdmin = true;

const esAdmin = (req, res, next) => {
    if (usuarioAdmin) {
        next()
    } else {
        res.send({ error: -1, descripcion: `Ruta ${req.path} ,Método ${req.method} no AUTORIZADA` })
    }
}

module.exports = { esAdmin }