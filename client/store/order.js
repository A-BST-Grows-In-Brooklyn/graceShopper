import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

export const getOrder = order => ({type: GET_ORDER, order})

export const viewOrder = () => {
  return async (dispatch, next) => {
    try {
      const {data} = await axios.get('/api/cart/order')
      dispatch(getOrder(data))
    } catch (error) {
      next(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
