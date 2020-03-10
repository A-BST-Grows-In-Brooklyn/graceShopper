import React from 'react'

const LineItem = props => {
  return (
    <div>
      <div key={props.lineItem.id} />
      Slime: {props.lineItem.slime.name}
      Quantity: {props.lineItem.quantity}
    </div>
  )
}

export default LineItem
