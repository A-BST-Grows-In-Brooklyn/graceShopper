const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const LineItem = require('./lineItem')
const {
  findById,
  calculateTotalPrice,
  calculateTotalQuantity
} = require('../../../utilityFunctions')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    default: 0
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    default: 0
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['No address given']
  }
})

//create new Order instance when userId + complete don't exist in database
Order.createOrderInstance = async (slimeId, quantity, userId) => {
  try {
    const newOrder = await Order.create({userId})
    const lineItem = await LineItem.create({
      slimeId: slimeId,
      quantity: quantity
    })
    await newOrder.addLineItem(lineItem)
    await newOrder.save()
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
    await order.save()
    return order
  } catch (err) {
    console.log(err)
  }
}

//updated line item instance to existing carts
Order.updateOrderUpdateItem = async (order, lineItem, slimeQuantity) => {
  try {
    lineItem.quantity += slimeQuantity
    await lineItem.save({fields: ['quantity', 'totalPrice']})
    await order.save()
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
      let lineItems = await order.getLineItems()
      let lineItem = findById(lineItems, 'slimeId', slimeId)
      if (lineItem) {
        order = await Order.updateOrderUpdateItem(order, lineItem, quantity)
      } else {
        order = await Order.updateOrderNewItem(order, slimeId, quantity)
      }
    }
    return order
  } catch (err) {
    console.log(err)
  }
}

Order.removeItem = async (slimeId, quantity, userId) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: userId,
        completed: false
      }
    })
    if (!order) {
      console.err('This order does not exist')
    } else {
      let lineItems = await order.getLineItems()
      let lineItem = findById(lineItems, 'slimeId', slimeId)
      if (lineItem) {
        lineItem.quantity -= quantity
        await lineItem.save({fields: ['quantity', 'totalPrice']})
        await order.save()
      } else {
        console.err('This line item does not exist')
      }
    }
    return order
  } catch (err) {
    console.log(err)
  }
}

Order.removeItemAll = async (slimeId, userId) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: userId,
        completed: false
      }
    })
    if (!order) {
      console.log('This order does not exist.')
    } else {
      let lineItems = await order.getLineItems()
      let lineItem = findById(lineItems, 'slimeId', slimeId)
      if (lineItem) {
        lineItem.quantity = 0
        await lineItem.save({fields: ['quantity', 'totalPrice']})
        await order.save()
      } else {
        console.log(`This line item does not exist.${slimeId}, ${userId}`)
      }
    }
    return order
  } catch (err) {
    console.log(err)
  }
}

Order.prototype.checkOut = async function() {
  try {
    this.completed = true
    await this.save()
  } catch (err) {
    console.log(err)
  }
}

Order.beforeSave(async function(order) {
  try {
    let lineItems = await order.getLineItems()
    order.totalPrice = calculateTotalPrice(lineItems)
    order.totalQuantity = calculateTotalQuantity(lineItems)
  } catch (err) {
    console.log(err)
  }
})
module.exports = Order
