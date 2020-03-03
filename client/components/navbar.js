import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {AppBar, Toolbar, Button, TextField} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar>
    <Toolbar>
      <div id="header">
        <div id="home">
          <img
            id="slimeIcon"
            src="https://vignette.wikia.nocookie.net/slimerancher/images/c/c9/Pink_Slime_SecretStyle_SP.png/revision/latest?cb=20190619001120"
          />
          <Button component={Link} to="/">
            Home
          </Button>
        </div>
        <Button component={Link} to="/">
          Products
        </Button>
        <TextField
          id="outlined-search"
          label="search products"
          type="search"
          variant="outlined"
        />
        {isLoggedIn ? (
          <div id="login">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="login">
            {/* The navbar will show these links before you log in */}
            <Button component={Link} to="/login">
              Login
            </Button>

            <Button component={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </Toolbar>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
