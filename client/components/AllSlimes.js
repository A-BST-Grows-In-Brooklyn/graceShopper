import React from 'react'
import {connect} from 'react-redux'
import {fetchSlimes} from '../store'

class AllSimes extends React.Component {
  componentDidMount() {
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
    slimes: state.slimes.slimes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSlimes: () => dispatch(fetchSlimes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSlimes)
