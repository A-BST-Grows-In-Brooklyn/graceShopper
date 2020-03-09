import axios from 'axios'
import {
  setGuestCart,
  getGuestCart,
  addToGuestCart,
  removeFromGuestCart,
  clearGuestCart
} from './localStorage'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DECREMENT_ITEM = 'DECREMENT ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const getCart = cart => ({type: GET_CART, cart})

export const addItem = item => ({type: ADD_TO_CART, item})

export const decrementItem = item => ({type: DECREMENT_ITEM, item})

export const removeItem = itemId => ({type: REMOVE_ITEM, itemId})

export const viewCart = () => {
  return async (dispatch, next) => {
    try {
      getGuestCart()
      console.log(localStorage)
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
    addToGuestCart(itemToAdd)
    console.log(localStorage)
    try {
      const {data} = await axios.put(`/api/cart/add`, itemToAdd)
      dispatch(addItem(data))
    } catch (error) {
      next(error)
    }
  }
}

export const decrementCart = (itemId, quantity) => {
  return async (dispatch, next) => {
    const itemToRemove = {itemId: itemId, quantity: quantity}
    try {
      const {data} = await axios.put(`/api/cart/remove`, itemToRemove)
      dispatch(decrementItem(data))
    } catch (error) {
      next(error)
    }
  }
}

export const removeFromCart = itemId => {
  return async (dispatch, next) => {
    try {
      await axios.delete(`/api/cart/${itemId}`)
      dispatch(removeItem(itemId))
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

    case DECREMENT_ITEM:
      return state

    case REMOVE_ITEM: {
      const newCart = state.filter(item => item.slimeId !== action.itemId)
      return [...newCart]
    }
    default:
      return state
  }
}
