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

//create new Order instance
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

//adds line item instance to existing carts

Order.updateOrderNewItem = async (order, slimeId, quantity) => {
  try {
    const lineItem = await LineItem.create({
      slimeId: slimeId,
      quantity: quantity
    })
    await order.addLineItem(lineItem)
    order.totalPrice += lineItem.totalPrice
    await order.save({fields: ['totalPrice']})
    return order
  } catch (err) {
    console.log(err)
  }
}

Order.addItem = async (slimeId, quantity, userId) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: userId,
        completed: false
      }
    })
    if (!order) {
      order = await Order.createOrderInstance(slimeId, quantity, userId)
    } else {
      order = await Order.updateOrderNewItem(order, slimeId, quantity)
    }

    return order
  } catch (err) {
    console.log(err)
  }
}

// Order.prototype.updatePrice = async (orderPrice, instancePrice, oldInstancePrice = 0) {

// }
module.exports = Order
