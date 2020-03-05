import React from 'react'
import {Link} from 'react-router-dom'

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
