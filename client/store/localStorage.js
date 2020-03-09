export const setGuestCart = (cartValue = []) => {
  try {
    const serializedCart = JSON.stringify(cartValue)
    localStorage.setItem('guestCart', serializedCart)
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
        slime: {
          id: itemToAdd.id,
          name: itemToAdd.name,
          color: itemToAdd.color,
          texture: itemToAdd.texture,
          price: itemToAdd.price,
          quantity: itemToAdd.quantity,
          imgURL: itemToAdd.imgURL
        }
      })
    } else {
      serializedCart[alreadyInCart].quantity += 1
    }
    setGuestCart(serializedCart)
  } catch (error) {
    console.error(error)
  }
}

// export const addToGuestOrder = () => {
//   try {
//     const serializedOrder = getGuestOrder()
//     {
//       id: 1,
//       userId: 101,
//       totalPrice: 105,
//       totalQuantity: 3,
//       completed: false,
//       address: "No address given"
//     }

//     setGuestOrder(serializedOrder)
//   } catch (error) {
//     console.error(error)
//   }
// }

export const decrementGuestCart = itemId => {
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
