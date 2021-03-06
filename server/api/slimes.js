const router = require('express').Router()
const {Slime, User} = require('../db/models')
module.exports = router

router.put('/:slimeId', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const id = req.params.slimeId
      const {name, color, texture, price, quantity, imgURL} = req.body
      const slimeToUpdate = await Slime.findByPk(id)
      if (slimeToUpdate) {
        await slimeToUpdate.update({
          name,
          color,
          texture,
          price,
          quantity,
          imgURL
        })
        res.send(slimeToUpdate)
      }
    } else {
      res.status(404).send('Not An Admin')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const {name, color, texture, price, quantity, imgURL} = req.body
      const newSlime = await Slime.create({
        name,
        color,
        texture,
        price,
        quantity,
        imgURL
      })
      if (newSlime) {
        res.status(201).json(newSlime)
      } else {
        res.status(404).send('Could Not Create Slime')
      }
    } else {
      res.status(401).send('Not An Admin!')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const slime = await Slime.findByPk(req.params.id)
      if (slime) {
        await slime.destroy()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.status(401).send('Not An Admin!!')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const slime = await Slime.findByPk(req.params.id)
    if (slime) {
      res.json(slime)
    } else {
      res.status(404).send('Slime Not Found')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const slimes = await Slime.findAll()
    if (slimes) {
      res.json(slimes)
    } else {
      res.status(404).send('Slimes Not Found')
    }
  } catch (error) {
    next(error)
  }
})
