// routers/merchants.r.js
const { Router } = require('express');
const router = Router();
const MerchantsController = require('../controllers/merchants.c');

router.get('/', MerchantsController.getAll);
router.get('/:id', MerchantsController.getById);
router.get('/:id/foods', MerchantsController.getFoods);
router.get('/:id/ratings', MerchantsController.getRatings);

module.exports = router;
