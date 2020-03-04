import React from 'react'
import {connect} from 'react-redux'
import {viewCart, removeFromCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.viewCart()
  }

  render() {
    const items = this.props.cart

    return (
      <div id="cart">
        {items.map(item => (
          <div id="item" key={item.id}>
            <div>
              <b>{item.slime.name}</b>
            </div>
            <img
              src={item.slime.imgUrl}
              alt="Slime Photo"
              width="200"
              height="200"
            />
            <div>Quantity in cart: {item.quantity}</div>
            <button
              type="submit"
              onClick={() => this.props.removeFromCart(item.id)}
            >
              Remove from Cart
            </button>
            <p />
          </div>
        ))}
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
    viewCart: () => dispatch(viewCart()),
    removeFromCart: itemId => dispatch(removeFromCart(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
