const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//ADDED ADMIN CHECK MIDDLEWARE
const adminsOnly = (req, res, next) => {
  if (req.user && !req.user.admin) {
    const err = new Error('Not An Admin')
    err.status = 401
    return next(err)
  }
  next()
}

router.put('/:userId', async (req, res, next) => {
  try {
    if (
      (req.user && req.user.admin) ||
      (req.user && req.user.id === Number(req.params.userId))
    ) {
      const name = req.body.name
      const address = [
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.country
      ]
      const user = await User.findByPk(req.params.userId)
      const updatedUser = await user.update({
        name,
        address
      })
      res.status(200).json(updatedUser)
    } else {
      res.status(401).send('Not an Admin')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', adminsOnly, async (req, res, next) => {
  try {
    const myUser = await User.findByPk(req.params.id)
    if (myUser) {
      res.json(myUser)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
