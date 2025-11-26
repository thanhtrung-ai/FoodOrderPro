const pool = require('../db/db');

module.exports = {
  getAll: () => pool.query("SELECT * FROM users ORDER BY user_id"),
  getById: (id) => pool.query("SELECT * FROM users WHERE user_id=$1", [id]),
  create: (full_name, phone, email, address) =>
    pool.query(
      `INSERT INTO users (full_name, phone, email, address)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [full_name, phone, email, address]
    ),
  update: (id, full_name, phone, email, address) =>
    pool.query(
      `UPDATE users SET full_name=$1, phone=$2, email=$3, address=$4
       WHERE user_id=$5 RETURNING *`,
      [full_name, phone, email, address, id]
    ),
  remove: (id) =>
    pool.query("DELETE FROM users WHERE user_id=$1", [id])
};
