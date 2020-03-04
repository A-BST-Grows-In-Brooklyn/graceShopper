const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart', () => {
    beforeEach(() => {
      return Cart.create({
        quantity: 100
      })
    })

    // it('GET /api/cart', async () => {
    //   const res = await request(app)
    //     .get('/api/cart')
    //     .expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].quantity).to.be.equal(1)
    // })
  })
})
