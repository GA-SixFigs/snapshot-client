import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
//  impoort out axios request to get all mocies
import { pictureIndex } from '../api/Pictures'
class PictureIndex extends Component {
  constructor (props) {
    super(props)
    //  keep track of the movies in state initially we dont have movies
    this.state = {
      pictures: null
    }
  }
  //  once the component is created and inserted into the dom
  componentDidMount () {
    // destructure our props
    const { msgAlert, user } = this.props

    // fetch all of our movies
    pictureIndex(user)
      .then(res => this.setState({ pictures: res.data.pictures }))
      .then(() => msgAlert({
        heading: 'Loaded Pictures Successfully',
        message: 'Viewing all Pictures. Click on one to see its page',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed Loading Pictures ',
          message: 'Could not load pictures with error' + error.messge,
          variant: 'danger'
        })
      })
  }
  render () {
    const { pictures } = this.state
    //  if we dont have any movies yet show that we are loading them
    if (!pictures) {
      return (
        <Spinner animation="grow" varient='primary'/>
      )
    }
    const picturesJSX = pictures.map(picture => (
      <Link to={`/pictures/${picture._id}`} key={picture._id}>
        <li>
          <img src={picture.url}/>
        </li>
      </Link>
    ))

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Picture Gallery</h3>
          <ul>
            {picturesJSX}
          </ul>
        </div>
      </div>
    )
  }
}

export default PictureIndex
