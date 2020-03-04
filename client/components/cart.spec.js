import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart component', () => {
  beforeEach(() => {
    let wrapper
    wrapper = shallow(
      <Cart
        items={[
          {
            id: 3,
            userId: 1,
            slimeId: 1,
            quantity: 1,
            createdAt: '2020-03-04T16:59:13.097Z',
            updatedAt: '2020-03-04T16:59:13.097Z',
            slime: {
              id: 1,
              name: 'Rose Whip',
              color: 'pink',
              texture: 'butter',
              price: '13.99',
              quantity: 60,
              imgURL:
                'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Facetune_28-02-2020-16-48-38_grande.jpg?v=1582979807',
              createdAt: '2020-03-04T16:59:12.945Z',
              updatedAt: '2020-03-04T16:59:12.945Z'
            }
          }
        ]}
      />
    )
  })

  // it('renders the slime name', () => {
  //   expect(wrapper.text()).to.include('Rose Whip')
  // })
})
