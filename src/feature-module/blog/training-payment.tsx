import React, { useState, useEffect } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { API_URL, IMG_URL } from "../../ApiUrl";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import axios from "axios";

interface TrainerData {
  first_name: string;
  last_name: string;
  duration: string;
  focus_area: string[];
  price: number;
  profile_picture: string[];
  src: string;
}

const TrainingPayment = (props: any) => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState<TrainerData[]>([]);
  const idData = useParams();
  const location = useLocation();

  const id = idData.id;
  const { selectedBatch, selectedTimeSlot, subtotal } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Fetch coach data from API

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
  }, []);

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
              {/* <li>
                <h5>
                  <Link to={routes.coachDetails}>
                    <span>1</span>Type of Booking
                  </Link>
                </h5>
              </li> */}
              <li>
                <h5>
                  <Link to={`/personal-training/training-timedate/${id}`}>
                    <span>1</span>Time &amp; Date
                  </Link>
                </h5>
              </li>
              {/* <li>
                <h5>
                  <Link to={routes.coachPersonalInfo}>
                    <span>3</span>Personal Information
                  </Link>
                </h5>
              </li> */}
              <li>
                <h5>
                  <Link to={`/personal-training/training-order-confirm/${id}`}>
                    <span>2</span>Order Confirmation
                  </Link>
                </h5>
              </li>
              <li className="active">
                <h5>
                  <Link to={`/personal-trainingtra/training-payment/${id}`}>
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
            <section>
              <div className="text-center mb-40">
                <h3 className="mb-1">Payment</h3>
                <p className="sub-title">
                  Securely make your payment for the booking. Contact support
                  for assistance.
                </p>
              </div>
              <div className="master-academy dull-whitesmoke-bg card mb-40">
                <div className="d-flex justify-content-between align-items-center">
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
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="text-white dark-yellow-bg color-white me-2 d-flex justify-content-center align-items-center">
                          4.5
                        </span>
                        <span>300 Reviews</span>
                      </div>
                      <h3 className="mb-2">
                        {trainerData?.first_name}
                        {trainerData?.lastt_name}
                      </h3>
                      <p>
                        Certified Badminton Coach with a deep understanding of
                        the sport`&apos;s strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row checkout">
                <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                  <div className="card booking-details">
                    <h3 className="border-bottom">Order Summary</h3>
                    <ul>
                      <li>
                        <i className="feather-calendar me-2" />
                        <p>
                          {selectedBatch
                            ? new Date(
                                selectedBatch.batch_date
                              ).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>
                      </li>
                      <li>
                        <i className="feather-clock me-2" />
                        <p>
                          {selectedTimeSlot?.startTime} -{" "}
                          {selectedTimeSlot?.endTime}
                        </p>
                      </li>
                      {/* <li>
                        <i className="feather-users me-2" />
                        Total Hours : 3 Hrs
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                  <aside className="card payment-modes">
                    <h3 className="border-bottom">Checkout</h3>
                    <h6 className="mb-3">Select Payment Gateway</h6>
                    <div className="radio">
                      <div className="form-check form-check-inline mb-3">
                        <input
                          className="form-check-input default-check me-2"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          defaultValue="Credit Card"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Credit Card
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-3">
                        <input
                          className="form-check-input default-check me-2"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          defaultValue="Paypal"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Paypal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input default-check me-2"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          defaultValue="Wallet"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Wallet
                        </label>
                      </div>
                    </div>
                    <hr />
                    <ul className="order-sub-total">
                      <li>
                        <p>Sub total</p>
                        <h6>₹250</h6>
                      </li>
                      <li>
                        <p>Additional Guest</p>
                        <h6>₹25</h6>
                      </li>
                      <li>
                        <p>Service charge</p>
                        <h6>₹70</h6>
                      </li>
                    </ul>
                    <div className="order-total d-flex justify-content-between align-items-center">
                      <h5>Order Total</h5>
                      <h5>₹450</h5>
                    </div>
                    <div className="form-check d-flex justify-content-start align-items-center policy">
                      <div className="d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="policy"
                        />
                      </div>
                      <label className="form-check-label" htmlFor="policy">
                        By clicking `&apos;Send Request`&apos;, I agree to
                        KheloIndore{" "}
                        <Link to={routes.privacyPolicy}>Privacy Policy</Link>{" "}
                        and <Link to={routes.termsCondition}>Terms of Use</Link>
                      </label>
                    </div>
                    <div className="d-grid btn-block">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#bookingconfirmModal"
                      >
                        Proceed ₹200
                      </button>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </div>
          {/* Container */}
        </div>
        {/* /Page Content */}
      </>
      <>
        {/* Booking Confirmed Modal */}
        <div
          className="modal fade"
          id="bookingconfirmModal"
          tabIndex={-1}
          aria-labelledby="bookingconfirmModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-center d-inline-block">
                <ImageWithBasePath
                  src="assets/img/icons/booking-confirmed.svg"
                  alt="Icon"
                />
              </div>
              <div className="modal-body text-center">
                <h3 className="mb-3">Booking has been Confirmed</h3>
                <p>Check your email on the booking confirmation</p>
              </div>
              <div className="modal-footer text-center d-inline-block">
                <Link to={routes.userDashboard} className="btn btn-primary">
                  <i className="feather-arrow-left-circle me-1" />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Booking Confirmed Modal */}
      </>
    </div>
  );
};

export default TrainingPayment;
