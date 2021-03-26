import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

const GET_COMPLETED_ORDERS = 'GET_COMPLETED_ORDERS'

const GET_LINE_ITEMS_BY_ORDER = 'GET_LINE_ITEMS_BY_ORDER'

const UPDATE_ADDRESS = 'UPDATE_ADDRESS'

const GET_SLIME_LINE_ITEMS = 'GET_SLIME_LINE_ITEMS'

const CLEAR_CART = 'CLEAR_CART'

export const getOrder = order => ({type: GET_ORDER, order})

export const getCompletedOrders = orders => ({
  type: GET_COMPLETED_ORDERS,
  orders
})

export const getLineItemsByOrder = lineItems => ({
  type: GET_LINE_ITEMS_BY_ORDER,
  lineItems
})

export const updateAddress = address => ({
  type: UPDATE_ADDRESS,
  address
})

export const getSlimeLineItems = slimes => ({
  type: GET_SLIME_LINE_ITEMS,
  slimes
})

export const clearCompletedCart = cart => ({
  type: CLEAR_CART,
  cart
})

export const updateOrderAddress = address => {
  return dispatch => {
    try {
      dispatch(updateAddress(address))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOrder = () => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get('/api/order')
      dispatch(getOrder(data[0]))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchCompletedOrders = () => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get('/api/order/completedOrders')
      dispatch(getCompletedOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchLineItemsByOrder = id => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get(`/api/order/lineItems/${id}`)
      dispatch(getLineItemsByOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const completeOrder = (id, address) => {
  return async (dispatch, next) => {
    try {
      await axios.put(`/api/order/completeOrder/${id}`, address)
      dispatch(clearCompletedCart({}))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSlimeLineItems = lineItemId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/order/slimeLineItems/${lineItemId}`)
      dispatch(getSlimeLineItems(data))
    } catch (error) {
      console.error(error)
    }
  }
}

let initialState = {
  order: {},
  completedOrders: [],
  lineItems: [],
  address: [],
  slimeLineItems: []
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {...state, order: action.order}
    case GET_COMPLETED_ORDERS:
      return {...state, completedOrders: action.orders}
    case GET_LINE_ITEMS_BY_ORDER:
      return {...state, lineItems: action.lineItems}
    case UPDATE_ADDRESS:
      return {...state, address: action.address}
    case GET_SLIME_LINE_ITEMS:
      return {...state, slimeLineItems: action.slimes}
    case CLEAR_CART:
      return {...state, order: action.cart}
    default:
      return state
  }
}
