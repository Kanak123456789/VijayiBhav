import React, { useState, useContext  } from 'react';
import { MDBContainer, MDBCardImage, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { UserContext } from './UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true })
      .then(result => {
        if (result.data.status === "Success") {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          setUser(result.data.user);  // Set the user context
          navigate('../home');
        } else if (result.data.status === "The Password is Incorrect") {
          alert("Your Password Is Incorrect, Please Try Again");
        } else if (result.data.status === "No Record Exist") {
          alert("Your Mail is Not Registered! Please Register First");
          setTimeout(() => navigate('../register'), 2000);
        } else {
          console.error('Unexpected response:', result.data);
        }
      })
      .catch(err => console.log(err));
  };


  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
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
              <Link to="/forgetpassword">Forgot password?</Link>
            </div>
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn type="submit" className="mb-0 px-5 login">Login</MDBBtn>
              <MDBBtn type="button" className="google-login-btn" onClick={handleGoogleLogin}>
                <img src="/img/google.webp" alt="Google logo" className="google-logo" />
                Continue With Google
              </MDBBtn>
              <br /> <br />
              <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/Register" className="link-danger">Register</Link></p>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Login;
