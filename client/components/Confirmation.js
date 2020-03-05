import React from 'react'

const Confirmation = props => {
  // const order = props.order -- if we want to include an order.id

  return (
    <div>
      <h2>Thank you for your order!</h2>
      <h1>Your confirmation number is (insert order.id).</h1>
      <h2>We hope you enjoy your slime!</h2>
    </div>
  )
}

export default Confirmation
