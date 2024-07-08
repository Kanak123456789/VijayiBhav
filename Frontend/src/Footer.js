import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "./styles.css";
function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: '#6f3226'   }} className='text-center text-lg-start   foot'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://facebook.com' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://twitter.com' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://google.com' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='https://instagram.com' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://linkedin.com' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
           
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
                <img src='./img/logo.png' alt="Company Logo" className="me-3" style={{ height: '100px' }} />
                 
              </h6>
              <p>
              "Empowering Global Communication through Language Learning: Expand Horizons, Connect Cultures, and Achieve Fluency."
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Quick Navigation</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Resources
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Languages
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Contact  Us
                </a>
              </p>
            </MDBCol>

             

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:

        <a className='text-reset fw-bold' href='http://Linguavid.org'>
        Linguavid.org

        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
