import React from 'react'
import {connect} from 'react-redux'
import {viewCart} from '../store/cart'
import {fetchOrder, completeOrder} from '../store'
import {
  getGuestCart,
  getGuestOrder,
  checkoutGuestOrder,
  clearGuestCartAndOrder
} from '../store/localStorage'
import UserForm from './userform'
import GuestForm from './guestform'
import ReviewItems from './ReviewItems'
import setDecimals from '../helperFuncs'
import history from '../history'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrder()
    this.props.viewCart()
  }

  handleSubmit(event) {
    event.preventDefault()
    history.push('/confirmation/:orderId')
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        <h1>Order Summary</h1>
        <h2>1. Shipping Address</h2>
        <div>{isLoggedIn ? <UserForm checkout={true} /> : <GuestForm />}</div>

        <form id="checkout-form" onSubmit={this.handleSubmit}>
          <h2>2. Payment Method</h2>

          <h2>3. Review Items</h2>
          <div>
            <ReviewItems />
          </div>

          <h2>4. Order Total</h2>
          <p>
            Subtotal:
            {isLoggedIn
              ? `$ ${setDecimals(this.props.orders.totalPrice)}`
              : '$' + setDecimals(getGuestOrder().totalPrice)}
          </p>
          <p>Shipping:</p>
          <p>Tax:</p>
          <p>
            Order Total:
            {isLoggedIn
              ? `$ ${setDecimals(this.props.orders.totalPrice)}`
              : '$' + setDecimals(getGuestOrder().totalPrice)}
          </p>

          <button
            type="submit"
            onClick={() => {
              isLoggedIn
                ? this.props.completeOrder(
                    this.props.orders.id,
                    this.props.address
                  )
                : checkoutGuestOrder(getGuestCart())
              clearGuestCartAndOrder()
            }}
          >
            Place Your Order
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  orders: state.orders.order,
  address: state.orders.address
})

const mapDispatchToProps = dispatch => ({
  viewCart: () => dispatch(viewCart()),
  fetchOrder: () => dispatch(fetchOrder()),
  completeOrder: (id, address) => dispatch(completeOrder(id, address))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
