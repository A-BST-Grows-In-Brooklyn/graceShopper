import {expect} from 'chai'
import {fetchSlimes, fetchSlime} from './slime'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const intialState = {
    slimes: [],
    selectedSlime: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(intialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSlimes', () => {
    it('dispatches the GET SLIMES action', async () => {
      const fakeSlime = {
        name: 'Slimey',
        color: 'blue',
        texture: 'cloud'
      }
      mockAxios.onGet('/api/slimes').replyOnce(200, fakeSlime)
      await store.dispatch(fetchSlimes())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SLIMES')
      expect(actions[0].slimes).to.be.deep.equal(fakeSlime)
    })
  })
})
