/* Controllers */
const productosController = require('../controllers/productos');

module.exports = (app) => {
   app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));

   

   app.post('/api/productos/create', productosController.create);
   app.get('/api/productos/list', productosController.list);
   app.get('/api/productos/find/NombreProducto/:NombreProducto', productosController.find);
   app.put('/api/productos/buy/:id', productosController.buy);
   app.put('/api/productos/sell/:id', productosController.sell);
};