const r = require('express').Router();
const c = require('../controllers/categories.c');

r.get('/', c.getAll);

module.exports = r;
