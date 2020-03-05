const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const LineItems = require('./line-item')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  orderItems: {
    type: Sequelize.ARRAY,
    references: {
      model: LineItems,
      key: 'id'
    },
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: 1
  }
})

module.exports = Order
