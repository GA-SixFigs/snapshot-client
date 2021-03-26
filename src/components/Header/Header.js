import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import snapshotLogo from '../../../public/snapshotLogo.jpg'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="link-text" href="#pictures">Gallery</Nav.Link>
    <Nav.Link className="link-text" href="#picture-upload">Image Upload</Nav.Link>
    <Nav.Link className="link-text" href="#settings">Settings</Nav.Link>
    <Nav.Link className="link-text" href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="link-text" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="link-text" href="#sign-in">Sign In</Nav.Link>
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
    </Navbar.Brand>
    <img src="logo-withoutbackground1.png" style={{ height: '125px', width: '160px' }}/>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
