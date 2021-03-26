import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {StyledTableCell} from '../theme/reactTheme'
import {viewCart, addToCart, decrementCart, removeFromCart} from '../store/cart'
import {guestCartCheck} from '../store/localStorage'
import {fetchOrder} from '../store/orders'
import setDecimals from '../helperFuncs'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton
} from '@material-ui/core'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchOrder()
    this.props.viewCart()
    guestCartCheck(this.props.addToCart)
  }

  render() {
    const order = this.props.order
    const items = this.props.cart

    const comboFuncAdd = async id => {
      await this.props.addToCart(id, 1)
      await this.props.viewCart()
      await this.props.fetchOrder()
    }

    const comboFuncRemove = async id => {
      await this.props.decrementCart(id, 1)
      await this.props.viewCart()
      await this.props.fetchOrder()
    }

    const comboFuncRemoveAll = async id => {
      await this.props.removeFromCart(id)
      await this.props.fetchOrder()
    }

    return (
      <div id="outerCartContainer">
        <h1 id="cartHeader">Your Shopping Cart</h1>
        <TableContainer component={Paper}>
          <Table m="5rem">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Product</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Cost</StyledTableCell>
                <StyledTableCell align="center">
                  Remove From Cart
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <div id="slimeCartItem">
                      <img
                        src={item.slime.imgURL}
                        alt="Slime Photo"
                        width="200"
                        height="200"
                      />
                      <p>
                        <b>{item.slime.name}</b>
                      </p>
                    </div>
                  </TableCell>

                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    ${setDecimals(item.totalPrice)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => comboFuncRemoveAll(item.slimeId)}
                    >
                      <HighlightOffTwoToneIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell align="center">Totals --</TableCell>
                <TableCell align="center">{order.totalQuantity}</TableCell>
                <TableCell align="center">
                  ${setDecimals(order.totalPrice)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    order: state.orders.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCart: () => dispatch(viewCart()),
    fetchOrder: () => dispatch(fetchOrder()),
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    decrementCart: (id, quantity) => dispatch(decrementCart(id, quantity)),
    removeFromCart: itemId => dispatch(removeFromCart(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
