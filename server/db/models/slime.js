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
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 1.0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  imgURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
  }
})

module.exports = Slime
