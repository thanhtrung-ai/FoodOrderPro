const UsersModel = require('../models/users.m');

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await UsersModel.getAll();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await UsersModel.getById(req.params.id);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { full_name, phone, email, address } = req.body;
      const result = await UsersModel.create(full_name, phone, email, address);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { full_name, phone, email, address } = req.body;
      const result = await UsersModel.update(
        req.params.id,
        full_name,
        phone,
        email,
        address
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const result = await UsersModel.remove(req.params.id);
      res.json({ message: "Deleted", id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
