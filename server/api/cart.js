const router = require('express').Router()
const {Order, Cart, Slime} = require('../db/models')
module.exports = router

//mounted on /api/cart

//generate cart//
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    const lineItems = await order.getLineItems({
      include: Slime
    })
    res.json(lineItems)
  } catch (error) {
    next(error)
  }
})

//add item to cart from SingleSlime
router.post('/', async (req, res, next) => {
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

router.delete('/:itemId', async (req, res, next) => {
  try {
    const itemToRemove = await Cart.findByPk(req.params.itemId)

    if (itemToRemove) {
      await itemToRemove.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
