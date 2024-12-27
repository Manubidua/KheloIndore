
import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"; 
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import axios from "axios";
import Swal from "sweetalert2";
import '../../style/css/custom.css'
import { API_URL } from "../../ApiUrl"


const Login = () => {
  // const history = useHistory();
  const route = all_routes;
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  useEffect(() => {
    const loginToken = localStorage.getItem('token');
    if (loginToken) {
      navigate("/home")
    }
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const showLoadingAlert = () => {
    Swal.fire({
      title: 'Loading',
      html: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.close(); // Close the loading dialog after some time (simulation)
    }, 1000);
  };


  const handleSendOTP = (e: any) => {
    if (!mobileNumber.trim()) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please enter mobile number",
        icon: "error",
      });
      return;
    }
    // const trimmedMobileNumber = mobileNumber.trim().slice(0, 10);
    const mobileNumberPattern = /^\d{0,10}$/;
    const isValidNumber = mobileNumberPattern.test(mobileNumber);
    const errorElements = document.querySelectorAll(".err-signin");
    if (isValidNumber) {
      axios
        .post(`${API_URL}/user/login/mobile`, {
          mobile: mobileNumber
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('token2', response.data.token);
            showLoadingAlert();
            setShowOtpField(true);
          }
          else{
            Swal.fire({
              title: "Error",
              text: "You are not active, please contact admin",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Mobile number not registered.",
            icon: "error",
          });
        });

      errorElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = "none";
        }
      });
    }
    else {
      errorElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = "block";
        }
      });
      // alert("Invalid mobile number");
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!showOtpField) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please send OTP",
        icon: "error",
      });
      return;
    }

    if (!otp.trim()) {
      Swal.fire({
        title: "Validation Error!",
        text: "Please enter OTP",
        icon: "error",
      });
      return;
    }

    // Get the token from localStorage
    const storedToken = localStorage.getItem('token2');
    axios
      .post(
        `${API_URL}/user/login/mobile/otp`,
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Use the stored token
          },
        }
      )
      .then((response) => {
        const authToken = response.data.token;
        const sanitizedToken = authToken ? authToken.replace(/["']/g, "") : "";
        localStorage.setItem("token", sanitizedToken);
        // alert("login successfully");
        showLoadingAlert();
        navigate("/home")
        // history.push(route.userDashboardProfiles);
        // Redirect or perform any additional actions upon successful login
        // const redirectHome=()=>{
        // }
        // redirectHome();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Invalid OTP. Please try again.",
          icon: "error",
        });
      });
  };





  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper authendication-pages">
        {/* Page Content */}
        <div className="content">
          <div className="container wrapper no-padding">
            <div className="row no-margin vph-100">
              <div className="col-12 col-sm-12 col-lg-6 no-padding">
                <div className="banner-bg login">
                  <div className="row no-margin h-100">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <div className="h-100 d-flex justify-content-center align-items-center">
                        <div className="text-bg register text-center">
                          <button
                            type="button"
                            className="btn btn-limegreen text-capitalize"
                          >
                            <i className="fa-solid fa-thumbs-up me-3" />
                            Login User, Coach &amp; Venue Admin
                          </button>
                          <p>
                            Log in right away for our advanced sports software
                            solutions, created to address issues in regular
                            sporting events and activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12  col-lg-6 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <header className="text-center">
                        <Link to={route.home}>
                          <ImageWithBasePath
                            src="/assets/KHELO-INDORE-LOGO.png"
                            className="img-fluid img-logo"
                            alt="Logo"
                          />
                        </Link>
                      </header>
                      <div className="shadow-card">
                        <h2>Welcome Back</h2>
                        <p>Login into your account</p>
                        {/* Form for mobile and OTP */}
                        <form onSubmit={handleLogin}>
                          {!showOtpField && (
                            <div className="form-group">
                              <div className="group-img d-flex align-items-center">
                                <input
                                  // type="number"
                                  name="mumber"
                                  className="form-control"
                                  pattern="[0-9]*"
                                  placeholder="Enter Mobile Number"
                                  value={mobileNumber}
                                  onChange={(e) => {
                                    const trimmedMobileNumber = e.target.value.trim().slice(0, 10);
                                    setMobileNumber(trimmedMobileNumber)
                                  }
                                  }
                                />
                                <button
                                  type="button"
                                  className="btn btn-limegreen text-capitalize ms-2"
                                  style={{
                                    fontSize: "0.75rem",
                                    padding: "0.5rem 0.5rem",
                                    marginBottom: "0"
                                  }}
                                  onClick={handleSendOTP}
                                >
                                  Send OTP
                                </button>
                              </div>
                              <div>
                                <p id="err-signin" className="err-signin" style={{
                                  fontSize: "0.9rem",
                                  margin: "1rem 0.75rem",
                                  display: "none"
                                }}>
                                  Enter 10 digit mobile number
                                </p>
                              </div>
                            </div>

                          )}
                          {showOtpField && (
                            <div className="form-group">
                              <div className="group-img">
                                <i className="feather-lock" />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                />
                              </div>
                              <div className="row justify-content-end">
                                <p className="col-lg-3 col-md-3"
                                  style={{
                                    fontSize: "1rem",
                                    margin: "0.5rem 0rem",
                                  }}>
                                  <a href="#">resend OTP</a>
                                </p>
                              </div>
                              <button
                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                type="submit"
                              >
                                Login
                                <i className="feather-arrow-right-circle ms-2" />
                              </button>
                            </div>
                          )}
                        </form>
                        {/* End of mobile and OTP form */}
                        <div className="bottom-text text-center">
                          <p>
                            Don’t have an account?{" "}
                            <Link to={route.register}>Sign up!</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content*/}
      </div>
      {/* /Main Wrapper*/}
    </>
  );
};

export default Login;