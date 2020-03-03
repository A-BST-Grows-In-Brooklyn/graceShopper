import React from 'react'
import {connect} from 'react-redux'
import {viewCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.viewCart()
  }

  render() {
    const slimes = this.props.cart

    return (
      <div id="cart">
        {slimes.map(slime => (
          <div id="slime" key={slime.slimeId}>
            <img src="https://cdn141.picsart.com/259583308016202.png?to=crop&r=256&q=70" />
            <div>Quantity in cart: {slime.quantity}</div>
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
    viewCart: () => dispatch(viewCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
