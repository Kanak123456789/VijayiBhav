import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Languages() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/lang/lang-items')
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  const lang = {    
    paddingTop: '30px',
    paddingBottom: '30px',
  }; 

  const l1 = {
    fontSize: '60px',
  };

  return (
    <>
      <div style={lang}>
        <h3 style={l1}>Languages</h3>
        <h4>"The limits of my language are the limits of my world."</h4>
      </div>
      <Accordion className="mala">
        {languages.map((language, index) => (
          <Accordion.Item eventKey={index.toString()} key={language._id}>
            <Accordion.Header>{language.title}</Accordion.Header>
            <Accordion.Body className="sansk">
              <Image style={{ height: '250px', width: '400px' }} className="sans" src={language.image} />
              <p className="sans1">{language.description}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <br /><br />
    </>
  );
}

export default Languages;
