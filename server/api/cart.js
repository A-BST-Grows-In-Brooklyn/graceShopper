const router = require('express').Router()
const {Cart, Slime, User} = require('../db/models')
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

router.post('/', async (req, res, next) => {
  try {
    const currentUser = req.user.id
    const itemId = req.body.itemId
    const quantity = req.body.quantity

    const itemToAdd = await Cart.create({
      userId: currentUser,
      slimeId: itemId,
      quantity: quantity
    })

    if (itemToAdd) {
      res.json(itemToAdd)
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
