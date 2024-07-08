import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon  } from 'mdb-react-ui-kit';
import './dashboard.css';
 

function Dashboard() {
  const [user, setUser] = useState(null);
   

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      axios.get('http://localhost:5000/current_user', { withCredentials: true })
        .then(response => {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, []);

 

  return (
    <section className="vh" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage 
                    src={user && user.image ? user.image : '/img/userpic.jpg'}
                    alt="Avatar" className="my-5 uimg" style={{ width: '80px' }} fluid 
                  />
                  <MDBTypography tag="h5" style={{color:"white" , fontSize:"23px"}}>{user && user.name ? user.name : 'User'}</MDBTypography>
                  {/* <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" /> */}
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">User Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCol className="pt-1">
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user && user.email ? user.email : 'No Email'}</MDBCardText>
                      </MDBRow>
                      <MDBRow size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{user && user.phone ? user.phone : 'Not Available'}</MDBCardText>
                      </MDBRow>
                    </MDBCol>

                    <div className="d-flex justify-content-center">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                     
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Dashboard;
