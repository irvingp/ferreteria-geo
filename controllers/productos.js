const Sequelize = require('sequelize');
const productos = require('../models').productos;
module.exports = {
    create(req, res) {
        console.log(req.body)
        return productos
            .create({

                NombreProducto: req.body.NombreProducto,
                Existencias: req.body.Existencias,
                Precio: req.body.Precio
            })
            .then(productos => res.status(200).send(productos))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {
        return productos.findAll({})
            .then(productos => res.status(200).send(productos))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return productos.findAll({
            where: {
                NombreProducto: req.params.NombreProducto,
            }
        })
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },

    buy(req, res) {
        const { id } = req.params;
        const { Existencias } = req.body;
        
        return productos.findByPk(id)
            .then(producto => {
                console.log(producto)
                if (!producto) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                producto.Existencias = parseInt(producto.Existencias) + parseInt(Existencias);

                return producto.save()
                    .then(() => res.status(200).json({ message: 'Product updated successfully', producto }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    sell(req, res) {
        const { id } = req.params;
        const { Existencias } = req.body;
        
        return productos.findByPk(id)
            .then(producto => {
                console.log(producto)
                if (!producto) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                if(Existencias> producto.Existencias)
                {
                    return res.status(404).json({message:'El valor de venta es mayor a la existencia actual'})
                }
                let resta =parseInt(producto.Existencias) - parseInt(Existencias)
                console.log(resta);
                producto.Existencias = resta;

                return producto.save()
                    .then(() => res.status(200).json({ message: 'Product updated successfully', producto }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
