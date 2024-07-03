import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './navbar.css';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else if (storedUser) {
      axios.post('http://localhost:5000/Logout', { email: storedUser.email })
        .then(() => {
          localStorage.removeItem('user');
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand as={Link} to="/" className='clr'>VijayiBhav Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            <Nav.Link as={Link} to="/" className={`clr ${currentPath === '/' ? 'active' : ''}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/resources" className={`clr ${currentPath === '/resources' ? 'active' : ''}`}>Resources</Nav.Link>
            <Nav.Link as={Link} to="/languages" className={`clr ${currentPath === '/languages' ? 'active' : ''}`}>Languages</Nav.Link>
            <Nav.Link as={Link} to="/about" className={`clr ${currentPath === '/about' ? 'active' : ''}`}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`clr ${currentPath === '/contact' ? 'active' : ''}`}>Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/link" className={`clr ${currentPath === '/link' ? 'active' : ''}`}>Link</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated || storedUser ? (
              <NavDropdown title={`Hello, ${isAuthenticated ? user.name : storedUser.name}!`} id="basic-nav-dropdown" className='clr drop'>
                <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="basic-nav-dropdown" className='clr drop'>
                <NavDropdown.Item as={Link} to="/login" className={`${currentPath === '/login' ? 'active' : ''}`}>Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register" className={`${currentPath === '/register' ? 'active' : ''}`}>Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
