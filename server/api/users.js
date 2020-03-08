const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/:userId', async (req, res, next) => {
  try {
    console.log('GOT TO ROUTE!!')
    if (
      (req.user && req.user.admin) ||
      (req.user && req.user.id === req.params.userId)
    ) {
      const name = req.body.name
      const address = [
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.country
      ]
      const user = await User.findByPk(req.params.userId)
      console.log('**GOT USER:', user)
      const updatedUser = await user.update({
        name,
        address
      })
      console.log('**INSIDE PUT ROUTE:', updatedUser)
      res.status(200).json(updatedUser)
    } else {
      res.status(401).send('Not an Admin')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user && req.user.admin) {
      const myUser = await User.findByPk(req.params.id)
      if (myUser) {
        res.json(myUser)
      }
    } else {
      res.status(401).send('Not An Admin')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.admin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } else {
      res.status(401).send('Not An Admin')
    }
  } catch (err) {
    next(err)
  }
})
