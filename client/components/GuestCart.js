// import React from 'react'
// import {connect} from 'react-redux'
// import {StyledTableCell} from '../theme/reactTheme'

// import {
//   setGuestCart,
//   getGuestCart,
//   getGuestOrder,
//   addToGuestCart,
//   decrementGuestCart,
//   removeFromGuestCart,
//   clearGuestCart,
//   updateGuestOrder
// } from '../store/localStorage'
// import {viewOrder} from '../store/order'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableSortLabel,
//   Paper,
//   Button,
//   IconButton,
//   Tab
// } from '@material-ui/core'
// import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
// import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone'

// export default class GuestCart extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       guestCart: getGuestCart(),
//       guestOrder: updateGuestOrder()
//     }

//     this.handleChange = this.handleChange.bind(this)
//   }

//   componentDidMount() {
//     getGuestCart()
//     updateGuestOrder()
//   }

//   handleAdd(event) {

//     this.setState({
//       guestCart: getGuestCart(),
//       guestOrder: updateGuestOrder()
//     })
//   }

//   render() {
//     const order = this.state.order
//     const items = this.state.cart

//     const handleAdd = itemToAdd => {
//       await this.props.addToCart(id, 1)
//       await this.props.viewCart()
//       await this.props.viewOrder()
//     }

//     const handleDecrement = itemId => {
//       await this.props.decrementCart(id, 1)
//       await this.props.viewCart()
//       await this.props.viewOrder()
//     }

//     const handleRemove = async id => {
//       await this.props.removeFromCart(id)
//       await this.props.viewOrder()
//     }

//     return (
//       <div id="outerCartContainer">
//         <h1 id="cartHeader">Your Shopping Cart</h1>
//         <TableContainer component={Paper}>
//           <Table m="5rem">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center">Product</StyledTableCell>
//                 <StyledTableCell align="center">Quantity</StyledTableCell>
//                 <StyledTableCell align="center">Cost</StyledTableCell>
//                 <StyledTableCell align="center">
//                   Remove From Cart
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map(item => (
//                 <TableRow key={item.id}>
//                   <TableCell component="th" scope="row">
//                     <div id="slimeCartItem">
//                       <img
//                         src={item.slime.imgURL}
//                         alt="Slime Photo"
//                         width="200"
//                         height="200"
//                       />
//                       <p>
//                         <b>{item.slime.name}</b>
//                       </p>
//                     </div>
//                   </TableCell>

//                   <TableCell align="center">
//                     <IconButton
//                       color="primary"
//                       onClick={() => {
//                         decrementGuestCart(item.slimeId)
//                       }}
//                     >
//                       <RemoveCircleOutlinedIcon fontSize="large" />
//                     </IconButton>
//                     <b id="cartText"> Quantity: {item.quantity}</b>
//                     <IconButton
//                       color="primary"
//                       onClick={() => comboFuncAdd(item.slimeId)}
//                     >
//                       <AddCircleOutlinedIcon fontSize="large" />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell align="center">${item.totalPrice}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       color="primary"
//                       onClick={() => comboFuncRemoveAll(item.slimeId)}
//                     >
//                       <HighlightOffTwoToneIcon fontSize="large" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}

//               <TableRow>
//                 <TableCell align="center">Totals --</TableCell>
//                 <TableCell align="center">{order.totalQuantity}</TableCell>
//                 <TableCell align="center">${order.totalPrice}</TableCell>
//                 <TableCell align="center">
//                   <Button variant="contained" color="primary">
//                     Checkout
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     )
//   }
// }
