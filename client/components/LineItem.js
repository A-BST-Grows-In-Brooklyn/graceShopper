import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedSlime} from '../store'

class LineItem extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedSlime(this.props.slimeId)
  }

  render() {
    console.log(this.props.selectedSlime)
    return (
      <div key={this.props.lineItem.id}>
        Slime:{' '}
        {this.props.selectedSlime.id === this.props.lineItem.slimeId
          ? this.props.selectedSlime.name
          : null}
        Quanity:{' '}
        {this.props.selectedSlime.id === this.props.lineItem.slimeId
          ? this.props.lineItem.quantity
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedSlime: state.slime.selectedSlime
})

const mapDispatchToProps = dispatch => ({
  fetchSelectedSlime: id => dispatch(fetchSelectedSlime(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineItem)
