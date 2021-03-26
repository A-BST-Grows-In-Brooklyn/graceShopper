const Sequelize = require('sequelize')
const db = require('../db')

const Slime = db.define('slime', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.ENUM('red', 'orange', 'yellow', 'purple', 'blue', 'pink')
  },
  texture: {
    type: Sequelize.ENUM('cloud', 'jelly', 'foam', 'butter')
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 100
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100.0
  },
  imgURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Facetune_26-02-2020-21-42-25_grande.jpg?v=1582978921'
  }
})

module.exports = Slime
