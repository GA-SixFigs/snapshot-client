
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { pictureShow, pictureDelete, pictureUpdate } from './../api/Pictures'

// 2. Class
class ShowPicture extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // initially we have no data, no book (null)
      picture: null,

      // Delete boolean to manage if we've deleted this book
      deleted: false,

      updated: false
    }

    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deleteBook = this.deleteBook.bind(this)
  }

  // When this component mounts, make a GET
  // request using the ID param in the front-end route URL
  // and set the state to trigger a re-render
  componentDidMount () {
    const { msgAlert, match } = this.props

    console.log(this.props)
    pictureShow(match.params.id)
    //  set the createdMovieId to the _id of the movie we got in the response data
      .then(res => this.setState({ picture: res.data.picture }))

      .then(() => msgAlert({
        heading: 'Showing Picture Successfully',
        message: 'Showing Created Picture.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed Showing Picture',
          message: 'Could not create picture with error:' + error.messge,
          variant: 'danger'
        })
      })
  }
  //   movieDelete(user, match.params.id)
  // //
  deletePicture = () => {
    // axios.delete(apiUrl + '/books/' + this.props.match.params.id)
    const { msgAlert, user, match } = this.props

    console.log(this.props)
    pictureDelete(user, match.params.id)
    //  set the createdMovieId to the _id of the movie we got in the response data
      .then(res => this.setState({ deleted: true }))

      .then(() => msgAlert({
        heading: 'Showing Picture Successfully',
        message: 'Showing Created Picture.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed Showing picture',
          message: 'Could not create picture with error:' + error.messge,
          variant: 'danger'
        })
      })
  }

    updatePicture = () => {
      const { msgAlert, user, match } = this.prop
      console.log(this.props)
      pictureUpdate(user, match.params.id)
        .then(res => this.setState({ updated: true }))
        .then(() => msgAlert({
          heading: 'Updated Picture Successfully',
          message: 'Nice! You updated your Image!.',
          variant: 'success'
        }))
        .catch(error => {
          msgAlert({
            heading: 'Failed to Update Picture',
            message: 'Could not udate picture with error:' + error.messge,
            variant: 'danger'
          })
        })
    }

    render () {
      // create a local variable `book` and set it's value
      // to the value of the `book` key on `this.state`
      const { picture, deleted, updated } = this.state
      // 2 scenarios: loading, book to show

      let pictureJsx = ''

      if (deleted) {
        // if deleted is true, we can redirect
        return <Redirect to="/pictures"/>
      } else if (!picture) {
        pictureJsx = <p>Loading...</p>
      } else if (updated) {
        return <Redirect to="/pictures/:id"/>
      } else {
        pictureJsx = (
          <div>
            Uploaded by: {picture.ownerName}
            <br />
            <img src={picture.url} style={{ height: '250px', width: '250px' }}/>
            <br />
            <button onClick={this.deletePicture}>Delete Me</button>
            <br />
            <br />
            <form>
              <input type="text" name="caption" placeholder='New Caption Here'/>
              <br />
              <input type="text" name="tag" placeholder='New tags here'/>
            </form>
            <button onClick={this.updatePicture}>Update</button>
          </div>
        )
      }
      return (
        <Fragment>
          <h1>Just One Picture:</h1>
          {pictureJsx}
        </Fragment>
      )
    }
}

// 3. Exports
export default withRouter(ShowPicture)
