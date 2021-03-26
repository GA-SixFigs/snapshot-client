import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import snapshotLogo from '../../../public/snapshotLogo.jpg'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#pictures">Gallery</Nav.Link>
    <Nav.Link href="#picture-upload">Image Upload</Nav.Link>
    <Nav.Link href="#settings">User Settings</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#home">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#home">
      SnapShot
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
      <img src="snapshotLogo.jpg" style={{ height: '100px', width: '100px' }}/>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
