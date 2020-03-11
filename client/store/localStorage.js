import {
  calculateTotalPrice,
  calculateTotalQuantity
} from '../../utilityFunctions'

import axios from 'axios'

export const setGuestCart = (cartValue = []) => {
  try {
    const serializedCart = JSON.stringify(cartValue)
    localStorage.setItem('guestCart', serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const getGuestCart = () => {
  try {
    if (localStorage.guestCart === undefined) {
      setGuestCart([])
    }
    const serializedCart = localStorage.getItem('guestCart')
    return JSON.parse(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const addToGuestCart = itemToAdd => {
  try {
    const serializedCart = getGuestCart()
    const alreadyInCart = serializedCart.findIndex(
      item => item.id === itemToAdd.id
    )
    if (alreadyInCart === -1) {
      serializedCart.push({
        id: itemToAdd.id,
        slimeId: itemToAdd.id,
        quantity: 1,
        totalPrice: Number(itemToAdd.price),
        slime: {
          id: itemToAdd.id,
          name: itemToAdd.name,
          color: itemToAdd.color,
          texture: itemToAdd.texture,
          price: Number(itemToAdd.price),
          quantity: itemToAdd.quantity,
          imgURL: itemToAdd.imgURL
        }
      })
    } else {
      serializedCart[alreadyInCart].quantity += 1
      serializedCart[alreadyInCart].totalPrice +=
        serializedCart[alreadyInCart].slime.price
    }
    setGuestCart(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const decrementGuestCart = itemId => {
  try {
    const serializedCart = getGuestCart()
    const itemToDecrement = serializedCart.findIndex(
      item => item.slimeId === itemId
    )
    if (serializedCart[itemToDecrement].quantity > 1) {
      serializedCart[itemToDecrement].quantity -= 1
      serializedCart[itemToDecrement].totalPrice -=
        serializedCart[itemToDecrement].slime.price
    } else {
      serializedCart[itemToDecrement].quantity = 1
      serializedCart[itemToDecrement].totalPrice =
        serializedCart[itemToDecrement].slime.price
    }
    setGuestCart(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const removeFromGuestCart = itemId => {
  try {
    const serializedCart = getGuestCart()
    const itemToRemove = serializedCart.findIndex(
      item => item.slimeId === itemId
    )
    serializedCart.splice(itemToRemove, 1)
    setGuestCart(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const setGuestOrder = (orderValue = {}) => {
  try {
    const serializedOrder = JSON.stringify(orderValue)
    localStorage.setItem('guestOrder', serializedOrder)
  } catch (error) {
    console.error(error)
  }
}

export const getGuestOrder = () => {
  try {
    if (localStorage.guestOrder === undefined) {
      setGuestOrder({})
    }
    const serializedOrder = localStorage.getItem('guestOrder')
    return JSON.parse(serializedOrder)
  } catch (error) {
    console.error(error)
  }
}

export const updateGuestOrder = () => {
  try {
    const updatedOrder = {
      userId: 0,
      totalPrice: calculateTotalPrice(getGuestCart()),
      totalQuantity: calculateTotalQuantity(getGuestCart()),
      completed: true
    }
    setGuestOrder(updatedOrder)
  } catch (error) {
    console.error(error)
  }
}

export const checkoutGuestOrder = async items => {
  try {
    await axios.put('api/order/guestOrder', items)
  } catch (error) {
    console.error(error)
  }
}

export const clearGuestCartAndOrder = () => {
  localStorage.clear()
}

export const guestCartCheck = callbackFunc => {
  let guestCart = getGuestCart()
  if (guestCart !== []) {
    guestCart.forEach(item => {
      callbackFunc(item.id, item.quantity)
    })
    clearGuestCartAndOrder()
  }
}
