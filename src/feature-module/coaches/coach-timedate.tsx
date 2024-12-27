import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { all_routes } from "../router/all_routes";
import { API_URL, IMG_URL } from "../../ApiUrl";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
import { jwtDecode } from "jwt-decode";
import "../../style/css/custom.css";
import Swal from "sweetalert2";
import { log } from "console";

interface CoachData {
  first_name: string;
  last_name: string;
  location: string;
  experience: string;
  availability: string;
  specializations: string[];
  bio: string;
  package: string;
  price: number;
  package_type: string;
  name: string;
  duration: number;
  focus_area: string;
  number_of_sessions: number;
  profile_picture: { src: string }[];
  address: string;
  city: string;
  state: string;
  zipcode: string;
  _id: string;
}

interface BatchData {
  length: number;
  batchSize: number;
  _id: string;
  slots: SlotData[];
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  personCount: number;
  batchDate: any;
  batchName: string;
}

interface SlotData {
  _id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  personCount: number;
  slots: any;
}

interface JwtPayload {
  first_name: string;
  userID: string;
}

const CoachTimeDate = (props: any) => {
  const routes = all_routes;
  const [coachData, setCoachData] = useState<CoachData | null>(null);
  const [batchData, setBatchData] = useState<BatchData[]>([]);
  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [slotData, setSlotData] = useState<SlotData[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<SlotData | null>(
    null
  );
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchCoachId = async () => {
      try {
        const response = await axios.get(`${API_URL}/fetch-coach/${id}`);
        const coachDataId = response.data.coach;
        setCoachData(coachDataId);
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };
    fetchCoachId();
  }, [id]);

  useEffect(() => {
    const fetchBatchId = async () => {
      try {
        const response = await axios.get(`${API_URL}/coach/batches/${id}`);
        const batchDataId = response.data.data;
        setBatchData(batchDataId);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatchId();
  }, [id]);

  useEffect(() => {
    const fetchSlotId = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/coach-slot/fetch/${selectedBatch?._id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const slotDataId = response.data.data;
        setSlotData(slotDataId);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (selectedBatch?._id) {
      fetchSlotId();
    }

  }, [selectedBatch]);


  useEffect(() => {
    const getTokenFromStorage = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserData(decodedToken);
      } else {
        return;
      }
    };
    getTokenFromStorage();
  }, []);

  const handleBooking = async () => {
    if (!userData) {
      Swal.fire({
        title: "Not Logged in",
        text: "You need to be login to book a Personal Trainer. Click OK to login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }
    if (!selectedTimeSlot || !selectedBatch) {
      Swal.fire({
        title: "Error",
        text: "Please select any slot.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const bookingData = {
      user_id: userData?.userID,
      coachId: id,
      slotsBooked: [selectedTimeSlot._id],
      date: selectedBatch?.batchDate,
      packageType: "monthly",
      total_price: selectedTimeSlot.price,
    };

    try {
      // const response = await axios.post(
      //   `${API_URL}/coach/booking`,
      //   bookingData
      // );
      // if (response.status === 200) {
      //   Swal.fire({
      //     title: "Success!",
      //     text: "Booking is booked successfully.",
      //     icon: "success",
      //     confirmButtonText: "OK",
      //   }).then(() => {
      //     navigate(`/coaches/coach-order-confirm/${id}`, {
      //       state: {
      //         bookingData
      //       },
      //     });
      //   });
      // } else {
      //   Swal.fire({
      //     title: "Failed",
      //     text: "Failed to complete the booking. Please try again.",
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
      // }
      navigate(`/coaches/coach-order-confirm/${id}`, {
        state: {
          bookingData, selectedTimeSlot
        },
      });
    } catch (error) {
      console.error("Error making the booking:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred during booking. Please select any slot.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Book Coach</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Book Coach</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        <section className="booking-steps py-30">
          <div className="container">
            <ul className="d-xl-flex justify-content-center align-items-center">
              <li className="active">
                <h5>
                  <Link to={`/coaches/coach-timedate/${id}`}>
                    <span>1</span>Time &amp; Date
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={`/coaches/coach-order-confirm/${id}`}>
                    <span>2</span>Order Confirmation
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={`/coaches/coach-payment/${id}`}>
                    <span>3</span>Payment
                  </Link>
                </h5>
              </li>
            </ul>
          </div>
        </section>
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="card mb-40">
              <div className="text-center mb-40">
                <h3 className="mb-1">Time &amp; Date</h3>
                <p className="sub-title">
                  Book your training session at a time and date that suits your
                  needs.
                </p>
              </div>
              <div className="master-academy dull-whitesmoke-bg card">
                <div className="d-sm-flex justify-content-between align-items-center">
                  <div className="d-sm-flex justify-content-start align-items-center">
                    <Link to="#">
                      <ImageWithBasePath
                        className="corner-radius-100 coach-book-img"
                        src={
                          coachData?.profile_picture?.[0]?.src
                            ? `${IMG_URL}${coachData.profile_picture[0].src}`
                            : "/assets/img/profiles/avatar-06.jpg"
                        }
                        alt="User"
                      />
                    </Link>
                    <div className="info">
                      {/* <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="text-white dark-yellow-bg color-white me-2 d-flex justify-content-center align-items-center">
                          4.5
                        </span>
                        <span>300 Reviews</span>
                      </div> */}
                      <h3 className="mb-2">
                        {coachData?.first_name} {coachData?.last_name}
                      </h3>
                      <p>
                        Certified Coach with a deep understanding of
                        the sport&apos;s strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="row text-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <div className="card time-date-card">
                  <section className="booking-date">
                    <div className="list-unstyled date-slider mb-40">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Batch
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {batchData
                            ? batchData.map((batch) => (
                              <Dropdown.Item
                                key={batch._id}
                                onClick={() => setSelectedBatch(batch)}
                              >
                                {batch.batchName}-
                                {new Date(batch.batchDate).toLocaleDateString(
                                  "en-IN"
                                )}
                              </Dropdown.Item>
                            ))
                            : ""}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    {selectedBatch && (
                      <div className="slots">
                        <div className="batch-data">
                          <div className="batch-name">
                            Batch Name : {selectedBatch.batchName}
                          </div>
                          <div className="batch-name">
                            Start On :{" "}
                            {new Date(
                              selectedBatch.batchDate
                            ).toLocaleDateString("en-IN")}
                          </div>
                        </div>
                        <div className="slots-data">
                          <h5>Available Slots</h5>
                          <div className="slot-list row">
                            {slotData?.slots?.map((slot: any) => (
                              <div
                                key={slot._id}
                                className={`slot-item col-md-5 col-lg-5 ${selectedTimeSlot?._id === slot._id ? "selected" : ""} ${slot.isBooked ? "disabled" : ""}`}
                                onClick={() => setSelectedTimeSlot(slot)}
                              >
                                <div>
                                  {/* <i className="feather-clock me-2" /> */}
                                  Time : {slot.startTime} - {slot.endTime}
                                </div>
                                <div>Price : ₹{slot.price}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row"></div>
                  </section>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <aside className="card booking-details">
                  <h3 className="border-bottom">Booking Details</h3>
                  <ul>
                    <li>
                      <i className="feather-calendar me-2" />
                      {new Date(selectedBatch?.batchDate).toLocaleDateString(
                        "en-IN"
                      ) || "Select a date"}
                    </li>
                    <li>
                      <i className="feather-clock me-2" />
                      {selectedTimeSlot
                        ? `${selectedTimeSlot.startTime} to ${selectedTimeSlot.endTime}`
                        : "Select a time slot"}
                    </li>
                  </ul>
                  <div className="d-grid btn-block">
                    <button type="button" className="btn btn-primary">
                      Subtotal : ₹
                      {selectedTimeSlot ? selectedTimeSlot.price : 0}
                    </button>
                  </div>
                </aside>
              </div>
            </div>
            <div className="text-center btn-row">
              <Link
                className="btn btn-primary me-3 btn-icon"
                to={`/coaches/coach-timedate/${id}`}
              >
                <i className="feather-arrow-left-circle me-1" /> Back
              </Link>
              <button
                className="btn btn-secondary btn-icon"
                onClick={handleBooking}
              >
                Next <i className="feather-arrow-right-circle ms-1" />
              </button>
            </div>
          </div>
          {/* /Container */}
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default CoachTimeDate;
