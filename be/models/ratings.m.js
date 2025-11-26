// models/ratings.m.js
const pool = require('../db/db');

module.exports = {
  getByMerchant: (merchantId) =>
    pool.query('SELECT r.*, u.full_name as user_name FROM ratings r LEFT JOIN users u ON r.user_id = u.user_id WHERE r.merchant_id=$1 ORDER BY r.created_at DESC', [merchantId]),

  add: (user_id, merchant_id, rating, comment) =>
    pool.query(
      `INSERT INTO ratings(user_id, merchant_id, rating, comment)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [user_id, merchant_id, rating, comment]
    ),

  recalcMerchantRating: (merchant_id) =>
    pool.query('SELECT recalc_merchant_rating($1) AS rating', [merchant_id]),

  getRatings: (id) =>
    pool.query(
      `SELECT r.*, u.full_name 
      FROM ratings r
      JOIN users u ON u.user_id = r.user_id
      WHERE r.merchant_id = $1
      ORDER BY r.rating_id DESC`,
      [id]
    ),
};
