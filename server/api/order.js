const router = require('express').Router()
const {Order, LineItem, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let items = await Order.findAll({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    if (items.length <= 0) {
      let item = await Order.create({userId: req.user.id})
      items = [item]
    }
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/completedOrders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        completed: true
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/lineItems/:id', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll({
      where: {
        orderId: req.params.id
      }
    })
    console.log('*****', lineItems)
    res.json(lineItems)
  } catch (error) {
    next(error)
  }
})

router.put('/completeOrder/:id', async (req, res, next) => {
  try {
    const itemToUpdate = await Order.findByPk(req.params.id)
    await itemToUpdate.update({completed: true})
    res.send(200)
  } catch (error) {
    next(error)
  }
})
