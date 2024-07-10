import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertColor, setAlertColor] = useState("danger");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     

    if (name.length < 3) {
      setAlertMessage("Name must be at least 3 characters long.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setAlertMessage("Please enter a valid email address.");
      return false;
    }
    
    if (password.length < 6) {
      setAlertMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== cpassword) {
      setAlertMessage("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check passwords match
    if (validateForm()) {
      // Register user
      axios
        .post("http://localhost:5000/register", {
          name,
          email,
          phone,
          password,
        })
        .then((result) => {
          localStorage.setItem("user", JSON.stringify(result.data)); // Save user data to local storage
          setUser(result.data); // Set the user context
          setAlertMessage("Registration Successful!");
          setAlertColor("success");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.status === "Error in mail") {
            setAlertMessage(
              "Your Entered Mail is Already Registered! Please Register Different Mail"
            );
          } else {
            setAlertMessage("Server error. Please try again later.");
          }
        });
    } 
  };
  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <MDBContainer fluid style={{ marginTop: "7%" }}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            {alertMessage && (
              <div className={`alert alert-${alertColor}`} role="alert">
                {alertMessage}
              </div>
            )}
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center "
              style={{ marginTop: "1%" }}
            >
              <p
                className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                style={{ fontWeight: "700", fontSize: "21px" }}
              >
                Create An Account
              </p>
              <form onSubmit={handleSubmit}>
                <div
                  className="d-flex flex-row align-items-center mb-4 "
                  style={{ width: "400px" }}
                >
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    name="name"
                    type="text"
                    className="w-100"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size="lg" />
                  <MDBInput
                    label="Your Phone Number"
                    name="phone"
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    name="password"
                    type={showPassword1 ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility1}
                    className="btn btn-outline-secondary ms-2"
                  >
                    {showPassword1 ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Confirm your password"
                    name="repeatPassword"
                    type={showPassword2 ? "text" : "password"}
                    onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility2}
                    className="btn btn-outline-secondary ms-2"
                  >
                    {showPassword2 ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Already have an account?{" "}
                  <Link to="/login" className="link-danger">
                    Login
                  </Link>
                </p>{" "}
                <br />
                <div className="text-center text-md-start mt-0 pt-0" style={{marginLeft:"4%"}}>
                 
                <MDBBtn type="submit"  className="mb-0 px-3.5" style={{marginTop:"2%", marginRight:"5%", borderRadius:"4px"}}>
                Register
                </MDBBtn>
                <MDBBtn  
                type="button"
                className="google-login-btn mb-2 px-2"
                onClick={handleGoogleLogin}
              >
                <img
                  src="/img/google.webp"
                  alt="Google logo"
                  className="google-logo"
                />
                Continue With Google
              </MDBBtn>
              </div>
              </form>
              
              
            </MDBCol>
            <MDBCol
              md="10"
              lg="5"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
