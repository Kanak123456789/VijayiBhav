import React, { useState } from 'react';
import { MDBContainer, MDBCardImage, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/Login', { email, password })
      .then(result => {
        if (result.data.status === "Success") {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          navigate('../Home');
        } else if (result.data.status === "The Password is Incorrect") {
          alert("Your Password Is Incorrect, Please Try Again");
        } else if (result.data.status === "No Record Exist") {
          alert("Your Mail is Not Registered! Please Register First");
          setTimeout(() => navigate('../Register'), 2000); 
        } else {
          console.error('Unexpected response:', result.data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <MDBContainer fluid style={{ marginTop: "5%", borderRadius: '25px' }} className='text-black m-5'>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol col='10' md='5'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' fluid />
          </MDBCol>
          <MDBCol col='4' md='6' style={{ marginTop: "8%" }}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} required />
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' style={{ marginTop: "4%" }} size="lg" onChange={(e) => setPassword(e.target.value)} required />
            <div className="d-flex justify-content-between mb-4">
              <a href="!#">Forgot password?</a>
            </div>
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5">Login</MDBBtn>
              <br /> <br />
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/Register" className="link-danger">Register</Link></p>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
      {isAuthenticated ? (
        <MDBBtn className="mb-0 px-5" onClick={() => logout()}>LogOut</MDBBtn>
      ) : (
        <MDBBtn className="mb-0 px-5" onClick={() => loginWithRedirect()}>Login With Google</MDBBtn>
      )}
    </MDBContainer>
  );
}

export default Login;
