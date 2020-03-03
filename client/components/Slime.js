import React from 'react'
import {Link} from 'react-router-dom'

export const Slime = props => {
  const slime = props.slime

  return (
    <div key={slime.id}>
      <Link to={`/slimes/${slime.id}`}>
        <img src={slime.imgUrl} alt="Slime Photo" width="200" height="200" />
        {slime.name}
        {slime.price}
      </Link>
    </div>
  )
}
