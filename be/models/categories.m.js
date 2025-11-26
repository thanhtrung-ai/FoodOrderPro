// models/categories.m.js
const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query('SELECT * FROM categories ORDER BY category_id')
};
