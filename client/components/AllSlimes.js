import React from 'react'
import {connect} from 'react-redux'
import {fetchSlimes} from '../store'
import {Slime} from './Slime'

class AllSlimes extends React.Component {
  componentDidMount() {
    console.log('INSIDE OF COMPONENT DID MOUNT')
    this.props.fetchSlimes()
  }

  render() {
    const slimes = this.props.slimes

    return (
      <div>
        <h1>See All Slimes</h1>
        {slimes.map(slime => <Slime key={slime.id} slime={slime} />)}
      </div>
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
