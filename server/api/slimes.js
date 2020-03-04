const router = require('express').Router()
const {Slime} = require('../db/models')
module.exports = router

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

router.post('/:userId', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const newSlime = await Slime.create(req.body)
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
