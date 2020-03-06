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
      item => item.itemId === itemToAdd.itemId
    )
    if (alreadyInCart === -1) {
      serializedCart.push(itemToAdd)
    } else {
      serializedCart[alreadyInCart].quantity += 1
    }
    setGuestCart(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

export const decrementGuestCartItem = itemId => {
  try {
    const serializedCart = getGuestCart()
    const itemToDecrement = serializedCart.findIndex(
      item => item.itemId === itemId
    )
    serializedCart[itemToDecrement].quantity -= 1
    setGuestCart(serializedCart)
    getGuestCart()
  } catch (error) {
    console.error(error)
  }
}

export const removeFromGuestCart = itemId => {
  try {
    const serializedCart = getGuestCart()
    const itemToRemove = serializedCart.findIndex(
      item => item.itemId === itemId
    )
    serializedCart.splice(itemToRemove, 1)
    setGuestCart(serializedCart)
    getGuestCart()
  } catch (error) {
    console.error(error)
  }
}

export const clearGuestCart = () => {
  localStorage.clear()
}
