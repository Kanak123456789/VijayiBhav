import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // New state variable for OTP
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertColor, setAlertColor] = useState("danger");
  const [otpSent, setOtpSent] = useState(false); // New state variable to track if OTP is sent
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/forgetpassword", { email })
      .then((result) => {
        if (result.data.status === "Success") {
          setAlertMessage("OTP sent to email");
          setAlertColor("success");
          setOtpSent(true);
        } else {
          setAlertMessage(result.data.message);
        }
      })
      .catch((err) => {
        setAlertMessage("Server error. Please try again later.");
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:5000/verifyotp", { email, otp, newPassword: password })
      .then((result) => {
        if (result.data.status === "Success") {
          setAlertMessage("Password reset successfully");
          setAlertColor("success");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setAlertMessage(result.data.message);
        }
      })
      .catch((err) => {
        if(err.response.data.status === "Invalid OTP"){
          setAlertColor("danger");
          setAlertMessage("Invalid OTP! Please Enter Again");
        }
        
      });
  };

  document.body.style.overflowX = "hidden";

  return (
    <MDBContainer
      fluid
      style={{ marginTop: "2%", borderRadius: "25px", overflow: "hidden" }}
      className="text-black m-5"
    >
      <MDBRow>
        <MDBCol md="5">
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            <MDBRow>
              <MDBCol md="12" style={{ marginTop: "20%" }}>
                {alertMessage && (
                  <div className={`alert alert-${alertColor}`} role="alert">
                    {alertMessage}
                  </div>
                )}
                <h3>Enter Details:-</h3>
                <br />
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={otpSent}
                  />
                </div>
                {otpSent && (
                  <>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="key me-3" size="lg" />
                      <MDBInput
                        label="OTP"
                        size="lg"
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        label="Password"
                        size="lg"
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
                        size="lg"
                        name="repeatPassword"
                        type={showPassword2 ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                  </>
                )}
                <div className="text-center text-md-middle mt-4 pt-10">
                  <MDBBtn type="submit" className="mb-0 px-5 login">
                    {otpSent ? "Reset Password" : "Send OTP"}
                  </MDBBtn>
                  <p
                    className="small  fw-bold mt-2 pt-1 mb-2"
                    style={{ marginRight: "6%" }}
                  >
                    Remember Password?{" "}
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCol>
        <MDBCol
          md="6"
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "7%" }}
        >
          <img
            src="./forgotepassword.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ForgetPassword;
