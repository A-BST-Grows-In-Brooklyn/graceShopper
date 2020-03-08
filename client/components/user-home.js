import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import UserForm from './userform'
import OrderHistory from './OrderHistory'

export const UserHome = props => {
  const {user} = props

  if (!user.id) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <h2>Your Account Information</h2>
      <h3>Primary Shipping Address</h3>
      <UserForm edit={true} />
      <h3>Primary Payment Information</h3>
      <h3>Email & Password</h3>
      <h2>Your Order History</h2>
      <OrderHistory />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
