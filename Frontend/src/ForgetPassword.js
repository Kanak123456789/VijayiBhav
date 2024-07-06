import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/forgetpassword', { email })
      .then(result => {
        if (result.data.status === "Success") {
          alert('Password reset link has been sent to your email');
          navigate('/login');
        } else {
          alert('Error: ' + result.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <MDBContainer fluid style={{ marginTop: "5%", borderRadius: '25px' }} className='text-black m-5'>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol col='12' md='6' style={{ marginTop: "8%" }}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} required />
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn type="submit" className="mb-0 px-5 login">Send Reset Link</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Remembered your password? <Link to="/login" className="link-danger">Login</Link></p>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default ForgetPassword;
