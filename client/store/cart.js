import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEN'
// const SUB_QUANTITY = 'SUB_QUANTITY'
// const ADD_QUANTITY = 'ADD_QUANTITY'

export const getCart = cart => ({type: GET_CART, cart})

export const addItem = item => ({type: ADD_TO_CART, item})

export const incrementItem = item => ({type: INCREMENT_ITEM, item})

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

export const addToCart = (itemId, quantity) => {
  return async (dispatch, next) => {
    const itemToAdd = {itemId: itemId, quantity: quantity}
    try {
      const {data} = await axios.post(`/api/cart/`, itemToAdd)
      dispatch(addItem(data))
      dispatch(viewCart())
    } catch (error) {
      next(error)
    }
  }
}

export const incrementCartItem = itemId => {
  return async (dispatch, next) => {
    const itemToAdd = {itemId: itemId}
    try {
      const {data} = await axios.put(`/api/cart/increment`, itemToAdd)
      dispatch(incrementItem(data))
      dispatch(viewCart())
    } catch (error) {
      next(error)
    }
  }
}

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

    case ADD_TO_CART:
      return state

    case INCREMENT_ITEM: {
      let newIncrementItem = state.find(item => item.id === action.itemId)
      newIncrementItem.quantity = newIncrementItem.quantity + 1
      return [...state]
    }

    case REMOVE_ITEM: {
      const newCart = state.filter(item => item.id !== action.itemId)
      return [...newCart]
    }
    default:
      return state
  }
}
