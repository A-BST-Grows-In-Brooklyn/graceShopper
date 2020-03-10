import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedSlime} from '../store'

class LineItem extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedSlime(this.props.slimeId)
  }

  render() {
    return (
      <div>
        {console.log('SLIMEOBJECT:', this.props.selectedSlime)}
        Slime: {this.props.selectedSlime.name}
        Quanity: {this.props.lineItem.quantity}
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
