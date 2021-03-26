const router = require('express').Router()
const {Order, LineItem, User, Slime} = require('../db/models')
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
      items = [{totalPrice: 0, totalQuantity: 0}]
    }
    console.log(items)
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/slimeLineItems/:id', async (req, res, next) => {
  try {
    let lineItemArr = await LineItem.findAll({
      include: {
        model: Slime
      },
      where: {orderId: req.params.id}
    })
    res.json(lineItemArr)
  } catch (error) {
    next(error)
  }
})

router.put('/guestOrder', async (req, res, next) => {
  try {
    let rawLineItems = req.body.items
    let address = req.body.address
    let guestOrder = await Order.guestOrderCreate(rawLineItems)
    guestOrder.checkOut(address)
    res.json(guestOrder)
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
    res.json(lineItems)
  } catch (error) {
    next(error)
  }
})

router.put('/completeOrder/:id', async (req, res, next) => {
  try {
    let streetAddress = req.body[0]
    let city = req.body[1]
    let state = req.body[2]
    let country = req.body[3]

    if (!streetAddress) {
      const user = await User.findByPk(req.user.id)
      streetAddress = user.address[0]
      city = user.address[1]
      state = user.address[2]
      country = user.address[3]
    }
    const itemToUpdate = await Order.findByPk(req.params.id)

    itemToUpdate.checkOut([streetAddress, city, state, country])

    // await itemToUpdate.update({completed: true, address: [streetAddress, city, state, country]})
    // res.send(200)
  } catch (error) {
    next(error)
  }
})
