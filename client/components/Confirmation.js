import React from 'react'

export const Confirmation = props => {
  const order = props.order

  return (
    <div key={order.id}>
      <h2>Thank you for your order!</h2>
      <h1>Your confirmation number is {order.id}.</h1>
      <h2>We hope you enjoy your slime!</h2>
    </div>
  )
}

// we don't need to pass through order as props but I thought it might look nice
// to give a confirmation number
