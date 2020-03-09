import React from 'react'
import {connect} from 'react-redux'
import {fetchLineItemsByOrder} from '../store'
import SingleSlimeView from './SingleSlimeView'

class OrderHistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchLineItemsByOrder(this.props.order.id)
  }

  render() {
    return (
      <div>
        {this.props.lineItems
          ? this.props.lineItems.map(lineItem => {
              return (
                <div key={lineItem.id}>
                  <div>Product: {<SingleSlimeView id={lineItem.id} />} </div>
                  <div>Quantity: {lineItem.quantity} </div>
                </div>
              )
            })
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lineItems: state.orders.lineItems
})

const mapDispatch = dispatch => ({
  fetchLineItemsByOrder: id => dispatch(fetchLineItemsByOrder(id))
})

export default connect(mapStateToProps, mapDispatch)(OrderHistoryList)
