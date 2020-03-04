const {expect} = require('chai')
const db = require('../index')
const Slime = db.model('slime')

describe('Slime model', () => {
  let slime
  before(() => db.sync({force: true}))
  beforeEach(() => {
    slime = {
      name: 'Slimey',
      color: 'blue',
      texture: 'cloud',
      price: 5.5,
      quantity: 100,
      imgURL:
        'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('texture can only be cloud, jelly, foam, butter', async () => {
    slime.texture = 'liquid'
    try {
      const badTextureSlime = await Slime.create(slime)
      if (badTextureSlime)
        throw Error('Validation should have failed with invalid texture')
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
    delete slime.texture
    const defaultTextureSlime = await Slime.create(slime)
    expect(defaultTextureSlime.texture).to.equal('cloud')
  })
})
