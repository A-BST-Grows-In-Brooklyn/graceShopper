const router = require('express').Router()
const {Order, Slime} = require('../db/models')
module.exports = router

//mounted on /api/cart

//generate lineItems//
router.get('/', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    let lineItems = []
    if (order) {
      lineItems = await order.getLineItems({
        include: Slime
      })
    }
    res.json(lineItems)
  } catch (error) {
    next(error)
  }
})

//add item to cart from SingleSlime
router.put('/add', async (req, res, next) => {
  try {
    const userId = req.user.id
    const itemId = req.body.itemId
    const quantity = req.body.quantity
    let order = await Order.addItem(itemId, quantity, userId)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//remove item to cart from SingleSlime
router.put('/remove', async (req, res, next) => {
  try {
    const userId = req.user.id
    const itemId = req.body.itemId
    const quantity = req.body.quantity
    let order = await Order.removeItem(itemId, quantity, userId)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const itemId = Number(req.params.itemId)
    const itemToRemove = await Order.removeItemAll(itemId, userId)

    if (itemToRemove) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
