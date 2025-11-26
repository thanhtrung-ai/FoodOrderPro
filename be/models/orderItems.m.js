// models/orderitems.m.js
const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query('SELECT * FROM order_items ORDER BY order_item_id'),
  getById: (id) => pool.query('SELECT * FROM order_items WHERE order_item_id=$1', [id]),
  getByOrderId: (orderId) =>
    pool.query(
      `SELECT oi.*, f.name as food_name, f.price as food_price, m.merchant_id, m.name as merchant_name
       FROM order_items oi
       JOIN foods f ON oi.food_id = f.food_id
       JOIN merchants m ON f.merchant_id = m.merchant_id
       WHERE oi.order_id = $1
       ORDER BY oi.order_item_id`,
      [orderId]
    ),
  create: (order_id, food_id, quantity, sub_total) =>
    pool.query(
      `INSERT INTO order_items(order_id, food_id, quantity, sub_total)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [order_id, food_id, quantity, sub_total]
    ),
  update: (id, quantity, sub_total) =>
    pool.query(
      `UPDATE order_items SET quantity=$2, sub_total=$3 WHERE order_item_id=$1 RETURNING *`,
      [id, quantity, sub_total]
    ),
  delete: (id) => pool.query('DELETE FROM order_items WHERE order_item_id=$1', [id])
};
