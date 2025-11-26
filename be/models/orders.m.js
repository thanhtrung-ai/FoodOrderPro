// models/orders.m.js
const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query('SELECT * FROM orders ORDER BY order_id DESC'),
  getById: (id) => pool.query('SELECT * FROM orders WHERE order_id=$1', [id]),

  getByUser: (user_id) =>
  pool.query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC',
    [user_id]
  ),

  // get items with merchant info (join foods->merchants)
  getItems: (orderId) =>
    pool.query(
      `SELECT oi.*, f.name as food_name, f.price as food_price, m.merchant_id, m.name as merchant_name
       FROM order_items oi
       JOIN foods f ON oi.food_id = f.food_id
       JOIN merchants m ON f.merchant_id = m.merchant_id
       WHERE oi.order_id = $1`,
      [orderId]
    ),

  // create order total: server-side create single order from cart (all merchants)
  // returns order_id
  createOrderFromCartSingle: async (userId) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // create a single order (no merchant_id)
      const insertOrder = await client.query(
        `INSERT INTO orders(user_id, total_price, status) VALUES ($1, 0, 'pending') RETURNING order_id`,
        [userId]
      );
      const orderId = insertOrder.rows[0].order_id;

      // move all cart_items for user into order_items
      const cartRows = await client.query(
        `SELECT ci.cart_item_id, ci.food_id, ci.quantity, f.price
         FROM cart_items ci
         JOIN foods f ON ci.food_id = f.food_id
         WHERE ci.user_id = $1`,
        [userId]
      );

      for (const r of cartRows.rows) {
        const sub_total = Number(r.price) * Number(r.quantity);
        await client.query(
          `INSERT INTO order_items(order_id, food_id, quantity, sub_total)
           VALUES ($1,$2,$3,$4)`,
          [orderId, r.food_id, r.quantity, sub_total]
        );
        // remove from cart
        await client.query('DELETE FROM cart_items WHERE cart_item_id=$1', [r.cart_item_id]);
      }

      // recalc total via SQL function (we have recalc_order_total returning numeric)
      await client.query('SELECT recalc_order_total($1)', [orderId]);

      await client.query('COMMIT');
      return { orderId };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  // alternative: if you later want to create per-merchant orders using SQL function
  createOrderForMerchantViaFunction: (userId, merchantId) =>
    pool.query('SELECT create_order_from_cart($1,$2) AS order_id', [userId, merchantId]),

  recalcTotal: (orderId) => pool.query('SELECT recalc_order_total($1) AS total', [orderId])
};
