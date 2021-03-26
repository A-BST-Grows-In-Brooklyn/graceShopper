// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow, mount} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import connectedToAllSlimes from './AllSlimes'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleWare from 'redux-thunk'
// import {Provider} from 'react-redux'
// import * as rrd from 'react-router-dom'
// import 'jsdom-global/register'
// const {MemoryRouter} = rrd

// const adapter = new Adapter()
// enzyme.configure({adapter})

// const middlewares = [thunkMiddleWare]
// const mockStore = configureMockStore(middlewares)
// const initialState = {
//   slimes: []
// }

// // describe('UserHome', () => {
// //   let userHome

// //   beforeEach(() => {
// //     userHome = shallow(<UserHome email="cody@email.com" />)
// //   })

// //   it('renders the email in an h3', () => {
// //     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
// //   })
// // })

// describe('AllSlimes', () => {
//   let fakeStore
//   const slimes = [
//     {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'},
//     {id: 2, name: 'SlimeyII', color: 'blue', texture: 'cloud'}
//   ]
//   beforeEach(() => {
//     fakeStore = mockStore(initialState)
//   })

//   describe('<connectedToAllSlimes /> component', () => {
//     it('renders the slimes passed in as props', () => {
//       const wrapper = mount(
//         <Provider store={fakeStore}>
//           <MemoryRouter>
//             <connectedToAllSlimes
//               slimes={[
//                 {id: 1, name: 'Slimey', color: 'blue', texture: 'cloud'},
//                 {id: 2, name: 'SlimeyII', color: 'blue', texture: 'cloud'}
//               ]}
//             />
//           </MemoryRouter>
//         </Provider>
//       )
//       expect(wrapper.text()).to.include('Slimey')
//       expect(wrapper.text()).to.include('SlimeyII')
//     })
//   })
// })
