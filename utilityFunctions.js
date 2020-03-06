const findById = (array, idIdentifier, id) => {
  let newArray = array.filter(elem => {
    if (elem[idIdentifier] === id) {
      return elem
    }
  })
  return newArray[0]
}

const calculateTotalPrice = items => {
  let newPrice = items.reduce((accumulator, elem) => {
    return (accumulator += elem.totalPrice)
  }, 0)
  return newPrice
}

const calculateTotalQuantity = items => {
  let newPrice = items.reduce((accumulator, elem) => {
    return (accumulator += elem.quantity)
  }, 0)
  return newPrice
}

module.exports = {findById, calculateTotalPrice, calculateTotalQuantity}
