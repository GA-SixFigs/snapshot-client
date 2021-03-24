
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { pictureShow, pictureDelete } from './../api/Pictures'

// 2. Class
class ShowPicture extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // initially we have no data, no book (null)
      picture: null,

      // Delete boolean to manage if we've deleted this book
      deleted: false
    }

    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deleteBook = this.deleteBook.bind(this)
  }

  // When this component mounts, make a GET
  // request using the ID param in the front-end route URL
  // and set the state to trigger a re-render
  componentDidMount () {
    const { msgAlert, user, match } = this.props

    console.log(this.props)
    pictureShow(user, match.params.id)
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

  render () {
    // create a local variable `book` and set it's value
    // to the value of the `book` key on `this.state`
    const { picture, deleted } = this.state
    // 2 scenarios: loading, book to show

    let pictureJsx = ''

    if (deleted) {
      // if deleted is true, we can redirect
      return <Redirect to="/pictures"/>
    } else if (!picture) {
      // loading, no book yet
      pictureJsx = <p>Loading...</p>
    } else {
      // we have a book! Display it
      pictureJsx = (
        <div>
          <h4>{picture.title}</h4>
          <button onClick={this.deletePicture}>Delete Me</button>
          {/*  // <button>
          //   <Link to={'/update-book/' + this.props.match.params.id}>Update Me</Link>
          // </button> */}
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
