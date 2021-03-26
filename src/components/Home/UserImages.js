import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'
import { userPictureShow } from '../../api/Pictures'
import Image from 'react-bootstrap/Image'

const UserImages = ({ user, msgAlert }) => {
  const [pictures, setPictures] = useState(null)

  useEffect(() => {
    userPictureShow(user)
      .then(response => setPictures(response.data.pictures))
  }, [])

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h4>My Pictures</h4>
        {pictures && pictures.map(picture => {
          return (
            <Image src={picture.url} key={picture._id}thumbnail/>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(UserImages)
