import React from 'react'
import {Link} from 'react-router-dom'

import {Grid, Paper} from '@material-ui/core'
import setDecimals from '../helperFuncs'

export const Slime = props => {
  const slime = props.slime

  return (
    <Grid key={slime.id} item>
      <Paper>
        <Link to={`/slimes/${slime.id}`}>
          <img src={slime.imgURL} alt="Slime Photo" width="200" height="200" />
          {slime.name}
          {setDecimals(slime.price)}
        </Link>
      </Paper>
    </Grid>
  )
}
