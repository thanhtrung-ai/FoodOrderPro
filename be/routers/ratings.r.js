const r = require('express').Router();
const c = require('../controllers/ratings.c');

r.get('/merchant/:id', c.getByMerchant);
r.post('/', c.add);

module.exports = r;
