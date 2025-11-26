// index.js
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// routers
app.use('/users', require('./routers/users.r'));
app.use('/merchants', require('./routers/merchants.r'));
app.use('/categories', require('./routers/categories.r'));
app.use('/foods', require('./routers/foods.r'));
app.use('/cart', require('./routers/cart.r'));
app.use('/orders', require('./routers/orders.r'));
app.use('/order-items', require('./routers/orderItems.r'));
app.use('/ratings', require('./routers/ratings.r'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
