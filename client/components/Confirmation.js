import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store'

class Confirmation extends React.Component {
  // async componentDidMount() {
  //   await this.props.fetchOrder()
  // }

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

// const mapDispatch = (dispatch) => {
//   return {
//     fetchOrder: () => dispatch(fetchOrder())
//   }
// }

export default connect(mapStateToProp, null)(Confirmation)

//export default Confirmation

// mapStateToProps to bring in info on most recent order
