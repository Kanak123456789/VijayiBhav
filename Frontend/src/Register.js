 
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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {
 
  const [name,setname] = useState();
  const [email,setmail] = useState();
  const [password,setpassword] = useState();
  const [cpassword,setcpassword] = useState();
  const Navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(cpassword === password){
      axios.post('http://localhost:5000/Register',{name,email,password})
      .then(result => {
        console.log(result.data);
        if (result.data === "Email Already Exists") {
          alert("Email Already Exists! Please use a different email.");
        } else {
          Navigate('../Home');
        }
      })
    .catch(err => console.log(err))
    }
    else{
      alert("Passwords Do Not Match! Please Try Again.")
    }
    
    
  }

  return (
    <MDBContainer fluid style={{ marginTop: "8%" }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ fontWeight: "700", fontSize: "21px" }}>
                Create An Account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' name='name' type='text' className='w-100'onChange={(e)=> setname(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' name='email' type='email'  onChange={(e)=> setmail(e.target.value)}  required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' name='password' type='password' onChange={(e)=> setpassword(e.target.value)} required />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' name='repeatPassword' type='password' onChange={(e)=> setcpassword(e.target.value)}  required />
                </div>
                <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to="/Login" className="link-danger">Login</Link></p> <br />
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
