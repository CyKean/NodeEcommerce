// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
    defaultValue: 'pending',
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
