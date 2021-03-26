import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
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
    // const picturesJSX = pictures.map(picture => (
    //   <Link to={`/pictures/${picture._id}`} key={picture._id}>
    //     <Container flex>
    //       <Card bg="secondary" text="" style={{ width: '18rem' }}>
    //         <Card.Img variant="top" src={picture.url}/>
    //         <Card.Body>
    //           <Card.Title>{picture.tag}</Card.Title>
    //           <Card.Text>
    //           </Card.Text>
    //           <Button variant="primary" >View Photo</Button>
    //         </Card.Body>
    //       </Card>
    //     </Container>
    //   </Link>
    // ))
    const picturesJSX = pictures.map(picture => (
      <Link to={`/pictures/${picture._id}`} key={picture._id}>
        <Card key={picture.id} style={{ width: '18rem' }}>
          <Card.Img varient='top' src={picture.url} />
          <Card.Body>
            <Card.Title>{picture.title}</Card.Title>
            <Card.Text>{picture.caption}</Card.Text>
            <Button variant="primary" >View Photo</Button>
          </Card.Body>
        </Card>
      </Link>
    ))
    const cardContanierLayout = {
      display: ' flex',
      justifyContent: 'Center',
      flexFlow: 'row wrap'
    }
    // return (
    //   <div className="row">
    //     <div className="col-sm-10 col-md-8 mx-auto mt-5">
    //       <h3>Picture Gallery</h3>
    //       <ul>
    //         {picturesJSX}
    //       </ul>
    //     </div>
    //   </div>
    // )
    return (
      <div>
        <h3>Picture Gallery</h3>
        <div style={cardContanierLayout}>
          { picturesJSX }
        </div>
      </div>
    )
  }
}

export default PictureIndex
