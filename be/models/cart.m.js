// models/cart.m.js
const pool = require('../db/db');

module.exports = {
  // get cart items with food + merchant info
  getUserCart: (userId) =>
    pool.query(
      `SELECT ci.cart_item_id, ci.user_id, ci.food_id, ci.quantity, ci.created_at,
              f.name AS food_name, f.price AS food_price, f.description,
              m.merchant_id, m.name AS merchant_name
       FROM cart_items ci
       JOIN foods f ON ci.food_id = f.food_id
       JOIN merchants m ON f.merchant_id = m.merchant_id
       WHERE ci.user_id = $1
       ORDER BY ci.created_at`,
      [userId]
    ),

  // call SQL function add_to_cart(user, food, qty)
  add: (userId, foodId, qty) =>
    pool.query('SELECT add_to_cart($1,$2,$3)', [userId, foodId, qty]),

  // call SQL function update_cart_item(cart_item_id, new_qty)
  update: (cartItemId, qty) =>
    pool.query('SELECT update_cart_item($1,$2)', [cartItemId, qty]),

  // clear cart for user
  clear: (userId) =>
    pool.query('SELECT clear_cart($1)', [userId])
};
