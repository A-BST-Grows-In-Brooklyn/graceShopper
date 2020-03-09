import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store'

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h2>Thank you for your order!</h2>
        <h1>Your confirmation number is {this.props.orders.order.id}.</h1>
        <h2>We hope you enjoy your slime!</h2>
      </div>
    )
  }
}

const mapStateToProp = state => {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProp, null)(Confirmation)
