import React from 'react'
import {connect} from 'react-redux'
import {fetchSlimes} from '../store'
import {Slime} from './Slime'
import Grid from '@material-ui/core/Grid'

class AllSlimes extends React.Component {
  componentDidMount() {
    this.props.fetchSlimes()
  }

  render() {
    const slimes = this.props.slimes

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {slimes.map(slime => <Slime key={slime.id} slime={slime} />)}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    slimes: state.slime.slimes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSlimes: () => dispatch(fetchSlimes())
  }
}

const connectedToAllSlimes = connect(mapStateToProps, mapDispatchToProps)(
  AllSlimes
)
export default connectedToAllSlimes
