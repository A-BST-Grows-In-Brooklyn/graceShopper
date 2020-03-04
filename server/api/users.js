const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.admin) {
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

// //This should allow only Admin to view user information
// router.get('/', async (req, res, next) => {
//   try {
//     if (req.user.admin) {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//     } else {
//       res.status(401).send('Not An Admin')
//     }
//   } catch (err) {
//     next(err)
//   }
// })
