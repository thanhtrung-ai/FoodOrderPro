// models/merchants.m.js
const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query('SELECT * FROM merchants ORDER BY merchant_id'),
  getById: (id) => pool.query('SELECT * FROM merchants WHERE merchant_id=$1', [id]),
  getFoods: (merchantId) => pool.query('SELECT * FROM foods WHERE merchant_id=$1 ORDER BY food_id', [merchantId]),
  getRatings: (id) =>
    pool.query(
      `SELECT r.*, u.full_name 
      FROM ratings r
      JOIN users u ON u.user_id = r.user_id
      WHERE r.merchant_id = $1
      ORDER BY rating_id DESC`,
      [id]
    ),
};
