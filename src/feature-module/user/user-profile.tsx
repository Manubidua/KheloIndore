import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { API_URL, IMG_URL } from "../../ApiUrl";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  mobile: number;
  profile_image: any;
}

interface JwtPayload {
  userID: number;
}

const UserProfile = () => {
  const routes = all_routes;
  const [userDataId, setUserDataId] = useState<JwtPayload | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    user_info: "",
    profile_image: [],
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getTokenFromStorage = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserDataId(decodedToken);
      } else {
        return;
      }
    };
    getTokenFromStorage();
  }, []);

  useEffect(() => {
    const user_id: any = userDataId?.userID;
    setUserId(user_id);
  }, [userDataId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/fetch-user-by-id/${userId}`
        );
        console.log(response.data.data, "user dtaaa");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userId, userDataId]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      Swal.fire(
        "No file selected",
        "Please select a file to upload.",
        "warning"
      );
      return;
    }

    // Validate file size (max 5MB)
    const MAX_SIZE_MB = 5;
    const maxSize = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire(
        "File Too Large",
        `File size exceeds ${MAX_SIZE_MB}MB limit. Please upload a smaller file.`,
        "error"
      );
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire(
        "Invalid File Type",
        "Please upload a JPG, PNG, or SVG file.",
        "error"
      );
      return;
    }

    // Display preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);

    // Prepare form data
    const formData = new FormData();
    formData.append("uploadFile", file);

    try {
      // Make the API request
      const response:any = await axios.post(
        ` ${API_URL}/upload-file?types=user`,
        formData
      );

      if (response.status === 200) {
        // const { data } = response;
        
        if (response.data.status) {
          console.log(response.data, "all response");
          setUploadedFileUrl(response.data.file_data);
          Swal.fire("Success", "File uploaded successfully!", "success");
        } else {
          Swal.fire("Upload Successful", "File uploaded successfully", "info");
        }
      } else {
        console.error("Unexpected response:", response);
        Swal.fire(
          "Unexpected Error",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        Swal.fire(
          "Upload Error",
          `Error: ${error.response?.data?.message || "Something went wrong with the upload."}`,
          "error"
        );
      } else {
        console.error("Unexpected error:", error);
        Swal.fire(
          "Unexpected Error",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSaveChange = async () => {
    const API_URL = `https://kheloindore.in/api/user/profile-setting/${userId}`;

    const payload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address,
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      user_info: userData.user_info,
      profile_image: uploadedFileUrl,
    };

    try {
      setLoading(true);
      setError("");

      const response = await axios.put(API_URL, payload);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Profile updated successfully!",
        confirmButtonText: "OK",
      });

      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again.",
        confirmButtonText: "OK",
      });

      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">User Profile</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>User Profile</li>
          </ul>
        </div>
      </section>

      <div className="dashboard-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-menu">
                <ul>
                  {/* <li>
                    <Link to={routes.userDashboard}>
                      <ImageWithBasePath
                        src="/assets/img/icons/dashboard-icon.svg"
                        alt="Icon"
                      />
                      <span>Dashboard</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to={routes.userBookings}>
                      <ImageWithBasePath
                        src="/assets/img/icons/booking-icon.svg"
                        alt="Icon"
                      />
                      <span>My Bookings</span>
                    </Link>
                  </li>

                  <li>
                    <Link to={routes.userProfile} className="active">
                      <ImageWithBasePath
                        src="/assets/img/icons/profile-icon.svg"
                        alt="Icon"
                      />
                      <span>Profile Setting</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          {/* <div className="coach-court-list profile-court-list">
              <ul className="nav">
                <li>
                  <Link className="active" to={routes.userProfile}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={routes.userSettingPassword}>Change Password</Link>
                </li>
                <li>
                  <Link to={routes.userProfileOtherSetting}>
                    Other Settings
                  </Link>
                </li>
              </ul>
            </div> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="profile-detail-group">
                <div className="card ">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="image-upload">
                          <h3>Upload Image</h3>
                          <div className="file-upload">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.svg"
                              onChange={handleFileUpload}
                            />
                          </div>
                          {previewUrl ? (
                            <div className="preview">
                              <h4>Image Preview:</h4>
                              <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ maxWidth: "200px" }}
                              />
                            </div>
                          ) : userData.profile_image?.[0]?.src ? (
                            <div className="preview">
                              <h4>Image Preview:</h4>
                              <img
                                src={`${IMG_URL}${userData.profile_image?.[0]?.src}`}
                                alt="Preview"
                                style={{ maxWidth: "200px" }}
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          
                        </div>
                      </div>

                      {/* First Name */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            placeholder="Enter Name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Enter Name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email Address"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            placeholder="Enter Phone Number"
                            value={userData.mobile}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="info-about">
                          <label htmlFor="comments" className="form-label">
                            Information about You
                          </label>
                          <textarea
                            className="form-control"
                            id="comments"
                            rows={3}
                            placeholder="About"
                            name="user_info"
                            value={userData.user_info}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="address-form-head">
                        <h4>Address</h4>
                      </div>

                      {/* Address */}
                      <div className="col-lg-12 col-md-12">
                        <div className="input-space">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Enter Your Address"
                            value={userData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* State */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            placeholder="Enter State"
                            value={userData.state}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder="Enter City"
                            value={userData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Zipcode */}
                      <div className="col-lg-4 col-md-6">
                        <div className="input-space mb-0">
                          <label className="form-label">Zipcode</label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder="Enter Zipcode"
                            value={userData.zipcode}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers and limit to 6 characters
                              if (/^\d*$/.test(value) && value.length <= 6) {
                                handleInputChange(e);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="save-changes text-end">
                  <div>
                    <button
                      onClick={handleSaveChange}
                      className="btn btn-secondary save-profile"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Change"}
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
