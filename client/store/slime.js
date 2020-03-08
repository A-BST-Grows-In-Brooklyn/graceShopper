import axios from 'axios'

//ACTION TYPES

const GET_SLIMES = 'GET_SLIMES'
const GET_SLIME = 'GET_SLIME'

//ACTION CREATORS

const getSlimes = slimes => ({
  type: GET_SLIMES,
  slimes
})

const getSlime = slime => ({
  type: GET_SLIME,
  slime
})

//THUNK CREATORS

export const fetchSlimes = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/slimes')
      dispatch(getSlimes(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSelectedSlime = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/slimes/${id}`)
      dispatch(getSlime(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE

const initialState = {
  slimes: [],
  selectedSlime: {}
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SLIMES:
      return {...state, slimes: action.slimes}
    case GET_SLIME:
      return {...state, selectedSlime: action.slime}
    default:
      return state
  }
}
