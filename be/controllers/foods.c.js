// controllers/foods.c.js
const F = require('../models/foods.m');

module.exports = {
  getAll: async (req, res) => {
    try { res.json((await F.getAll()).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getById: async (req, res) => {
    try { res.json((await F.getById(req.params.id)).rows[0]); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getByMerchant: async (req, res) => {
    try { res.json((await F.getByMerchant(req.params.id)).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getByCategory: async (req, res) => {
    try { res.json((await F.getByCategory(req.params.id)).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  }
};
