import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';  

function Header() {
  // Get the current path from the URL
  const currentPath = window.location.pathname;

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand href="/" className='clr'>VijayiBhav Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            <Nav.Link 
              href="/" 
              className={`clr ${currentPath === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="/resources" 
              className={`clr ${currentPath === '/resources' ? 'active' : ''}`}
            >
              Resources
            </Nav.Link>
            <Nav.Link 
              href="/languages" 
              className={`clr ${currentPath === '/languages' ? 'active' : ''}`}
            >
              Languages
            </Nav.Link>
            <Nav.Link 
              href="/about" 
              className={`clr ${currentPath === '/about' ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              href="/contact" 
              className={`clr ${currentPath === '/contact' ? 'active' : ''}`}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link 
              href="/link" 
              className={`clr ${currentPath === '/link' ? 'active' : ''}`}
            >
              Link
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className='clr drop'>
              <NavDropdown.Item 
                href="/action" 
                className={`${currentPath === '/action' ? 'active' : ''}`}
              >
               Login
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="/anotherAction" 
                className={`${currentPath === '/anotherAction' ? 'active' : ''}`}
              >
               Register
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                href="/something" 
                className={`${currentPath === '/something' ? 'active' : ''}`}
              >
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
