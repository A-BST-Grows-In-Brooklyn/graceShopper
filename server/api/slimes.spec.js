const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Slime = db.model('slime')

describe('Slime routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/slimes', () => {
    beforeEach(() => {
      return Slime.create({
        name: 'Slimey',
        color: 'blue',
        texture: 'cloud'
      })
    })

    it('GET /api/slimes', async () => {
      const res = await request(app)
        .get('/api/slimes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Slimey')
    })
  })

  it('GET /api/slimes/:id', async () => {
    Slime.create({
      name: 'Slimey',
      color: 'blue',
      texture: 'cloud'
    })
    const res = await request(app)
      .get('/api/slimes/1')
      .expect(200)
    expect(res.body).to.be.an('object')
    expect(res.body.name).to.be.equal('Slimey')
  })
})
