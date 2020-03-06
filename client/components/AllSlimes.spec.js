import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ConnectedToAllSlimes from './AllSlimes'
import ConnectedToSingleSlime from './SingleSlime'
import configureMockStore from 'redux-mock-store'
import thunkMiddleWare from 'redux-thunk'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'
import 'jsdom-global/register'
const {MemoryRouter} = rrd
import Home from './Home'

const adapter = new Adapter()
enzyme.configure({adapter})

const middlewares = [thunkMiddleWare]
const mockStore = configureMockStore(middlewares)

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Home />)
    const welcome = <h1>Welcome to Slime Generation!!!</h1>
    expect(wrapper.contains(welcome)).to.equal(true)
  })
})

describe('SingleSlime', () => {
  let fakeStore
  const slime = {
    selectedSlime: {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'}
  }
  beforeEach(() => {
    fakeStore = mockStore({
      slime: slime
    })
  })
  it('renders single slime by id', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ConnectedToSingleSlime match={{params: {id: 1}}} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.text()).to.include('Slimey')
  })
})

describe('AllSlimes', () => {
  let fakeStore
  const slimes = {
    slimes: [
      {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'},
      {id: 2, name: 'SlimeyII', color: 'blue', texture: 'cloud'}
    ]
  }
  beforeEach(() => {
    fakeStore = mockStore({
      slime: slimes
    })
  })
  it('renders the slimes passed in as props', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ConnectedToAllSlimes />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.text()).to.include('Slimey')
    expect(wrapper.text()).to.include('SlimeyII')
  })
})
