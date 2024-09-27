// sync.js
const sequelize = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully');
});
