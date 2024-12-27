import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import axios from "axios";
import { API_URL } from "../../ApiUrl";
import Swal from "sweetalert2";
import { BiMessageError } from "react-icons/bi";
import Loader from "../loader/loader";
const Signin = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    password: "",
    email: "",
    role: "User",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [registeredMobiles, setRegisteredMobiles] = useState<string[]>([]);
  const [policy, setpolicy] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const errorCheckbox = document.querySelectorAll(".err-checkbox");
  const errorFirstName = document.querySelectorAll(".err-firstName");
  const errorLastName = document.querySelectorAll(".err-lastName");
  const errorMobileNumber = document.querySelectorAll(".err-mobile");

  useEffect(() => {
    {
      const loginToken = localStorage.getItem("token");
      if (loginToken) {
        navigate("/user/user-dashborad");
      }
    }
  }, []);

  const showLoadingAlert = () => {
    Swal.fire({
      title: "Loading",
      html: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close(); // Close the loading dialog after some time (simulation)
    }, 1000);
  };

  const handleRole = (name: string, value: string) => {
    if (name && value) {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let errorMessage = "";

    if (name === "first_name" || name === "last_name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        errorMessage = `${name.replace("_", " ")} must contain only letters`;
      }
    } else if (name === "mobile") {
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
      setInput((prev) => ({ ...prev, [name]: sanitizedValue }));
      if (sanitizedValue.length !== 10) {
        errorMessage = "Mobile number must be 10 digits";
      }
    } else if (name === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errorMessage = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
        errorMessage =
          "Password must be at least 6 characters and include a number";
      }
    }

    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: errorMessage }));
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setErrors((prev: any) => ({ ...prev, checkbox: "" }));
  };

  // Handle Form Submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    // Validation
    if (!input.first_name) newErrors.first_name = "First name is required";
    if (!input.last_name) newErrors.last_name = "Last name is required";
    if (!input.email) newErrors.email = "Email is required";
    if (!input.mobile) newErrors.mobile = "Mobile number is required";
    if (input.mobile.length !== 10)
      newErrors.mobile = "Mobile number must be 10 digits";
    if (input.role === "Venue Admin" && !input.password)
      newErrors.password = "Password is required";
    if (!isChecked) newErrors.checkbox = "You must agree to the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      // Check if mobile is already registered
       Swal.fire({
         title: "Registering...",
         text: "Processing Registration.",
         allowOutsideClick: false,
         didOpen: () => {
           Swal.showLoading();
         },
       });
      if (registeredMobiles.includes(input.mobile)) {
        setErrors({ mobile: "Mobile number already registered" });
        return;
      }

      const response = await axios.post(`${API_URL}/user/signup`, input);

      if (response.data.success) {
        Swal.close();
        localStorage.setItem("token2", response.data.token);
        Swal.fire({
          title: "Success!",
          text: "An OTP has been sent to your Email.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/auth/verifyotp");
        });
      } else {
        setErrors({ api: response.data.message });
        Swal.close();
      }
    } catch (error) {
      if (
        errors.response &&
        errors.response.data &&
        errors.response.data.message
      ) {
        setErrors({ api: errors.response.data.message });
      } else {
        setErrors({ api: "Error signing up. Please try again later." });
      }
      Swal.close();
    }
  };

  return (
    <div>
      <>
        <div className="main-wrapper authendication-pages">
          <div className="content">
            <div className="container wrapper no-padding">
              <div className="row no-margin vph-100">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                  <div className="banner-bg register">
                    <div className="row no-margin h-100">
                      <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                        <div className="h-100 d-flex justify-content-center align-items-center">
                          <div className="text-bg register text-center">
                            <button
                              type="button"
                              className="btn btn-limegreen text-capitalize"
                            >
                              <i className="fa-solid fa-thumbs-up me-3" />
                              register Now
                            </button>
                            <p>
                              Register now for our innovative sports software
                              solutions, designed to tackle challenges in
                              everyday sports activities and events.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
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
                          <h2>Get Started With Khelo Indore</h2>
                          <p>
                            Ignite your sports journey with KheloIndore and get
                            started now.
                          </p>

                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link  d-flex align-items-center ${input.role === "User" ? "active" : ""}`}
                                id="user-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#user"
                                type="button"
                                role="tab"
                                aria-controls="user"
                                onClick={() => handleRole("role", "User")}
                              >
                                I am a User
                              </button>
                            </li>

                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link  d-flex align-items-center ${input.role === "Venue Admin" ? "active" : ""}`}
                                id="venue-admin-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#venue-admin"
                                type="button"
                                role="tab"
                                aria-controls="venue-admin"
                                aria-selected={input.role === "Venue Admin"}
                                onClick={() =>
                                  handleRole("role", "Venue Admin")
                                }
                              >
                                Venue Admin
                              </button>
                            </li>
                          </ul>

                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              // id="user"
                              role="tabpanel"
                              aria-labelledby="user-tab"
                            >
                              <form onSubmit={handleSignUp}>
                                {/* First Name */}
                                <div className="form-group">
                                  <label htmlFor="first_name">
                                    First Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="First Name"
                                    name="first_name"
                                    maxLength={25}
                                    value={input.first_name}
                                    onChange={handleInputChange}
                                  />
                                  {errors.first_name && (
                                    <p className="text-danger">
                                      <BiMessageError /> {errors.first_name}
                                    </p>
                                  )}
                                </div>

                                {/* Last Name */}
                                <div className="form-group">
                                  <label htmlFor="last_name">
                                    Last Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    maxLength={25}
                                    placeholder="Last Name"
                                    name="last_name"
                                    value={input.last_name}
                                    onChange={handleInputChange}
                                  />
                                  {errors.last_name && (
                                    <p className="text-danger">
                                      <BiMessageError /> {errors.last_name}
                                    </p>
                                  )}
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                  <label htmlFor="email">
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    value={input.email}
                                    onChange={handleInputChange}
                                  />
                                  {errors.email && (
                                    <p className="text-danger">
                                      <BiMessageError /> {errors.email}
                                    </p>
                                  )}
                                </div>

                                {/* Mobile */}
                                <div className="form-group">
                                  <label htmlFor="mobile">
                                    Mobile{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text" // Use 'text' instead of 'number' to handle maxlength
                                    className="form-control"
                                    id="mobile"
                                    placeholder="Mobile"
                                    name="mobile"
                                    value={input.mobile}
                                    onChange={(e) => {
                                      const { value } = e.target;
                                      // Allow only digits and restrict length to 10
                                      if (/^\d{0,10}$/.test(value)) {
                                        handleInputChange(e);
                                      }
                                    }}
                                  />
                                  {errors.mobile && (
                                    <p className="text-danger">
                                      <BiMessageError /> {errors.mobile}
                                    </p>
                                  )}
                                </div>

                                {/* Password */}
                                {input.role === "Venue Admin" && (
                                  <div className="form-group">
                                    <label htmlFor="password">
                                      Password{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      placeholder="Password"
                                      name="password"
                                      value={input.password}
                                      onChange={handleInputChange}
                                    />
                                    {errors.password && (
                                      <p className="text-danger">
                                        <BiMessageError /> {errors.password}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Checkbox */}
                                <div className="form-check custom-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="policy"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                  />
                                  <label htmlFor="policy">
                                    I agree to the{" "}
                                    <Link to="/terms">Terms of Use</Link>
                                  </label>
                                </div>
                                {errors.checkbox && (
                                  <p className="text-danger">
                                    <BiMessageError /> {errors.checkbox}
                                  </p>
                                )}

                                {/* API Error */}
                                {errors.api && (
                                  <p className="text-danger">
                                    <BiMessageError /> {errors.api}
                                  </p>
                                )}

                                {/* Submit Button */}
                                <button
                                  type="submit"
                                  className="btn btn-secondary w-100"
                                >
                                  Create Account
                                </button>

                                <div className="text-center py-3">
                                  <p>
                                    Have an account?{" "}
                                    <Link to="/auth/login" className="loginbtn">
                                      Login!
                                    </Link>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Signin;
