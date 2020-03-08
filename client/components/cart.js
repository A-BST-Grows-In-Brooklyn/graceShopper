import React from 'react'
import {connect} from 'react-redux'
import {viewCart, addToCart, decrementCart, removeFromCart} from '../store/cart'
import {viewOrder} from '../store/order'
import {Grid, Button, IconButton} from '@material-ui/core'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'

class Cart extends React.Component {
  componentDidMount() {
    this.props.viewCart()
    this.props.viewOrder()
  }

  render() {
    const order = this.props.order
    const items = this.props.cart

    const comboFuncAdd = async id => {
      await this.props.addToCart(id, 1)
      await this.props.viewCart()
      await this.props.viewOrder()
    }

    const comboFuncRemove = async id => {
      await this.props.decrementCart(id, 1)
      await this.props.viewCart()
      await this.props.viewOrder()
    }

    const comboFuncRemoveAll = async id => {
      await this.props.removeFromCart(id)
      await this.props.viewOrder()
    }

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
              <IconButton
                color="primary"
                onClick={() => comboFuncRemove(item.slimeId)}
              >
                <RemoveCircleOutlinedIcon fontSize="large" />
              </IconButton>

              <b id="cartText"> Quantity: {item.quantity}</b>
              <IconButton
                color="primary"
                onClick={() => comboFuncAdd(item.slimeId)}
              >
                <AddCircleOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
            <div id="cartTextContainer">
              <b id="cartText">${item.totalPrice}</b>
            </div>
            <div id="cartTextContainer">
              <Button
                id="cartText"
                color="primary"
                onClick={() => comboFuncRemoveAll(item.slimeId)}
              >
                Remove from Cart
              </Button>
            </div>
          </div>
        ))}
        <div id="cartItem">
          <div id="cartFooter">
            <div id="cartTextContainer">
              <b id="cartText">Total Slimes: {order.totalQuantity}</b>
            </div>
            <div id="cartTextContainer">
              <b id="cartText">Total cost: ${order.totalPrice}</b>
            </div>
            <div id="cartTextContainer">
              <Button id="cartText" variant="contained" color="primary">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCart: () => dispatch(viewCart()),
    viewOrder: () => dispatch(viewOrder()),
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    decrementCart: (id, quantity) => dispatch(decrementCart(id, quantity)),

    removeFromCart: itemId => dispatch(removeFromCart(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
