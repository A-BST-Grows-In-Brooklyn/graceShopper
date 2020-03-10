import React from 'react'
import {connect} from 'react-redux'
import {fetchSlimeLineItems} from '../store'
import LineItem from './LineItem'

class OrderHistoryList extends React.Component {
  componentDidMount() {
    this.props.fetchSlimeLineItems(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        {this.props.slimeLineItems
          ? this.props.slimeLineItems.map(lineItem => {
              return <LineItem key={lineItem.id} lineItem={lineItem} />
            })
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  slimeLineItems: state.orders.slimeLineItems
})

const mapDispatch = dispatch => ({
  fetchSlimeLineItems: id => dispatch(fetchSlimeLineItems(id))
})

export default connect(mapStateToProps, mapDispatch)(OrderHistoryList)
