// controllers/merchants.c.js
const M = require('../models/merchants.m');

module.exports = {
  getAll: async (req, res) => {
    try { res.json((await M.getAll()).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getById: async (req, res) => {
    try { res.json((await M.getById(req.params.id)).rows[0]); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getFoods: async (req, res) => {
    try { res.json((await M.getFoods(req.params.id)).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getRatings: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await M.getRatings(id);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get ratings' });
    }
  }
};
