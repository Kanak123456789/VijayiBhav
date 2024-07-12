import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactsTable.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

function Admin() {
  document.body.style.overflowX = "hidden";

    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/contact/contacts')
        .then((response) => response.json())
        .then((data) => setContacts(data))
        .catch((error) => console.error('Error fetching contact data:', error));
    }, []);

  const [showCarousel, setShowCarousel] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showResource, setShowResource] = useState(false);
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleShowCarousel = () => setShowCarousel(true);
  const handleCloseCarousel = () => setShowCarousel(false);

  const handleShowLanguage = () => setShowLanguage(true);
  const handleCloseLanguage = () => setShowLanguage(false);

  const handleShowResource = () => setShowResource(true);
  const handleCloseResource = () => setShowResource(false);

  const handleSubmitCarousel = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('label', label);
    formData.append('text', text);
    formData.append('image', image);

    axios.post('http://localhost:5000/crousel/add-carousel-item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Carousel item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Carousel item added successfully' });
      handleCloseCarousel();
    })
    .catch((error) => {
      console.error('Error adding carousel item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add carousel item' });
    });
  };

  const handleSubmitLanguage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', label);
    formData.append('description', text);
    formData.append('image', image);

    axios.post('http://localhost:5000/lang/add-lang-item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Language item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Language item added successfully' });
      handleCloseLanguage();
    })
    .catch((error) => {
      console.error('Error adding language item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add language item' });
    });
  };

  const handleSubmitResource = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', label);
    formData.append('description', text);
    formData.append('link', link);
    formData.append('image', image);

    axios.post('http://localhost:5000/resourses/add-resourses-item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Resource item added:', response.data);
      setAlertMessage({ type: 'success', text: 'Resource item added successfully' });
      handleCloseResource();
    })
    .catch((error) => {
      console.error('Error adding resource item:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to add resource item' });
    });
  };

  return (
    <div>
      <br /><br />
      <h2>Admin Panel</h2>
      <div className="row">
        <MDBCard style={{ width: "20%", margin: "5%", marginTop: "5%", marginLeft: "10%", backgroundColor: "lightgrey" }}>
          <MDBCardBody>
            <MDBCardTitle>Manage Carousel</MDBCardTitle>
            <MDBCardText>
              Add new items to the carousel by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowCarousel}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "20%", margin: "5%", marginTop: "5%", backgroundColor: "lightgrey" }}>
          <MDBCardBody>
            <MDBCardTitle>Manage Language</MDBCardTitle>
            <MDBCardText>
              Add new items to the languages by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowLanguage}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "20%", margin: "5%", marginTop: "5%", backgroundColor: "lightgrey" }}>
          <MDBCardBody>
            <MDBCardTitle>Manage Resources</MDBCardTitle>
            <MDBCardText>
              Add new items to the resources by clicking the button below.
            </MDBCardText>
            <MDBBtn onClick={handleShowResource}>Add Item</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>

      {alertMessage && (
        <div className={`alert alert-${alertMessage.type}`} role="alert">
          {alertMessage.text}
        </div>
      )}

      <Modal show={showCarousel} onHide={handleCloseCarousel} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Carousel Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitCarousel}>
            <Form.Group controlId="formLabel">
              <h5><Form.Label style={{ color: "black" }}>Label</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formText" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Text</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (1480*400)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Carousel Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showLanguage} onHide={handleCloseLanguage} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Language Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitLanguage}>
            <Form.Group controlId="formTitle">
              <h5><Form.Label style={{ color: "black" }}>Title</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Description</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (1300*250)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Language Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showResource} onHide={handleCloseResource} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "26%" }}>Add Resource Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitResource}>
            <Form.Group controlId="formTitle">
              <h5><Form.Label style={{ color: "black" }}>Title</Form.Label></h5>
              <Form.Control
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Description</Form.Label></h5>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLink" className="mt-3">
              <h5 style={{ color: "black" }}><Form.Label style={{ color: "black" }}>Link of PDF</Form.Label></h5>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <h5><Form.Label style={{ color: "black" }}>Image (x*250)</Form.Label></h5>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={{ marginLeft: "30%" }}>
              Add Resource Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


     <h2>Students Data </h2>

     <div className="contacts-table-container">
      <table className="contacts-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="contacts-table-row">
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.contactNumber}</td>
              <td>{contact.selectedLanguage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Admin;
