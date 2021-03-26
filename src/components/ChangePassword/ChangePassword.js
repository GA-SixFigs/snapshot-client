import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: '',
      privacy: this.props.user.privacy
    }
  }

  componentDidMount () {
    console.log(this.state.privacy)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onHandlePrivacyChange = (event) => {
    const { msgAlert } = this.props
    this.props.handlePrivacyChange(event)
    this.setState(prevState => {
      return {
        privacy: !prevState.privacy
      }
    })
    msgAlert({
      heading: 'Privacy Change Completed',
      message: messages.privacyChangeSuccess,
      variant: 'success'
    })
  }

  onChangePassword = event => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    console.log(user, 'my user')
    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>User Privacy</h3>
          <Form>
            <Form.Group controlId="privacy">
              <Form.Label>Privacy Settings: User Profile is <b>{this.state.privacy ? 'Private' : 'Public'}</b></Form.Label>
              <Form.Control
                name="privacy"
                type="checkbox"
                class="checkbox"
                checked={this.props.user.privacy}
                onChange={this.onHandlePrivacyChange}
              />
            </Form.Group>
          </Form>
          <hr />
          <h3>Change Password</h3>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                required
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="Old Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                required
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
