const Sequelize = require('sequelize')
const db = require('../db')
const Slime = require('./slime')
const Order = require('./order')

const LineItem = db.define('lineItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    defaultValue: 0
  }
})

LineItem.beforeSave(async function(lineItemInstance) {
  try {
    if (lineItemInstance.quantity <= 0) {
      await lineItemInstance.destroy()
    }
    let id = lineItemInstance.slimeId
    let slime = await Slime.findByPk(id)
    lineItemInstance.totalPrice = slime.price * lineItemInstance.quantity
  } catch (err) {
    console.log(err)
  }
})

module.exports = LineItem
