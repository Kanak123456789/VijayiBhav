import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/reset/${token}`, { password })
      .then(result => {
        if (result.data.status === "Success") {
          alert('Password has been reset successfully');
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
            <MDBInput wrapperClass='mb-4' label='New Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} required />
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn type="submit" className="mb-0 px-5 login">Reset Password</MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default ResetPassword;
