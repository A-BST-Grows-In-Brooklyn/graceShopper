const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

const LineItem = require('./lineItem')

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
  totalPrice: {
    type: Sequelize.INTEGER,
    default: 0
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: 'No address given'
  }
})

Order.createOrderInstance = async (slimeId, quantity, userId) => {
  try {
    const newOrder = await Order.create({userId})
    const lineItem = await LineItem.create({
      slimeId: slimeId,
      quantity: quantity
    })
    await newOrder.addLineItem(lineItem)
    newOrder.totalPrice = lineItem.totalPrice
    await newOrder.save({fields: ['totalPrice']})
    return newOrder
  } catch (err) {
    console.log(err)
  }
}

Order.addItem = async (slimeId, quantity, userId) => {
  try {
    let order
    order = await Order.createOrderInstance(slimeId, quantity, userId)
    return order
  } catch (err) {
    console.log(err)
  }
}

// Order.prototype.updatePrice = async (orderPrice, instancePrice, oldInstancePrice = 0) {

// }
module.exports = Order
