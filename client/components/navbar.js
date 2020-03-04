import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {AppBar, Toolbar, Button, IconButton, TextField} from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone'

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar>
    <Toolbar>
      <div id="header">
        <div id="home">
          <IconButton component={Link} to="/">
            <img
              id="slimeIcon"
              src="https://vignette.wikia.nocookie.net/slimerancher/images/c/c9/Pink_Slime_SecretStyle_SP.png/revision/latest?cb=20190619001120"
            />
          </IconButton>
        </div>
        <Button component={Link} to="/slimes">
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
            {/* <IconButton component={Link} to="/">
              <HomeRoundedIcon />
            </IconButton> */}
            <Button onClick={handleClick}>Logout</Button>
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
        <IconButton component={Link} to="/cart">
          <ShoppingBasketTwoToneIcon fontSize="large" />
        </IconButton>
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
