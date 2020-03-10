import React from 'react'
import {connect} from 'react-redux'
import {fetchLineItemsByOrder, fetchSelectedSlime} from '../store'
import LineItem from './LineItem'

class OrderHistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchLineItemsByOrder(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        {this.props.lineItems
          ? this.props.lineItems.map(lineItem => {
              return (
                <div key={lineItem.id}>
                  {console.log('LINEITEM:', lineItem)}
                  <LineItem slimeId={lineItem.slimeId} lineItem={lineItem} />
                </div>
              )
            })
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lineItems: state.orders.lineItems,
  selectedSlime: state.slime.selectedSlime
})

const mapDispatch = dispatch => ({
  fetchLineItemsByOrder: id => dispatch(fetchLineItemsByOrder(id)),
  fetchSelectedSlime: id => dispatch(fetchSelectedSlime(id))
})

export default connect(mapStateToProps, mapDispatch)(OrderHistoryList)
