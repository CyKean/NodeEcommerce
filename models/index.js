// models/index.js
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// User-Order Association
User.hasMany(Order);
Order.belongsTo(User);

// User-Cart Association
User.hasMany(Cart);
Cart.belongsTo(User);

// Product-Cart Association
Product.hasMany(Cart);
Cart.belongsTo(Product);

// Order-OrderItem Association
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product-OrderItem Association
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
