const router = require('express').Router()
const {Cart, Slime} = require('../db/models')
module.exports = router

//mounted on /api/cart

//generate cart//
router.get('/', async (req, res, next) => {
  try {
    const items = await Cart.findAll({
      where: {
        userId: req.user.id
      },
      include: [{model: Slime}]
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

//update quantity from cart
router.put('/increment', async (req, res, next) => {
  try {
    const currentUser = req.user.id
    const itemId = req.body.itemId

    let instanceToUpdate = await Cart.findOne({
      where: {
        userId: 4,
        slimeId: 4
      }
    })
    if (instanceToUpdate) {
      await instanceToUpdate.update({
        quantity: instanceToUpdate.quantity + 1
      })
      instanceToUpdate = instanceToUpdate.reload()
    }
    if (instanceToUpdate) {
      res.json(instanceToUpdate)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//add item to cart from SingleSlime
router.post('/', async (req, res, next) => {
  try {
    const currentUser = req.user.id
    const itemId = req.body.itemId
    const quantity = req.body.quantity
    const itemToUpdate = await Cart.findOne({
      where: {
        userId: currentUser,
        slimeId: itemId
      }
    })
    let item = {}
    if (itemToUpdate) {
      await itemToUpdate.update({
        quantity: itemToUpdate.quantity + quantity
      })
      item = itemToUpdate.reload()
    } else {
      item = await Cart.create({
        userId: currentUser,
        slimeId: itemId,
        quantity: quantity
      })
    }

    if (item) {
      res.json(item)
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
