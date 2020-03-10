import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {viewCart} from '../store/cart'
import {fetchOrder, completeOrder, me} from '../store'
import UserForm from './userform'
import ReviewItems from './ReviewItems'
import setDecimals from '../helperFuncs'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.me()
    await this.props.fetchOrder()
    let user = this.props.user

    await this.props.viewCart()
    let cart = this.props.cart
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      submitted: true
    })
  }

  // setDecimals (number) {
  //   return (number/100).toFixed(2)
  // }

  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/confirmation/:orderId" />
    }

    return (
      <form id="checkout-form" onSubmit={this.handleSubmit}>
        <h1>Order Summary</h1>

        <h2>1. Shipping Address</h2>
        <div>
          <UserForm />
        </div>

        <h2>2. Payment Method</h2>

        {/* No need to add this right now */}

        <h2>3. Review Items</h2>
        <div>
          <ReviewItems />
        </div>

        <h2>4. Order Total</h2>
        <p>Subtotal: {`$ ${setDecimals(this.props.orders.totalPrice)}`}</p>
        <p>Shipping:</p>
        <p>Tax:</p>
        <p>Order Total: {`$ ${setDecimals(this.props.orders.totalPrice)}`}</p>

        {/* If not a user we can add a field to add a password and create user. */}

        <button
          type="submit"
          onClick={() => {
            this.props.completeOrder(this.props.orders.id)
          }}
        >
          Place Your Order
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  orders: state.orders.order
})

const mapDispatchToProps = dispatch => ({
  viewCart: () => dispatch(viewCart()),
  me: () => dispatch(me()),
  fetchOrder: () => dispatch(fetchOrder()),
  completeOrder: id => dispatch(completeOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
