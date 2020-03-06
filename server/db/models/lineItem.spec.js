const {expect} = require('chai')
const db = require('../index')
const Slime = db.model('slime')
const User = db.model('user')
const Order = db.model('order')

describe.only('Line Item + Order model', () => {
  let slime
  let user
  let order
  let completeOrder
  let slime2
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
    slime2 = {
      name: 'Slimey2',
      color: 'purple',
      texture: 'cloud',
      price: 10,
      quantity: 100,
      imgURL:
        'https://www.savynaturalista.com/wp-content/uploads/Green-SLime-No-glue_.jpg'
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
    expect(newOrder.totalQuantity).to.equal(3)
    expect(lineItems[0].slimeId).to.equal(1)
    expect(lineItems[0].quantity).to.equal(3)
    expect(lineItems[0].totalPrice).to.equal(15)
  })

  it('checkout sets order to completed', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    await newOrder.checkOut()
    expect(newOrder.completed).to.equal(true)
  })

  it('creates a new order instance when item is added to cart and previous cart is marked as completed', async () => {
    let savedSlime = await Slime.create(slime)
    let savedUser = await User.create(user)
    let firstOrder = await Order.addItem(1, 3, 1)
    await firstOrder.checkOut()
    let newOrder = await Order.addItem(1, 3, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(2)
    expect(newOrder.totalPrice).to.equal(15)
    expect(lineItems[0].slimeId).to.equal(1)
    expect(lineItems[0].quantity).to.equal(3)
    expect(lineItems[0].totalPrice).to.equal(15)
  })

  it('updates an order instance when item is added to cart and item is not already in cart', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 1, 1)
    newOrder = await Order.addItem(2, 2, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(25)
    expect(newOrder.totalQuantity).to.equal(3)
    expect(lineItems[0].slimeId).to.equal(1)
    expect(lineItems[0].quantity).to.equal(1)
    expect(lineItems[0].totalPrice).to.equal(5)
    expect(lineItems[1].slimeId).to.equal(2)
    expect(lineItems[1].quantity).to.equal(2)
    expect(lineItems[1].totalPrice).to.equal(20)
  })

  it('updates an order instance when item is added to cart and item is already in cart', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.addItem(2, 1, 1)
    newOrder = await Order.addItem(1, 3, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(40)
    expect(newOrder.totalQuantity).to.equal(7)
    expect(lineItems.length).to.equal(2)
    expect(lineItems[0].quantity).to.equal(1)
    expect(lineItems[0].totalPrice).to.equal(10)
    expect(lineItems[1].quantity).to.equal(6)
    expect(lineItems[1].totalPrice).to.equal(30)
  })

  it('updates an order instance when item is removed from cart', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.addItem(2, 1, 1)
    newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.removeItem(1, 1, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(35)
    expect(newOrder.totalQuantity).to.equal(6)
    expect(lineItems.length).to.equal(2)
  })

  it('removes a line item instance when the quantity is 0', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.addItem(2, 1, 1)
    newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.removeItem(1, 6, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(10)
    expect(newOrder.totalQuantity).to.equal(1)
    expect(lineItems.length).to.equal(1)
  })

  it('removeItemAll sets quantity to 0 and deletes instance', async () => {
    let savedSlime = await Slime.create(slime)
    let savedSlime2 = await Slime.create(slime2)
    let savedUser = await User.create(user)
    let newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.addItem(2, 1, 1)
    newOrder = await Order.addItem(1, 3, 1)
    newOrder = await Order.removeItemAll(1, 1)
    let lineItems = await newOrder.getLineItems()
    expect(newOrder.id).to.equal(1)
    expect(newOrder.totalPrice).to.equal(10)
    expect(newOrder.totalQuantity).to.equal(1)
    expect(lineItems.length).to.equal(1)
  })
})
