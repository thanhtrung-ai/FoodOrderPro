// controllers/orderitems.c.js
const OI = require('../models/orderitems.m');

module.exports = {
  getAll: async (req, res) => {
    try { res.json((await OI.getAll()).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getById: async (req, res) => {
    try { const r = await OI.getById(req.params.id); res.json(r.rows[0] || null); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getByOrderId: async (req, res) => {
    try { res.json((await OI.getByOrderId(req.params.orderId)).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  create: async (req, res) => {
    try {
      const { order_id, food_id, quantity, sub_total } = req.body;
      const r = await OI.create(order_id, food_id, quantity, sub_total);
      res.status(201).json(r.rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  update: async (req, res) => {
    try {
      const { quantity, sub_total } = req.body;
      const r = await OI.update(req.params.id, quantity, sub_total);
      res.json(r.rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  delete: async (req, res) => {
    try {
      await OI.delete(req.params.id);
      res.json({ message: 'deleted' });
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
