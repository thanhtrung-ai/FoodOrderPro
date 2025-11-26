const r = require('express').Router();
const c = require('../controllers/orderitems.c');

r.get('/', c.getAll);
r.get('/:id', c.getById);
r.get('/order/:orderId', c.getByOrderId);

r.post('/', c.create);
r.put('/:id', c.update);
r.delete('/:id', c.delete);

module.exports = r;
