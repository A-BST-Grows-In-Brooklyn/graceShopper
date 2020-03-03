import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedSlime} from '../store'

class SingleSlime extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedSlime(this.props.match.params.id)
  }

  render() {
    const slime = this.props.slime

    return (
      <div>
        <h1>HELLO</h1>
        <img src={slime.imgUrl} alt="Slime Photo" width="200" height="200" />
        {slime.name}
        {slime.price}
        {slime.color}
        {slime.texture}
        <button>Add to Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    slime: state.slime.selectedSlime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedSlime: id => dispatch(fetchSelectedSlime(id))
  }
}

const connectedToSingleSlime = connect(mapStateToProps, mapDispatchToProps)(
  SingleSlime
)
export default connectedToSingleSlime
