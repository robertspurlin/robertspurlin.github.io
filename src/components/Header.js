import React from 'react';

import "../scss/components/header.scss";
import {
  Navbar,
  Nav,
  Container
} from 'react-bootstrap';

import NavLink from 'components/NavLink';

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className='py-0'>
        <Container fluid>
          <NavLink to="/">Robert Spurlin</NavLink>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;