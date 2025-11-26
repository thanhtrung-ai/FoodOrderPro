// controllers/cart.c.js
const Cart = require('../models/cart.m');

module.exports = {
  getUserCart: async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const r = await Cart.getUserCart(userId);
      res.json(r.rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  add: async (req, res) => {
    try {
      const { user_id, food_id, quantity } = req.body;
      await Cart.add(user_id, food_id, quantity);
      res.json({ message: 'Added to cart' });
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  update: async (req, res) => {
    try {
      const cartItemId = Number(req.params.id);
      const { quantity } = req.body;
      await Cart.update(cartItemId, quantity);
      res.json({ message: 'Cart updated' });
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  clear: async (req, res) => {
    try {
      const userId = Number(req.params.id);
      await Cart.clear(userId);
      res.json({ message: 'Cart cleared' });
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
