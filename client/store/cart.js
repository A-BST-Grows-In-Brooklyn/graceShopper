// import axios from 'axios'

// /**
//  * INITIAL STATE
//  */
// const intialState = []

// /**
//  * ACTION TYPES
//  */
// const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_ITEM = 'REMOVE_ITEM'
// const SUB_QUANTITY = 'SUB_QUANTITY'
// const ADD_QUANTITY = 'ADD_QUANTITY'

// /**
//  * ACTION CREATORS
//  */
// export const addItem = itemId => ({type: ADD_TO_CART, itemId})
// export const removeItem = itemId => ({type: REMOVE_ITEM, itemId})

// // /**
// //  * THUNK CREATORS
// //  */
// export const addToCart = (itemId) => {
//   return async (dispatch, next) => {
//     try {
//       console.log('linter placeholder')
//     } catch (error) {
//       next(error)
//     }
//   }
// }

// /**
//  * REDUCER
//  */
// export const cartReducer = (state = cart, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return [...state, action.item]
//     case REMOVE_ITEM:
//       return cart
//     default:
//       return state
//   }
// }
