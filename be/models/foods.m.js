// models/foods.m.js
const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query('SELECT f.*, m.name as merchant_name FROM foods f LEFT JOIN merchants m ON f.merchant_id = m.merchant_id ORDER BY f.food_id'),
  getById: (id) => pool.query('SELECT f.*, m.name as merchant_name FROM foods f LEFT JOIN merchants m ON f.merchant_id = m.merchant_id WHERE f.food_id=$1', [id]),
  getByMerchant: (merchantId) => pool.query('SELECT * FROM foods WHERE merchant_id=$1 ORDER BY food_id', [merchantId]),
  getByCategory: (categoryId) => pool.query('SELECT * FROM foods WHERE category_id=$1 ORDER BY food_id', [categoryId])
};
