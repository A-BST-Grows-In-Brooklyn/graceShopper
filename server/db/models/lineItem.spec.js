const {expect} = require('chai')
const db = require('../index')
const Slime = db.model('slime')
const User = db.model('user')
const Order = db.model('order')

describe.only('Line Item model', () => {
  let slime
  let user
  let order
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
    user = {
      id: 1,
      email: 'me@yahoo.com',
      password: 'password'
    }
    order = {
      userId: 1,
      totalPrice: 0,
      completed: false,
      address: '123 Okay Lane'
    }
  })

  afterEach(() => db.sync({force: true}))

  it('order populates with the appropriate information (when hardcoded in)', async () => {
    order.notARealAttribute = 'does not compute'
    let savedUser = await User.create(user)
    let savedOrder = await Order.create(order)
    expect(savedOrder.userId).to.equal(1)
    expect(savedOrder.totalPrice).to.equal(0)
    expect(savedOrder.completed).to.equal(false)
    expect(savedOrder.address).to.equal('123 Okay Lane')
    expect(savedOrder.notARealAttribute).to.equal(undefined)
  })

  it('creates a new order instance when item is added to cart and cart does not exist', async () => {
    let savedSlime = await Slime.create(slime)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(15)
    expect(lineItems[0].slimeId).to.equal(1)
    expect(lineItems[0].quantity).to.equal(3)
    expect(lineItems[0].totalPrice).to.equal(15)
  })
})
