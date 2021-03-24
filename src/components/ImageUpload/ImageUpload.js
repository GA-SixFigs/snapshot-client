import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'
import { pictureCreate } from '../../api/Pictures'

import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'

const ImageUpload = ({ user, msgAlert }) => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  const handleCaptionChange = event => {
    setCaption(event.target.value)
  }

  const handleImageSubmit = event => {
    event.preventDefault()
    const data = new FormData()
    data.append('picture', image)
    pictureCreate(user, data)
      .then(response => console.log(response, 'from the api after pic'))
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
          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              required
              type="text"
              name="caption"
              value={caption}
              placeholder="Enter Caption"
              onChange={handleCaptionChange}
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
