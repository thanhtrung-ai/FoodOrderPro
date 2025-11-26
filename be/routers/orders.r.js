const r = require('express').Router();
const c = require('../controllers/orders.c');

r.get('/user/:user_id', c.getByUser);
r.get('/', c.getAll);
r.get('/:id', c.getById);
r.get('/:id/items', c.getItems);
r.post('/from-cart', c.createFromCart);  // create single order from whole cart
r.post('/from-cart/merchant', c.createPerMerchant); // use DB function create_order_from_cart(user, merchant) if needed
module.exports = r;

