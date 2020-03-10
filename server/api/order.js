const router = require('express').Router()
const {Order, LineItem, User, Slime} = require('../db/models')
module.exports = router

router.get('/slimeLineItems/:id', async (req, res, next) => {
  // let lineItem = find the lineItem where id === req.params.id
  // let slime = findbyId(lineItem.slimeId)

  try {
    let slimes = await Slime.findAll({
      where: {
        slimeId: req.params.id
      },
      include: [{model: LineItem}]
    })
  } catch (error) {
    next(error)
  }
})

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
    const itemToUpdate = await Order.findByPk(req.params.id)

    itemToUpdate.checkOut([streetAddress, city, state, country])

    // await itemToUpdate.update({completed: true, address: [streetAddress, city, state, country]})
    // res.send(200)
  } catch (error) {
    next(error)
  }
})
