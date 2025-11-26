const r = require('express').Router();
const c = require('../controllers/foods.c');

r.get('/', c.getAll);
r.get('/:id', c.getById);
r.get('/merchant/:id', c.getByMerchant);
r.get('/category/:id', c.getByCategory);

module.exports = r;
