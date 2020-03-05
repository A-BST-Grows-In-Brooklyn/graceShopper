import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import connectedToAllSlimes from './AllSlimes'
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
const initialState = {
  slimes: []
}

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Home />)
    const welcome = <h1>Welcome to Slime Generation!!!</h1>
    expect(wrapper.contains(welcome)).to.equal(true)
  })
})

// describe('Single Slime component testing', function() {
//   let fakeStore
//   const slime = [
//     {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'}
//   ]
//   beforeEach(() => {
//     fakeStore = mockStore(initialState)
//   })

//   describe('<connectedToSingleSlime /> component', () => {
//     it('renders the slime passed in as props', () => {
//       const wrapper = mount(
//         <Provider store={fakeStore}>
//           <MemoryRouter>
//             <connectedToSingleSlime
//               slime={[
//                 {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'}
//               ]}
//             />
//           </MemoryRouter>
//         </Provider>
//       )
//       expect(wrapper.text()).to.include('Slimey')
//       expect(wrapper.text()).to.include('SlimeyII')
//     })
//   })

describe('AllSlimes', () => {
  let fakeStore
  const slimes = [
    {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'},
    {id: 2, name: 'SlimeyII', color: 'blue', texture: 'cloud'}
  ]
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('<connectedToAllSlimes /> component', () => {
    it('renders the slimes passed in as props', () => {
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <connectedToAllSlimes
              slimes={[
                {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'},
                {id: 2, name: 'SlimeyII', color: 'blue', texture: 'cloud'}
              ]}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.text()).to.include('Slimey')
      expect(wrapper.text()).to.include('SlimeyII')
    })
  })
})
