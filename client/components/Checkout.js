import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {viewCart} from '../store/cart'
// import {fetchSlimes} from '../store'
// import {Slime} from './Slime'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleSubmit(event) {
    event.preventDefault()
    // take data from checkout and store it in order history
    // take data from order_products through table and change status to complete
    this.setState({
      submitted: true
    })
  }

  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/confirmation/:orderId" />
    }

    const items = this.props.cart

    return (
      <form id="checkout-form" onSubmit={this.handleSubmit}>
        <h1>Order Summary</h1>

        <h2>1. Shipping Address</h2>
        <div>
          <label htmlFor="userName">Name</label>
          <input
            name="userName"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Field Required" // can make place holder the value if we can pull in logged in user info
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Field Required" // can make place holder the value if we can pull in logged in user info
          />
          {/* Form data, option to pre-populate if logged in user is saved. */}
        </div>

        <h2>2. Payment Method</h2>

        {/* No need to add this right now */}

        <h2>3. Review Items</h2>
        <div>
          {/* Insert single view items - no option to edit. */}
          {/* Create single view item component to make this easier. */}
        </div>

        <h2>4. Order Total</h2>
        <p>Subtotal:</p>
        <p>Shipping:</p>
        <p>Tax:</p>
        <p>Order Total:</p>

        {/* If not a user we can add a field to add a password and create user. */}

        <button type="submit">Place Your Order</button>

        {/* would be cool if we could do shipping address / billing address, checkbox if they're the same and pre-populate the info // also other ways to pay - paypal, credit card, etc.*/}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  viewCart: () => dispatch(viewCart())
  // fetchUser
  // fetch total order and total order price
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
