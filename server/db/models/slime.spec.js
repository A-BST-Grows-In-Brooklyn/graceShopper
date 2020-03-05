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
      price: 5,
      quantity: 100,
      imgURL:
        'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields name, color, texture, price, quantity, imageURL', async () => {
    slime.notARealAttribute = 'does not compute'
    const savedSlime = await Slime.create(slime)
    expect(savedSlime.name).to.equal('Slimey')
    expect(savedSlime.color).to.equal('blue')
    expect(savedSlime.texture).to.equal('cloud')
    expect(savedSlime.price).to.equal('5.00')
    expect(savedSlime.quantity).to.equal(100)
    expect(savedSlime.imgURL).to.equal(
      'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
    )
    expect(savedSlime.notARealAttribute).to.equal(undefined)
  })

  it('requires `name`', async () => {
    slime.name = null
    let result, error
    try {
      result = await slime.validate()
    } catch (err) {
      error = err
    }
    if (result) throw Error('validation should fail when content is null')
    expect(error).to.be.an.instanceOf(Error)
  })

  it('texture can only be cloud, jelly, foam, butter', async () => {
    slime.texture = 'liquid'
    try {
      const badTextureSlime = await Slime.create(slime)
      if (badTextureSlime)
        throw Error('Validation should have failed with invalid texture')
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
    slime.texture = 'cloud'
    const defaultTextureSlime = await Slime.create(slime)
    expect(defaultTextureSlime.texture).to.equal('cloud')
  })
})
