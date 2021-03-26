import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedSlime, addToCart} from '../store'
import setDecimals from '../helperFuncs'
import {addToGuestCart, updateGuestOrder} from '../store/localStorage'
import {Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

class SingleSlime extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedSlime(this.props.match.params.id)
  }

  render() {
    const slime = this.props.slime

    return (
      <div>
        <h1>{slime.name}</h1>
        <img src={slime.imgURL} alt="Slime Photo" width="200" height="200" />
        <h4>${setDecimals(slime.price)}</h4>
        <h4>color : {slime.color}</h4>
        <h4>texture : {slime.texture}</h4>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.addToCart(slime.id, 1)
            addToGuestCart(slime)
            updateGuestOrder()
          }}
        >
          Add to Cart
        </Button>
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
    fetchSelectedSlime: id => dispatch(fetchSelectedSlime(id)),
    addToCart: (itemId, quantity) => dispatch(addToCart(itemId, quantity))
  }
}

const connectedToSingleSlime = connect(mapStateToProps, mapDispatchToProps)(
  SingleSlime
)
export default connectedToSingleSlime
