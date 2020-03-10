import React from 'react'
import {StyledTableCell} from '../theme/reactTheme'
import setDecimals from '../helperFuncs'

import {
  getGuestCart,
  getGuestOrder,
  addToGuestCart,
  updateGuestOrder,
  decrementGuestCart,
  removeFromGuestCart,
  checkoutGuestOrder
} from '../store/localStorage'

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

export default class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      guestCart: getGuestCart(),
      guestOrder: getGuestOrder()
    }
  }

  componentDidMount() {}

  render() {
    const items = getGuestCart()
    const order = getGuestOrder()

    const handleAdd = itemToAdd => {
      addToGuestCart(itemToAdd)
      updateGuestOrder()
      this.setState({
        guestCart: getGuestCart(),
        guestOrder: getGuestOrder()
      })
    }

    const handleDecrement = itemId => {
      decrementGuestCart(itemId)
      updateGuestOrder()
      this.setState({
        guestCart: getGuestCart(),
        guestOrder: getGuestOrder()
      })
    }

    const handleRemove = itemId => {
      removeFromGuestCart(itemId)
      updateGuestOrder()
      this.setState({
        guestCart: getGuestCart(),
        guestOrder: getGuestOrder()
      })
    }

    const handleSubmit = cartItems => {
      checkoutGuestOrder(cartItems)
      this.props.history.push('/checkout')
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
                      onClick={() => handleDecrement(item.slimeId)}
                    >
                      <RemoveCircleOutlinedIcon fontSize="large" />
                    </IconButton>
                    <b id="cartText"> Quantity: {item.quantity}</b>
                    <IconButton color="primary" onClick={() => handleAdd(item)}>
                      <AddCircleOutlinedIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    ${setDecimals(item.totalPrice)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleRemove(item.slimeId)}
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
                    onClick={() => handleSubmit(items)}
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
