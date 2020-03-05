import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  Cart,
  connectedToAllSlimes,
  connectedToSingleSlime
} from './components'
import Confirmation from './components/confirmation'
import Checkout from './components/checkout'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    let loggedInUserAccess = isLoggedIn ? (
      <Route path="/home" component={UserHome} />
    ) : (
      <Redirect to="/login" />
    )

    return (
      <Switch>
        <Route exact path="/slimes" component={connectedToAllSlimes} />
        <Route path="/slimes/:id" component={connectedToSingleSlime} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/" component={Home} />
        {loggedInUserAccess}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
