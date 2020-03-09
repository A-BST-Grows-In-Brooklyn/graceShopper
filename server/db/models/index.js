const User = require('./user')
const Cart = require('./cart')
const Slime = require('./slime')
const Order = require('./order')
const LineItem = require('./lineItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

LineItem.belongsTo(Slime, {foreignKey: 'slimeId'})
LineItem.belongsTo(Order, {foreignKey: 'orderId'})
Order.hasMany(LineItem)
Order.belongsTo(User)

User.belongsToMany(Slime, {through: Cart})
Slime.belongsToMany(User, {through: Cart})

module.exports = {
  User,
  Slime,
  Cart,
  LineItem,
  Order
}
