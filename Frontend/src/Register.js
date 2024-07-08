import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertColor, setAlertColor] = useState('danger');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check passwords match
    if (cpassword === password) {
      // Register user
      axios.post('http://localhost:5000/register', { name, email, phone, password })
        .then(result => {
          localStorage.setItem('user', JSON.stringify(result.data)); // Save user data to local storage
          setUser(result.data);  // Set the user context
          setAlertMessage('Registration Successful!')
          setAlertColor('success');
          setTimeout(()=>{
             navigate('/home');
          },2000)
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.status === 'Error in mail') {
            setAlertMessage('Your Entered Mail is Already Registered! Please Register Different Mail');
          } else {
            setAlertMessage('Server error. Please try again later.');
          }
        });
    } else {
      setAlertMessage('Passwords Do Not Match! Please Try Again.');
    }
  };

  return (
    <MDBContainer fluid style={{ marginTop: '7%'}}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
          {alertMessage && (
        <div className={`alert alert-${alertColor}` }  role="alert">
          {alertMessage}
        </div>
      )}
            <MDBCol md='10' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center' style={{marginTop:"1%"}}>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ fontWeight: '700', fontSize: '21px' }}>
                Create An Account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' name='name' type='text' className='w-100' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' name='email' type='email' onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size='lg' />
                  <MDBInput label='Your Phone Number' name='phone' type='tel' onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' name='repeatPassword' type='password' onChange={(e) => setCPassword(e.target.value)} required />
                </div>
                <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to="/login" className="link-danger">Login</Link></p> <br />
                <MDBBtn type='submit' className='mb-4'>Register</MDBBtn>
              </form>
            </MDBCol>
            <MDBCol md='10' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
