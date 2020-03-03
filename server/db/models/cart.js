const Sequelize = require('sequelize')
const db = require('../db')
import User from './user'
import Slime from './slime'

const Cart = db.define('cart', {
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
    }
  },
  slimeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Slime,
      key: 'id'
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = {Cart}
