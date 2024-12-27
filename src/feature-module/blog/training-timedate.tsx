import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { all_routes } from "../router/all_routes";
import { API_URL, IMG_URL } from "../../ApiUrl";
import Swal from 'sweetalert2';


interface TrainerData {
  first_name: string;
  last_name: string;
  duration: string;
  focus_area: string[];
  price: number;
  profile_picture: any;
  src: string;
  _id: string;
}

interface BatchData {
  id: any;
  _id: string;
  Personal_trainer_id: string;
  batch_date: string;
  batch_name: string;
  package_type: string;
}

interface SlotData {
  _id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
}

interface JwtPayload {
  first_name: string;
  userID: string;
}

const TrainingTimeDate = (props: any) => {
  const routes = all_routes;
  const [trainerData, setTrainerData] = useState<TrainerData | null>(null);
  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [batchData, setBatchData] = useState<BatchData[]>([]);
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
    const fetchTrainerId = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/PersonalTraining/fetch/${id}`
        );
        const trainerDataId = response.data.personalTrainer;
        setTrainerData(trainerDataId);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };
    fetchTrainerId();
  }, [id]);

  useEffect(() => {
    const fetchBatchId = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/pt/batch/${id}`
        );
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
          `${API_URL}/pt/batch/slot/${selectedBatch?.id}`
        );
        const slotDataId = response.data.data;
        setSlotData(slotDataId);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchSlotId();
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
        title: 'Not Logged in',
        text: 'You need to be login to book a Personal Trainer. Click OK to login.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login"); 
        }
      });
      return;
    }
    if (!selectedTimeSlot || !selectedBatch) {
      alert("Please select a batch and a time slot.");
      return;
    }

    const bookingData = {
      pt_id: id,
      user_id: userData?.userID,
      batch_id: selectedBatch.id,
      batch_name: selectedBatch.batch_name,
      slot_id: selectedTimeSlot._id,
      package_type: selectedBatch.package_type,
      start_date: selectedBatch.batch_date,
    };

    try {
      const response = await axios.post(
        `${API_URL}/pt/booking`,
        bookingData
      );
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Slot is booked successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(`/personal-training/training-order-confirm/${id}`, {
            state: {
              selectedBatch,
              selectedTimeSlot,
              subtotal: selectedTimeSlot.price,
            },
          });
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: 'Failed to complete the booking. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error making the booking:", error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred during booking. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
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
            <h1 className="text-white">Book Personal Trainer</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Book Personal Trainer</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        <section className="booking-steps py-30">
          <div className="container">
            <ul className="d-xl-flex justify-content-center align-items-center">
              <li className="active">
                <h5>
                  <Link to={`/personal-training/training-timedate/${id}`}>
                    <span>1</span>Time &amp; Date
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={`/personal-training/training-order-confirm/${id}`}>
                    <span>2</span>Order Confirmation
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={`/personal-training/training-payment/${id}`}>
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
                          trainerData?.profile_picture
                            ? `${IMG_URL}${trainerData?.profile_picture[0].src}`
                            : "/assets/img/featured/featured-06.jpg"
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
                      <h3 className="mb-2">{trainerData?.first_name} {trainerData?.last_name}</h3>
                      <p>
                        Certified Coach with a deep understanding of
                        the sport&apos;s strategies.
                      </p>
                    </div>
                  </div>
                  {/* <div className="white-bg">
                    <p className="mb-1">Starts From</p>
                    <h3 className="d-inline-block primary-text mb-0">₹{trainerData?.price}</h3>
                    <span>/hr</span>
                  </div> */}
                </div>
              </div>
            </section>
            <div className="row text-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <div className="card time-date-card">
                  <section className="booking-date">
                    <div className="list-unstyled owl-carousel date-slider owl-theme mb-40">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Select Batch
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {batchData && batchData.length > 0 ? (
                            batchData.map((batch) => (
                              <Dropdown.Item
                                key={batch._id}
                                onClick={() => setSelectedBatch(batch)}
                              >
                                {batch.batch_name}
                              </Dropdown.Item>
                            ))
                          ) : (
                            <Dropdown.Item>No available batches</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>

                      {selectedBatch ? (
                        <div className="trainer-slots-data">
                          <div className="trainer-slot-name">
                            <div className="trainer-slot-name-data">Batch Name : {selectedBatch?.batch_name}</div>
                            <div className="trainer-slot-name-data">
                              Start On : {new Date(
                                selectedBatch?.batch_date
                              ).toLocaleDateString("en-IN")}
                            </div>
                          </div>
                          {slotData.map((slot) => (
                            <div
                              key={slot._id}
                              className="time-slot"
                              onClick={() => setSelectedTimeSlot(slot)}
                              style={{
                                cursor: "pointer",
                                padding: "10px",
                                border: "2px solid",
                                marginBottom: "10px",
                                color:
                                  selectedTimeSlot?._id === slot._id 
                                    ? "#ff5f1f"
                                    : "#4a4242",
                                borderColor:
                                  selectedTimeSlot?._id === slot._id
                                    ? "#ff5f1f"
                                    : "#8b8a89",
                              }}
                            >
                              <p>
                                Time : {slot.startTime} - {slot.endTime}
                              </p>
                              <p>Price: ₹{slot.price}</p>
                              <p>{slot.isBooked ? "Booked" : "Available"}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </section>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <aside className="card booking-details">
                  <h3 className="border-bottom">Booking Details</h3>
                  <ul>
                    <li>
                      <i className="feather-calendar me-2" />
                      <span>{selectedBatch?.batch_name || "None"}</span>
                    </li>
                    <li>
                      <i className="feather-clock me-2" />
                      <span>
                        {selectedTimeSlot
                          ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                          : "None"}
                      </span>
                    </li>
                  </ul>
                  <div className="d-grid btn-block">
                    <button type="button" className="btn btn-primary">
                      Subtotal : 
                      <span>
                        ₹{selectedTimeSlot ? selectedTimeSlot.price : 0}
                      </span>
                    </button>
                  </div>
                </aside>
              </div>

              <div className="text-center btn-row">
                <Link
                  className="btn btn-primary me-3 btn-icon"
                  to={`/personal-training/trainer/${id}`}
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
          </div>
        </div>

        {/* /Page Content */}
      </>
    </div>
  );
};

export default TrainingTimeDate;
