import React from 'react'
import {connect} from 'react-redux'
import {viewCart} from '../store/cart'
import {getGuestCart} from '../store/localStorage'
import setDecimals from '../helperFuncs'

class ReviewItems extends React.Component {
  componentDidMount() {
    this.props.viewCart()
  }

  render() {
    let items = this.props.cart

    const {isLoggedIn} = this.props

    if (!isLoggedIn) {
      items = getGuestCart()
    }

    return (
      <div>
        {items.map(item => {
          return (
            <div key={item.id}>
              <div>Product: {item.slime.name} </div>
              <div>Price: ${setDecimals(item.totalPrice)}</div>
              <div>Quantity: {item.quantity}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCart: () => dispatch(viewCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItems)
