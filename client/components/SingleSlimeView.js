import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedSlime} from '../store'

class SingleSlimeView extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedSlime(this.props.id)
  }

  render() {
    return <div>{this.props.selectedSlime.name}</div>
  }
}

const mapState = state => ({
  selectedSlime: state.slime.selectedSlime
})

const mapDispatch = dispatch => ({
  fetchSelectedSlime: id => dispatch(fetchSelectedSlime(id))
})

export default connect(mapState, mapDispatch)(SingleSlimeView)
