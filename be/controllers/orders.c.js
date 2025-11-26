// controllers/orders.c.js
const Orders = require('../models/orders.m');

module.exports = {
  getByUser: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const result = await Orders.getByUser(user_id);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get orders of user' });
    }
  },

  getAll: async (req, res) => {
    try { res.json((await Orders.getAll()).rows); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },

  getById: async (req, res) => {
    try {
      const order = (await Orders.getById(req.params.id)).rows[0];
      if (!order) return res.status(404).json({ message: 'Order not found' });
      const items = (await Orders.getItems(req.params.id)).rows;
      res.json({ order, items });
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  getItems: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Orders.getItems(id);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Failed to get items" });
    }
  },

  // create single order from whole cart (option A): server groups all cart items into one order
  createFromCart: async (req, res) => {
    try {
      const { user_id } = req.body;
      const r = await Orders.createOrderFromCartSingle(user_id);
      const orderId = r.orderId || r.order_id || (r.rows && r.rows[0] && r.rows[0].order_id);
      // fetch created order + items
      const order = (await Orders.getById(orderId)).rows[0];
      const items = (await Orders.getItems(orderId)).rows;
      res.status(201).json({ order, items });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // alternative endpoint: create per-merchant orders using DB function (if needed)
  createPerMerchant: async (req, res) => {
    try {
      const { user_id, merchant_id } = req.body;
      const r = await Orders.createOrderForMerchantViaFunction(user_id, merchant_id);
      res.status(201).json(r.rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
