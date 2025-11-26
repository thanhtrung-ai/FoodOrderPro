// controllers/ratings.c.js
const R = require('../models/ratings.m');

module.exports = {
  getByMerchant: async (req, res) => {
    try { res.json((await R.getByMerchant(req.params.id)).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  add: async (req, res) => {
    try {
      const { user_id, merchant_id, rating, comment } = req.body;
      const r = await R.add(user_id, merchant_id, rating, comment);
      // call recalc function
      await R.recalcMerchantRating(merchant_id);
      res.status(201).json(r.rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
