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
      price: 500,
      quantity: 100,
      imgURL:
        'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
    }
  })
  afterEach(() => db.sync({force: true}))

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

  it('should default quantity to 100 if no number is specified', async () => {
    slime.quantity = undefined
    const badQuantitySlime = await Slime.create(slime)
    expect(badQuantitySlime.quantity).to.equal(100)
  })

  it('should default imageURL to specified link if no URL link is specified', async () => {
    slime.imgURL = undefined
    const badImgURLSlime = await Slime.create(slime)
    expect(badImgURLSlime.imgURL).to.equal(
      'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Facetune_26-02-2020-21-42-25_grande.jpg?v=1582978921'
    )
  })
})
