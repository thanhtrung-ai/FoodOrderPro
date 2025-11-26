// controllers/categories.c.js
const C = require('../models/categories.m');

module.exports = {
  getAll: async (req, res) => {
    try { res.json((await C.getAll()).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  }
};
