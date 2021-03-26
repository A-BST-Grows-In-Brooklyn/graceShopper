import {expect} from 'chai'
import {viewCart, removeFromCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunk creators', () => {
  let store
  let mockAxios

  const intialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(intialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('viewCart', () => {
    it('dispatches the GET_CART action', async () => {
      const fakeCart = {
        slimeId: 2,
        userId: 3,
        quantity: 4
      }
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(viewCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })
  })

  // describe('removeFromCart', () => {
  //   it ('dispatches the REMOVE_ITEM action', async () => {
  //     const fakeCart = {
  //       slimeId: 2,
  //       userId: 3,
  //       quantity: 4
  //     }
  //     mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
  //     await store.dispatch(removeFromCart())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('REMOVE_ITEM')
  //   })
  // })
})
