import React from 'react'
import {addGuestAddress} from '../store/localStorage'

export default class GuestForm extends React.Component {
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

  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUpdate(event) {
    event.preventDefault()
    addGuestAddress(this.state)
  }

  render() {
    return (
      <form id="user-form">
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
          <button type="submit" onClick={this.handleUpdate}>
            Update
          </button>
        }
      </form>
    )
  }
}
