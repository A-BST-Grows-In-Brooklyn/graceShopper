import React from 'react'
import {connect} from 'react-redux'
import {fetchCompletedOrders} from '../store'
import setDecimals from '../helperFuncs'
import {Link} from 'react-router-dom'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchCompletedOrders()
  }

  render() {
    return this.props.completedOrders.map(order => {
      return (
        <div key={order.id}>
          <Link to={`/orderhistorylist/${order.id}`} key={order.id}>
            <div>Id: {order.id}</div>
            <div>Total Quantity: {order.totalQuantity}</div>
            <div>Total Price: {setDecimals(order.totalPrice)}</div>
          </Link>
        </div>
      )
    })
  }
}

const mapStateToProps = state => ({
  completedOrders: state.orders.completedOrders
})
const mapDispatchToProps = dispatch => ({
  fetchCompletedOrders: () => dispatch(fetchCompletedOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
