import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { changePrivacy } from './api/auth'
import messages from './components/AutoDismissAlert/messages'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import UserImages from './components/Home/UserImages'
import Gallery from './components/Home/Gallery'

import PictureIndex from './routes/PictureIndex'
import PictureShow from './routes/PictureShow'
import PictureUpload from './routes/PictureUpload'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      privacy: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  handlePrivacyChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    changePrivacy(this.state.user, value)
      .then(response => this.setState(
        prevState => {
          const user = { ...prevState.user }
          user.privacy = response.data.user.privacy
          return { user }
        }))
      .then(() => this.msgAlert({
        heading: 'Change Password Success',
        message: messages.privacyChangeSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.privacyChangeFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/gallery' render={() => (
            <Gallery msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/' render={() => (
            <Gallery msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/settings' handlePrivacyChange={this.handlePrivacyChange} render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} handlePrivacyChange={this.handlePrivacyChange}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/pictures' render={() => (
            <PictureIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/pictures/:id' render={() => (
            <PictureShow msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/picture-upload' render={() => (
            <PictureUpload msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/home' render={() => (
            <UserImages msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
