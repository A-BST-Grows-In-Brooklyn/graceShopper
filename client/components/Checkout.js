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

        {/* would be cool if we could do shipping address / billing address, checkbox if they're the same and pre-populate the info // also other ways to pay - paypal, credit card, etc.*/}

        <button type="submit">Place Order</button>
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
