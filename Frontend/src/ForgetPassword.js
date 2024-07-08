import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertColor, setAlertColor] = useState('danger'); // Default color is danger
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/forgetpassword', { email, password })
      .then(result => {
        if (result.data.status === "Success") {
          setAlertMessage('Password reset successfully');
          setAlertColor('success');
          navigate('/login');
        } else if (result.data.status === 'Error in mail') {
          setAlertMessage('Your Entered Mail is Not Registered! Please Register It First');
        } else {
          setAlertMessage('Error: ' + result.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.status === 'Error in mail') {
          setAlertMessage('Your Entered Mail is Not Registered! Please Register It First');
        } else {
          setAlertMessage('Server error. Please try again later.');
        }
      });
  };
  document.body.style.overflowX = 'hidden';

  return (
    <MDBContainer fluid style={{ marginTop: "5%", borderRadius: '25px', overflow:"hidden"}} className='text-black m-5'>
      {alertMessage && (
        <div className={`alert alert-${alertColor}`} role="alert">
          {alertMessage}
        </div>
      )}
      <MDBRow>
       
        <MDBCol md='5'>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md='12' style={{ marginTop: "20%" }}>
                <h3>
                 Enter Details:-
                </h3><br />
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='New Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Confirm Password' id='formControlLg' type='password' size="lg" onChange={(e) => setConfirmPassword(e.target.value)} required />
                <div className='text-center text-md-middle mt-4 pt-10' >
                  <MDBBtn type="submit" className="mb-0 px-5 login">Reset Password</MDBBtn>
                  <p className="small  fw-bold mt-2 pt-1 mb-2" style={{marginRight:"6%"}}>
                  Remember Password? <Link to="/login" className="link-danger">Login</Link>
                </p>
                </div>
               
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCol>
        <MDBCol md='6' className="d-flex justify-content-center align-items-center">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

export default ForgetPassword;
