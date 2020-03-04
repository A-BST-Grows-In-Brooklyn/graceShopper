import React from 'react'
import {connect} from 'react-redux'
import {viewCart, removeFromCart, incrementCartItem} from '../store/cart'
import {Grid, Button, IconButton} from '@material-ui/core'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'

class Cart extends React.Component {
  componentDidMount() {
    this.props.viewCart()
  }

  render() {
    const items = this.props.cart

    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <h1 id="cartHeader">My Cart</h1>

        {items.map(item => (
          <div id="cartItem" key={item.id}>
            <div id="cartTextContainer">
              <b id="cartText">{item.slime.name}</b>
            </div>
            <img
              src={item.slime.imgURL}
              alt="Slime Photo"
              width="200"
              height="200"
            />
            <div id="cartTextContainer">
              <IconButton color="primary">
                <RemoveCircleOutlinedIcon fontSize="large" />
              </IconButton>

              <b id="cartText"> Quantity: {item.quantity}</b>
              <IconButton
                color="primary"
                onClick={() => this.props.incrementCartItem(item.id)}
              >
                <AddCircleOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
            <div id="cartTextContainer">
              <Button
                id="cartText"
                color="primary"
                onClick={() => this.props.removeFromCart(item.id)}
              >
                Remove from Cart
              </Button>
            </div>
          </div>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCart: () => dispatch(viewCart()),
    removeFromCart: itemId => dispatch(removeFromCart(itemId)),
    incrementCartItem: itemId => dispatch(incrementCartItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
