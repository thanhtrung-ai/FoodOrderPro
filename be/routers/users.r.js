// routers/users.r.js
const { Router } = require('express');   // <-- dùng destructuring cho an toàn
const router = Router();
const UsersController = require('../controllers/users.c');

// routes
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);

module.exports = router;
