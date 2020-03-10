import React from 'react'

const LineItem = props => {
  return (
    <div>
      <div key={props.lineItem.id} />
      Slime: {props.lineItem.slime.name}
    </div>
  )
}

export default LineItem
