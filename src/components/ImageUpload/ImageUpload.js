import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'
import { pictureCreate } from '../../api/Pictures'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'

const ImageUpload = ({ user, msgAlert }) => {
  // const [title, setTitle] = useState('')
  // const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  // const handleTitleChange = event => {
  //   setTitle(event.target.value)
  // }
  //
  // const handleCaptionChange = event => {
  //   setCaption(event.target.value)
  // }

  const handleImageSubmit = event => {
    event.preventDefault()
    const data = new FormData()
    data.append('picture', image)
    console.log(image, 'my event from handling the submission')
    // console.log(messages)
    pictureCreate(data)
  }

  const handleImageAdd = event => {
    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Upload Image</h3>
        <Form onSubmit={handleImageSubmit}>
          <Form.Group controlId="image">
            <FormFile
              id="upload-file-input"
              label="Upload File Here"
              onChange={handleImageAdd}
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

export default withRouter(ImageUpload)

// <Form.Group controlId="caption">
//   <Form.Label>Caption</Form.Label>
//   <Form.Control
//     required
//     type="text"
//     name="caption"
//     value={caption}
//     placeholder="Enter Caption"
//     onChange={handleCaptionChange}
//   />
// </Form.Group>
// <Form.Group controlId="title">
//   <Form.Label>title</Form.Label>
//   <Form.Control
//     required
//     name="text"
//     value={title}
//     type="title"
//     placeholder="Title"
//     onChange={handleTitleChange}
//   />
// </Form.Group>
