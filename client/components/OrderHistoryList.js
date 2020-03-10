import React from 'react'
import {connect} from 'react-redux'
import {fetchLineItemsByOrder, fetchSelectedSlime} from '../store'
import LineItem from './LineItem'

class OrderHistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchLineItemsByOrder(this.props.match.params.orderId)
  }

  // map = async (items) => {
  //   for (let i = 0; i < items.length; i++) {
  //     if (!item) {
  //       return null;
  //     } else {
  //       return <LineItem slimeId={items[i].slimeId} lineItem={items[i]} />
  //     }
  //   }
  // }

  render() {
    console.log(this.props.lineItems)
    return (
      <div>
        {this.props.lineItems
          ? this.props.lineItems.map(lineItem => (
              <LineItem
                key={lineItem.id}
                slimeId={lineItem.slimeId}
                lineItem={lineItem}
              />
            ))
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
