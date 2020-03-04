import axios from 'axios'

const GET_CART = 'GET_CART'
// const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
// const SUB_QUANTITY = 'SUB_QUANTITY'
// const ADD_QUANTITY = 'ADD_QUANTITY'

export const getCart = cart => ({type: GET_CART, cart})

// export const addItem = itemId => ({type: ADD_TO_CART, itemId})

export const removeItem = itemId => ({type: REMOVE_ITEM, itemId})

export const viewCart = () => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (error) {
      next(error)
    }
  }
}

// export const addToCart = slimeId => {
//   return async (dispatch, next) => {
//     try {
//
//     } catch (error) {
//       next(error)
//     }
//   }
// }

export const removeFromCart = itemId => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.delete(`/api/cart/${itemId}`)
      dispatch(removeItem(data))
      dispatch(viewCart())
    } catch (error) {
      next(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    // case ADD_TO_CART:
    //   return [...state, action.]

    case REMOVE_ITEM: {
      const newCart = state.filter(item => item.id !== action.itemId)
      return [...newCart]
    }
    default:
      return state
  }
}
