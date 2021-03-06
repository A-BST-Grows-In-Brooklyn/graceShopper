import React from 'react'
import {connect} from 'react-redux'
import {me, updateInfo} from '../store'
import {updateOrderAddress} from '../store'

class UserForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      country: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.me()
    let user = this.props.user
    this.setState({
      name: user.name,
      streetAddress: user.address[0],
      city: user.address[1],
      state: user.address[2],
      country: user.address[3]
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUpdate(event) {
    event.preventDefault()
    this.props.checkout
      ? this.props.updateOrderAddress([
          this.state.streetAddress,
          this.state.city,
          this.state.state,
          this.state.country
        ])
      : this.props.updateInfo(this.props.user.id, this.state)
  }

  render() {
    return (
      <form id="user-form" onSubmit={this.handleUpdate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Field Required"
          />
          <label htmlFor="streetAddress">Street Address</label>
          <input
            name="streetAddress"
            type="text"
            value={this.state.streetAddress}
            onChange={this.handleChange}
            placeholder="Field Required"
          />
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            value={this.state.city}
            onChange={this.handleChange}
            placeholder="Field Required"
          />
          <label htmlFor="state">State</label>
          <input
            name="state"
            type="text"
            value={this.state.state}
            onChange={this.handleChange}
            placeholder="Field Required"
          />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            value={this.state.country}
            onChange={this.handleChange}
            placeholder="Field Required"
          />
        </div>
        {
          <button type="submit" onClick={this.handleSubmit}>
            {' '}
            Update
          </button>
        }
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  updateInfo: (id, updatedInfo) => dispatch(updateInfo(id, updatedInfo)),
  updateOrderAddress: address => dispatch(updateOrderAddress(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
