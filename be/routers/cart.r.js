const r = require('express').Router();
const c = require('../controllers/cart.c');

r.get('/:id', c.getUserCart);   // id = user_id
r.post('/', c.add);             // body: { user_id, food_id, quantity }
r.put('/:id', c.update);        // id = cart_item_id, body: { quantity }
r.delete('/:id', c.clear);      // id = user_id
module.exports = r;
