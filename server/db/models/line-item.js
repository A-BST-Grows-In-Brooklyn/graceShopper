const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Slime = require('./slime')

const LineItem = db.define('line item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id'
    },
    allowNull: false
  },
  slimeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Slime,
      key: 'id'
    },
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = LineItem
