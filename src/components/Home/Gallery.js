import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
//  impoort out axios request to get all mocies
import { galleryNoUser } from '../../api/Pictures'
class Gallery extends Component {
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
    const { msgAlert } = this.props

    // fetch all of our movies
    galleryNoUser()
      .then(res => this.setState({ pictures: res.data.pictures }))
      .then(() => msgAlert({
        heading: 'Welcome to SnapShot!',
        message: 'Viewing all Public Pictures. Sign in to add more!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed Loading Pictures ',
          message: 'Could not load pictures with error' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { pictures } = this.state
    if (!pictures) {
      return (
        <Spinner animation="grow" varient='primary'/>
      )
    }

    const picturesJSX = pictures.map(picture => {
      if (picture !== 'private') {
        return (
          <div key={picture._id}>
            <Card bg='secondary' className="cardStyle" key={picture.id} style={{ width: '18rem' }}>
              <Card.Img varient='top' className='img' src={picture.url} style={{ height: 200 }}/>
              <Card.Body className="card-body">
              </Card.Body>
            </Card>
          </div>
        )
      }
    })

    const cardContanierLayout = {
      display: ' flex',
      justifyContent: 'Center',
      flexFlow: 'row wrap',
      border: 'solid'
    }
    return (
      <div>
        <div className="centered">
          <h3>Welcome to SnapShot</h3>
          <h5>Sign in or Sign up to add Pictures</h5>
        </div>
        <div style={cardContanierLayout}>
          { picturesJSX }
        </div>
      </div>
    )
  }
}

export default Gallery
