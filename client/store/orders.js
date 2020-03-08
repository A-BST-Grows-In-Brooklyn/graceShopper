import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

const GET_COMPLETED_ORDERS = 'GET_COMPLETED_ORDERS'

const GET_LINE_ITEMS_BY_ORDER = 'GET_LINE_ITEMS_BY_ORDER'

export const getOrder = order => ({type: GET_ORDER, order})

export const getCompletedOrders = orders => ({
  type: GET_COMPLETED_ORDERS,
  orders
})

export const getLineItemsByOrder = lineItems => ({
  type: GET_LINE_ITEMS_BY_ORDER,
  lineItems
})

export const fetchOrder = () => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get('/api/order')
      console.log('THIS IS THE DATA:', data)
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

export const completeOrders = id => {
  return async (dispatch, next) => {
    try {
      console.log()
      await axios.put(`/api/order/completeOrder/${id}`, null)
    } catch (error) {
      console.error(error)
    }
  }
}

let initialState = {
  order: {},
  completedOrders: [],
  lineItems: []
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
    default:
      return state
  }
}
