import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import Lightbox from "yet-another-react-lightbox";
import { API_URL, IMG_URL } from "../../ApiUrl";

interface TrainerData {
  first_name: any;
  last_name: any;
  duration: string;
  focus_area: any;
  price: number;
  profile_picture: any;
  src: string;
  specializations: string[];
  experience: string;
  location: any;
  gallery:any;
}
// Other properties...

const PersonalTrainingDetails = (props: any) => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [open, setOpen] = React.useState(false);
  const [trainerData, setTrainerData] = useState<TrainerData>();
  const idData = useParams();
  const id = idData.id;

  const [selectedCity, setSelectedCity] = useState();
  const cityOptions = [
    { name: "Select City" },
    { name: "Toronto" },
    { name: "Texas" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>();
  const sortOptions = [{ name: "Relevance" }, { name: "Price" }];

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

  const featuredVenuesSlider = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    margin: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const scrollContent = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="venue-coach-details coach-detail">
      {/* Breadcrumb */}
      {/* <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Personal Trainer</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Personal Trainer</li>
          </ul>
        </div>
      </div> */}
      <div className="banner">
        <ImageWithBasePath
          src="/assets/img/bg/coach-detail-bg.jpg"
          alt="Banner"
        />
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Row */}
          <div className="row move-top">
            {/* {trainerData.map((coachId,index)=>(   */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <div className="dull-bg corner-radius-10 coach-info d-md-flex justify-content-start align-items-start">
                <div className="profile-pic">
                  <Link to="#;">
                    <ImageWithBasePath
                      alt="User"
                      className="corner-radius-10"
                      // src="/assets/img/profiles/avatar-coach-detail.jpg"

                      src={
                        trainerData?.profile_picture
                          ? `${IMG_URL}${trainerData?.profile_picture[0].src}`
                          : 
                          "/assets/img/featured/featured-06.jpg"
                      }
                    />
                  </Link>
                </div>
                <div className="info w-100">
                  <div className="d-sm-flex justify-content-between align-items-start">
                    <h3 className="d-flex align-items-center justify-content-start mb-0">
                      {trainerData?.first_name} &nbsp;{trainerData?.last_name}
                      <span className="d-flex justify-content-center align-items-center">
                        <i className="fas fa-check-double" />
                      </span>
                    </h3>
                    <Link to="#">
                      <span className="favourite fav-icon">
                        <i className="feather-star" />
                        Favourite
                      </span>
                    </Link>
                  </div>
                  <p>
                    Trainer {trainerData?.first_name} provides
                    lessons in Santa Monica at Penmar Park
                  </p>
                  <ul className=" align-items-center">
                    <li className="d-flex align-items-center">
                      <div className="white-bg d-flex align-items-center review">
                        {/* <span>specializations: {coachData.focus_area}</span> */}
                        <span>specializations : </span>
                        {/* <span> {coachData.focus_area.map((area, index) => index > 0 ? `, ${area}` : area).join('')}</span> */}
                        <span>
                          &nbsp;
                          {trainerData?.specializations &&
                            trainerData?.specializations.map((area: any, index: number) =>
                                index > 0 ? `, ${area}` : area
                              )
                              .join("")}
                        </span>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="white-bg d-flex align-items-center review">
                        <span>Location: {trainerData?.location?.address}, {trainerData?.location?.city}, {trainerData?.location?.state}
                          , {trainerData?.location?.zipcode}
                        </span>
                      </div>
                    </li>
                    <li>
                      {/* <ImageWithBasePath
                        src="assets/img/icons/flag-01.png"
                        alt="Icon"
                      /> */}
                      {/* {trainerData?.location?.address}, {trainerData?.location?.city}, {trainerData?.location?.state},{trainerData?.location?.zipCode} */}
                      {/* {coachData?.location?.city} */}
                    </li>
                  </ul>
                  <hr />
                  {/* <ul className="d-xl-flex">
                    <li className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="/assets/img/icons/expert.svg"
                        alt="Icon"
                      />
                      Rank : Expert
                    </li>
                    <li className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="/assets/img/icons/sessions.svg"
                        alt="Icon"
                      />
                      Sessions Completed : 25
                    </li>
                    <li className="d-flex align-items-center">
                      <ImageWithBasePath
                        src="/assets/img/icons/since.svg"
                        alt="Icon"
                      />
                      With KheloIndore Since Apr 5, 2023
                    </li>
                  </ul> */}
                </div>
              </div>
              <div className="venue-options white-bg mb-4">
                <ul className="clearfix">
                  <li className="active">
                    <Link onClick={() => scrollContent("short-bio")} to={""}>
                      Short Bio
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => scrollContent("basic-info")} to={""}>
                      Lesson With Me
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => scrollContent("coaching")} to={""}>
                      Coaching
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => scrollContent("gallery")} to={""}>
                      Gallery
                    </Link>
                  </li>
                  {/* <li>
                    <Link onClick={() => scrollContent("reviews")} to={""}>
                      Reviews
                    </Link>
                  </li> */}
                  <li>
                    <Link onClick={() => scrollContent("location")} to={""}>
                      Location
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Accordian Contents */}
              <div className="accordion" id="accordionPanel">
                <div className="accordion-item mb-4" id="short-bio">
                  <h4
                    className="accordion-header"
                    id="panelsStayOpen-short-bio"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      Short Bio
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-short-bio"
                  >
                    <div className="accordion-body">
                      <div className="text show-more-height">
                        <p className="mb-0">
                          Name: {trainerData?.first_name} {trainerData?.last_name}
                        </p>
                        <p className="mb-4">
                          Experience: {trainerData?.experience} years of experience coaching
                          at various skill levels.
                        </p>
                        <p>
                          Credentials: Certified trainer with a deep
                          understanding of the sport&apos;s techniques and
                          strategies. Coaching Style: Patient and
                          detail-oriented approach, focusing on technique
                          refinement and strategic gameplay. Achievements:
                          Successfully guided players to notable achievements in
                          regional and national competitions. Passion: An avid
                          badminton enthusiast,{trainerData?.first_name} is
                          dedicated to nurturing talent and fostering a love for
                          the sport. Join
                          {trainerData?.first_name}’s coaching sessions to
                          enhance your skills and unleash your full
                          potential.
                        </p>
                      </div>
                      {/* <div className="show-more d align-items-center primary-text">
                        <i className="feather-plus-circle" />
                        Show More
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="lesson-with-me">
                  <h4
                    className="accordion-header"
                    id="panelsStayOpen-lesson-with-me"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Lesson With Me
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-lesson-with-me"
                  >
                    <div className="accordion-body">
                      <p>
                        Join me for personalized lessons tailored to your needs.
                        Choose from individual, 2-player, or group lessons for a
                        customized experience.Heighten your skills and
                        relish the process of getting better.
                      </p>
                      <ul className="clearfix">
                        <li>
                          <i className="feather-check-square" />
                          Single Lesson
                        </li>
                        <li>
                          <i className="feather-check-square" />2 Player Lesson
                        </li>
                        <li>
                          <i className="feather-check-square" />
                          Small Group Lesson
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="coaching">
                  <h4 className="accordion-header" id="panelsStayOpen-coaching">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Training
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-coaching"
                  >
                    <div className="accordion-body">
                      <p>
                        Experience transformative coaching tailored to your
                        needs. Whether individual, partner, or small group
                        sessions, unlock your potential with personalized
                        instruction for success.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-4" id="gallery">
                  <h4 className="accordion-header" id="panelsStayOpen-gallery">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseFive"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFive"
                    >
                      Gallery
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseFive"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-gallery"
                  >
                    <div className="accordion-body">
                      <div className="gallery-slider owl-theme">
                        <Slider {...featuredVenuesSlider}>
                        {trainerData?.gallery?.map((trainer:any, index:any) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                              <div className="featured-venues-item">
                                <div className="listing-item listing-item-grid">
                                  <div
                                    className="listing-img"
                                    style={{ height: "300px" }}
                                  >
                                    <Link to={routes.personalTrainingDetails}>
                                      <ImageWithBasePath
                                        src={
                                          trainer
                                            ? `${IMG_URL}${trainer.src}`  
                                            : 
                                            "assets/img/profiles/avatar-06.jpg"
                                        }
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="accordion-item mb-4" id="reviews">
                  <div className="accordion-header" id="panelsStayOpen-reviews">
                    <div
                      className="accordion-button d-flex justify-content-between align-items-center"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseSix"
                      aria-controls="panelsStayOpen-collapseSix"
                    >
                      <span className="w-75 mb-0">Reviews</span>
                    </div>
                    <Link
                      to="#;"
                      className="btn btn-gradient pull-right write-review add-review"
                      data-bs-toggle="modal"
                      data-bs-target="#add-review"
                    >
                      Write a review
                    </Link>
                  </div>
                  <div
                    id="panelsStayOpen-collapseSix"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-reviews"
                  >
                    <div className="accordion-body">
                      <div className="row review-wrapper">
                        <div className="col-lg-3">
                          <div className="ratings-info corner-radius-10 text-center">
                            <h3>4.8</h3>
                            <span>out of 5.0</span>
                            <div className="rating">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="recommended">
                            <h5>Recommended by 97% of Players</h5>
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <p className="mb-0">Quality of service</p>
                                <ul>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <i />
                                  </li>
                                  <li>
                                    <span>5.0</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="review-box d-md-flex">
                        <div className="review-profile">
                          <ImageWithBasePath
                            src="/assets/img/profiles/avatar-01.jpg"
                            className="img-fluid"
                            alt="User"
                          />
                        </div>
                        <div className="review-info">
                          <h6 className="mb-2 tittle">
                            Amanda Booked on 06/04/2023
                          </h6>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <span>5.0</span>
                          </div>
                          <span className="success-text">
                            <i className="feather-check" />
                            Yes, I would book again.
                          </span>
                          <h6>Absolutely Perfect</h6>
                          <p>
                            If you are looking for a perfect place for friendly
                            matches with your friends or a competitive match, It
                            is the best place.
                          </p>
                          <ul className="d-flex">
                            <Lightbox
                              open={open}
                              close={() => setOpen(false)}
                              slides={[
                                { src: "/assets/img/gallery/gallery-01.jpg" },
                                { src: "/assets/img/gallery/gallery-02.jpg" },
                                { src: "/assets/img/gallery/gallery-03.jpg" },
                                { src: "/assets/img/gallery/gallery-04.jpg" },
                                { src: "/assets/img/gallery/gallery-05.jpg" },
                              ]}
                            />
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-01.jpg"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="/assets/img/gallery/gallery-01.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-02.jpg"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="/assets/img/gallery/gallery-02.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-03.jpg"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="/assets/img/gallery/gallery-03.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-04.jpg"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="/assets/img/gallery/gallery-04.jpg"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="assets/img/gallery/gallery-thumb-05.jpg"
                                data-fancybox="gallery"
                                onClick={() => setOpen(true)}
                              >
                                <ImageWithBasePath
                                  className="img-fluid"
                                  alt="Image"
                                  src="/assets/img/gallery/gallery-05.jpg"
                                />
                              </Link>
                            </li>
                          </ul>
                          <span className="post-date">Sent on 11/03/2023</span>
                        </div>
                      </div>
                    
                      <div className="review-box d-md-flex">
                        <div className="review-profile">
                          <ImageWithBasePath
                            src="/assets/img/profiles/avatar-06.jpg"
                            className="img-fluid"
                            alt="User"
                          />
                        </div>
                        <div className="review-info">
                          <h6 className="mb-2 tittle">
                            Amanda Booked on 06/04/2023
                          </h6>
                          <div className="rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <span className="">5.0</span>
                          </div>
                          <span className="warning-text">
                            <i className="feather-x" />
                            No, I dont want to book again.
                          </span>
                          <h6>Awesome. Its very convenient to play.</h6>
                          <p>
                            If you are looking for a perfect place for friendly
                            matches with your friends or a competitive match, It
                            is the best place.
                          </p>
                          <div className="dull-bg">
                            <p>
                              Experience badminton excellence at Badminton
                              Academy. Top-notch facilities, well-maintained
                              courts, and a friendly atmosphere. Highly
                              recommended for an exceptional playing experience
                            </p>
                          </div>
                        </div>
                      </div>
                    
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-load-more d-flex justify-content-center align-items-center"
                        >
                          Load More
                          <i className="feather-plus-square" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="accordion-item mb-0" id="location">
                  <h4 className="accordion-header" id="panelsStayOpen-location">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseSeven"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseSeven"
                    >
                      Location
                    </button>
                  </h4>
                  <div
                    id="panelsStayOpen-collapseSeven"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-location"
                  >
                    <div className="accordion-body">
                      <div className="google-maps">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                          height={445}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <div className="dull-bg d-flex justify-content-start align-items-center mb-0">
                        <div className="white-bg me-2">
                          <i className="fas fa-location-arrow" />
                        </div>
                        <div className="">
                          <h6>Our Venue Location</h6>
                          <p>70 Bright St New York, USA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Accordian Contents */}
            </div>
            {/* ))} */}
            <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
              <div className="stickybar">
                <div className="white-bg book-coach">
                  <h4 className="border-bottom">Book A Trainer</h4>
                  <p>
                    <strong>{trainerData?.first_name}</strong> Available Now{" "}
                  </p>
                  <div className="dull-bg text-center">
                    <p className="mb-1">Start’s From</p>
                    <h4 className="d-inline-block primary-text mb-0">
                      ₹{trainerData?.price}
                    </h4>
                    <span>/hr</span>
                  </div>
                  <div className="d-grid btn-block mt-3">
                    <Link
                      to={`/personal-training/training-timedate/${id}`}
                      className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                    >
                      <i className="feather-calendar" />
                      Book Now
                    </Link>
                  </div>
                </div>
                {/* <div className="white-bg next-availability">
                  <div className="d-flex justify-content-start align-items-center">
                    <span className="icon-bg-40 d-flex justify-content-center align-items-center">
                      <ImageWithBasePath
                        className="img-fluid"
                        alt="Icon"
                        src="/assets/img/icons/head-calendar.svg"
                      />
                    </span>
                    <h4 className="mb-0">Next Availability</h4>
                  </div>
                  <ul className="clearfix">
                    <li>Thu, Sept 24 @ 3 PM</li>
                    <li>Fri, Sept 25 @ 3 PM</li>
                    <li>Sat, Sept 26 @ 3 PM</li>
                    <li>Sun, Sept 27 @ 3 PM</li>
                  </ul>
                </div> */}
                {/* <div className="white-bg">
                  <h4 className="border-bottom">Request for Availability</h4>
                  <form>
                    <div className="mb-10">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="mb-10">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="mb-10">
                      <label htmlFor="name" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phonenumber"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="mb-10">
                      <label htmlFor="court" className="form-label">
                        Court
                      </label>
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cityOptions}
                        optionLabel="name"
                        placeholder="Select City"
                        className="select city-select"
                      />
                    </div>
                    <div className="mb-10">
                      <label htmlFor="comments" className="form-label">
                        Details
                      </label>
                      <textarea
                        className="form-control"
                        id="comments"
                        rows={3}
                        placeholder="Enter Comments"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-check d-flex justify-content-start align-items-center policy">
                      <div className="d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue={true}
                          id="policy"
                          defaultChecked
                        />
                      </div>
                      <label className="form-check-label" htmlFor="policy">
                        By clicking &apos;Send Request&apos;, I agree to
                        KheloIndore Privacy Policy and Terms of Use
                      </label>
                    </div>
                    <div className="d-grid btn-block">
                      <Link
                        to="#"
                        className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                      >
                        Send Request
                        <i className="feather-arrow-right-circle ms-1" />
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="white-bg listing-owner">
                  <h4 className="border-bottom">Listing By Owner</h4>
                  <ul>
                    <li className="d-flex justify-content-start align-items-center">
                      <div className="">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            alt="Post"
                            src="/assets/img/listing-by-owner-01.jpg"
                          />
                        </Link>
                      </div>
                      <div className="owner-info">
                        <h5>
                          <Link to={routes.blogDetails}>
                            Manchester Academy
                          </Link>
                        </h5>
                        <p>
                          <i className="feather-map-pin" />
                          <span>Sacramento, CA</span>
                        </p>
                        <p className="mb-0">
                          <i className="feather-calendar" />
                          <span>Next availablity : </span>
                          <span className="primary-text">15 May 2023</span>
                        </p>
                      </div>
                    </li>
                    <li className="d-flex justify-content-start align-items-center">
                      <div className="">
                        <Link to={routes.blogDetails}>
                          <ImageWithBasePath
                            className="img-fluid"
                            alt="Post"
                            src="/assets/img/listing-by-owner-02.jpg"
                          />
                        </Link>
                      </div>
                      <div className="owner-info">
                        <h5>
                          <Link to={routes.blogDetails}>
                            Sarah Sports Academy
                          </Link>
                        </h5>
                        <p>
                          <i className="feather-map-pin" />
                          <span>Sacramento, CA</span>
                        </p>
                        <p className="mb-0">
                          <i className="feather-calendar" />
                          <span>Next availablity : </span>
                          <span className="primary-text">15 May 2023</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div> */}
                <div className="white-bg">
                  <h4 className="border-bottom">Share Venue</h4>
                  <ul className="social-medias d-flex">
                    <li className="facebook">
                      <Link to="#;">
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li className="instagram">
                      <Link to="#;">
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                    <li className="behance">
                      <Link to="#;">
                        <i className="fa-brands fa-behance" />
                      </Link>
                    </li>
                    <li className="twitter">
                      <Link to="#;">
                        <i className="fa-brands fa-twitter" />
                      </Link>
                    </li>
                    <li className="pinterest">
                      <Link to="#;">
                        <i className="fa-brands fa-pinterest" />
                      </Link>
                    </li>
                    <li className="linkedin">
                      <Link to="#;">
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
          {/* /Row */}
        </div>
        {/* /container */}
        {/* <section className="section innerpagebg">
          <div className="container">
            <div className="featured-slider-group">
              <h3 className="mb-40">Similar Coaches</h3>
              <div className="featured-venues-slider owl-theme">
                <Slider {...featuredVenuesSlider}>
                  {coaches.map((coach, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-05.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div
                              className="fav-item-venues"
                              onClick={() => handleItemClick(index)}
                            >
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[index] ? "selected" : ""
                                    }`}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                            <div className="hour-list">
                              <h5 className="tag tag-primary">
                                From $350 <span>/hr</span>
                              </h5>
                            </div>
                          </div>
                          <div className="listing-content">
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>
                                {coach.first_name} {coach.last_name}
                              </Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  {coach.location.city}, {coach.location.state}
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>{coach.bio}</p>
                              <p>
                                Specializations: {coach.specializations.join(", ")}
                              </p>
                            </div>
                            <div className="coach-btn">
                              <ul>
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-primary w-100"
                                  >
                                    <i className="feather-eye me-2" />
                                    View Profile
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" />
                                    Book Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="avalbity-review">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availability</h6>
                                      <h5>{coach.availability}</h5>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="list-reviews mb-0">
                                    <div className="d-flex align-items-center">
                                      <span className="rating-bg">4.5</span>
                                      <span>80 Reviews</span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default PersonalTrainingDetails;

// import React, { useState } from "react";
// import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { all_routes } from "../router/all_routes";

// const PersonalTrainingDetails = () => {
//   const routes = all_routes;
//   const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));
//   const handleItemClick = (index: number) => {
//     setSelectedItems((prevSelectedItems) => {
//       const updatedSelectedItems = [...prevSelectedItems];
//       updatedSelectedItems[index] = !updatedSelectedItems[index];
//       return updatedSelectedItems;
//     });
//   };

//   const featuredVenuesSlider = {
//     dots: false,
//     autoplay: false,
//     slidesToShow: 3,
//     margin: 20,
//     speed: 500,
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 776,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 567,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div>
//       {/* Breadcrumb */}
//       <div className="breadcrumb breadcrumb-list mb-0">
//         <span className="primary-right-round" />
//         <div className="container">
//           <h1 className="text-white">Blog Details</h1>
//           <ul>
//             <li>
//               <Link to={routes.home}>Home</Link>
//             </li>
//             <li>Blog Details</li>
//           </ul>
//         </div>
//       </div>
//       {/* /Breadcrumb */}
//       {/* Page Content */}
//       <div className="content blog-details">
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-12 col-md-8 col-lg-8">
//               {/* Blog */}
//               <div className="featured-venues-item">
//                 <div className="listing-item blog-info">
//                   <div className="listing-img">
//                     <Link to={routes.blogDetails}>
//                       <ImageWithBasePath
//                         src="assets/img/blog/blog-04.jpg"
//                         className="img-fluid"
//                         alt="Venue"
//                       />
//                     </Link>
//                     <div className="fav-item-venues news-sports">
//                       <span className="tag tag-blue">Badminton</span>
//                     </div>
//                   </div>
//                   <div className="listing-content news-content">
//                     <div className="listing-venue-owner blog-detail-owner d-lg-flex justify-content-between align-items-center">
//                       <div className="navigation">
//                         <Link to="#">
//                           <ImageWithBasePath
//                             src="assets/img/profiles/avatar-01.jpg"
//                             alt="User"
//                           />
//                           Orlando Waters
//                         </Link>
//                         <span>
//                           <i className="feather-calendar" />
//                           15 May 2023
//                         </span>
//                         <span>
//                           <i className="far fa-comment-alt" />
//                           30 Comments
//                         </span>
//                       </div>
//                       <Link className="btn btn-primary">
//                         <ImageWithBasePath
//                           src="assets/img/icons/grid.svg"
//                           className="img-fluid"
//                           alt="Icon"
//                         />
//                         Rules of Game
//                       </Link>
//                     </div>
//                     <h2 className="listing-title">
//                       <Link to="#">
//                         Mastering the Badminton Basics: A Guide for Beginners
//                       </Link>
//                     </h2>
//                     <p>
//                       There are many variations of passages of at Lorem Ipsum
//                       available but the majority suffered that dummy is
//                       alteration. There are many variations of passages of Lorem
//                       Ipsum available but the or majority have that suffered
//                       alteration words which don&apos;t look even slightly
//                       believable. There are many available but the majority the
//                       have suffered alteration. There are many variations of
//                       dummy passages Lorem majority the have the suffered
//                       alteration.
//                     </p>
//                     <p>
//                       There are many variations of passages of at Lorem Ipsum
//                       available but the majority the have too suffered
//                       alteration. There are many variations of passages of Lorem
//                       Ipsum available majority have that suffered alteration
//                       words which don&apos;t look even slightly believable.
//                       There are available but the majority the have suffered
//                       alteration.
//                     </p>
//                     <div className="gradient-bg d-flex justify-content-between align-items-center">
//                       <ImageWithBasePath
//                         src="assets/img/icons/comment-quotes.svg"
//                         className="img-fluid"
//                         alt="Icon"
//                       />
//                       <p className="mb-0">
//                         There are many variations of passages of at Lorem Ipsum
//                         available but the majority the have too suffered
//                         alteration. There are many variations of passages of
//                         Lorem Ipsum vailable majority have that suffered
//                         alteration words which don&apos;t look even slightly
//                         believable.
//                       </p>
//                     </div>
//                     <p>
//                       Lorem Ipsum available but the or majority have that
//                       suffered alteration words which don&apos;t look even
//                       slightly believable. There are many available but the
//                       majority the have suffered alteration. There are many
//                       variations of dumm passages Lorem majority the have the
//                       suffered alteration.
//                     </p>
//                     <div className="blog-images d-sm-flex align-items-center justify-content-start">
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/blog/blog-05.jpg"
//                           className="img-fluid"
//                           alt="Venue"
//                         />
//                       </Link>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/blog/blog-06.jpg"
//                           className="img-fluid"
//                           alt="Venue"
//                         />
//                       </Link>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/blog/blog-07.jpg"
//                           className="img-fluid"
//                           alt="Venue"
//                         />
//                       </Link>
//                     </div>
//                     <p>
//                       Lorem Ipsum available but the or majority have that
//                       suffered alteration words which don&apos;t look even
//                       slightly believable. There are many available but the
//                       majority the have suffered alteration. There are many
//                       variations of dummy passages Lorem majority the have the
//                       suffered alteration. There are many variations of passages
//                       of at Lorem Ipsum available but the majority suffered that
//                       dummy is alteration. There are many variations of passages
//                       of Lorem Ipsum available but the or majority have that
//                       suffered alteration words which don&apos;t look even
//                       slightly believable.
//                     </p>
//                     <ul className="text-list">
//                       <li>dummy passages Lorem majority</li>
//                       <li> Lorem Ipsum is not simply random text</li>
//                       <li>
//                         It has roots in a piece of classical Latin literature
//                       </li>
//                       <li>
//                         There are many variations of passages of Lorem Ipsum
//                       </li>
//                       <li>Various versions have evolved over the years</li>
//                     </ul>
//                     <p>
//                       Lorem Ipsum available but the or majority have that
//                       suffered alteration words which don&apos;t look even
//                       slightly believable. There are many available but the
//                       majority the have suffered alteration. There are many
//                       variations of dumm passages Lorem majority the have the
//                       suffered alteration.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="row align-items-center">
//                   <div className="col-12 col-sm-12 col-md-12 col-lg-6">
//                     <div className="d-flex align-items-center tags-wrapper">
//                       <h6>Tags:</h6>
//                       <ul className="tags clearfix">
//                         <li>
//                           <Link to="#" className="tag">
//                             Rackets
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="tag">
//                             New Game
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="tag">
//                             Dresses
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="col-12 col-sm-12 col-md-12 col-lg-6">
//                     <div className="d-flex justify-content-lg-end align-items-center social-medias-wrapper">
//                       <h6>Share on :</h6>
//                       <ul className="social-medias d-flex">
//                         <li className="facebook">
//                           <Link to="#;">
//                             <i className="fa-brands fa-facebook-f" />
//                           </Link>
//                         </li>
//                         <li className="linkedin">
//                           <Link to="#;">
//                             <i className="fa-brands fa-linkedin" />
//                           </Link>
//                         </li>
//                         <li className="instagram">
//                           <Link to="#;">
//                             <i className="fa-brands fa-instagram" />
//                           </Link>
//                         </li>
//                         <li className="twitter">
//                           <Link to="#;">
//                             <i className="fa-brands fa-twitter" />
//                           </Link>
//                         </li>
//                         <li className="pinterest">
//                           <Link to="#;">
//                             <i className="fa-brands fa-pinterest" />
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* /Blog */}
//               {/* Author Comments */}
//               <div className="blog-comments">
//                 <div className="dull-bg author-widget">
//                   <div className="author-group d-md-flex align-items-center justify-content-start">
//                     <div className="profile-pic">
//                       <Link to="#;" className="d-inline-block">
//                         <ImageWithBasePath
//                           src="assets/img/profiles/avatar-01.jpg"
//                           alt="User"
//                         />
//                       </Link>
//                     </div>
//                     <div className="info">
//                       <span>Author</span>
//                       <h5>Antony Hilfn</h5>
//                       <p>
//                         Lorem Ipsum available but the or majority have that
//                         suffered alteration words which don&apos;t look even
//                         slightly believable. There are many available but the
//                         majority the have suffered alteration. There are many
//                         variations of dumm passages Lorem majority the have the
//                         suffered alteration.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* /Author Comments */}
//               {/* Comments */}
//               <div className="blog-comments">
//                 <div className="dull-bg">
//                   <h4 className="mb-0">Comments (45)</h4>
//                   <hr />
//                   <ul>
//                     <li className="author-group d-md-flex align-items-center justify-content-start">
//                       <div className="profile-pic">
//                         <Link
//                           to="#;"
//                           className="d-inline-block"
//                         >
//                           <ImageWithBasePath
//                             src="assets/img/profiles/avatar-04.jpg"
//                             alt="User"
//                           />
//                         </Link>
//                       </div>
//                       <div className="info">
//                         <div className="head d-flex align-items-center justify-content-start">
//                           <h5>Antony Hilfn</h5>
//                           <i className="fa-solid fa-circle" />
//                           <span>15 Mar 2023</span>
//                         </div>
//                         <p>
//                           Lorem Ipsum available but the or majority have that
//                           suffered alteration words which don&apos;t look even
//                           slightly believable. There are many available but the
//                           majority the have suffered alteration. There are many
//                           variations of dumm passages Lorem majority the have
//                           the suffered alteration.
//                         </p>
//                         <Link to="#">Reply</Link>
//                       </div>
//                     </li>
//                     <li className="author-group d-md-flex align-items-center justify-content-start">
//                       <div className="profile-pic">
//                         <Link
//                           to="#;"
//                           className="d-inline-block"
//                         >
//                           <ImageWithBasePath
//                             src="assets/img/profiles/avatar-05.jpg"
//                             alt="User"
//                           />
//                         </Link>
//                       </div>
//                       <div className="info">
//                         <div className="head d-flex align-items-center justify-content-start">
//                           <h5>Besant</h5>
//                           <i className="fa-solid fa-circle" />
//                           <span>15 Mar 2023</span>
//                         </div>
//                         <p>
//                           Lorem Ipsum available but the or majority have that
//                           suffered alteration words which don&apos;t look even
//                           slightly believable. There are many available but the
//                           majority the have suffered alteration. There are many
//                           variations of dumm passages Lorem majority the have
//                           the suffered alteration.
//                         </p>
//                         <Link to="#">Reply</Link>
//                       </div>
//                     </li>
//                     <li className="author-group d-md-flex align-items-center justify-content-start">
//                       <div className="profile-pic">
//                         <Link
//                           to="#;"
//                           className="d-inline-block"
//                         >
//                           <ImageWithBasePath
//                             src="assets/img/profiles/avatar-06.jpg"
//                             alt="User"
//                           />
//                         </Link>
//                       </div>
//                       <div className="info">
//                         <div className="head d-flex align-items-center justify-content-start">
//                           <h5>Maria Fin</h5>
//                           <i className="fa-solid fa-circle" />
//                           <span>15 Mar 2023</span>
//                         </div>
//                         <p>
//                           Lorem Ipsum available but the or majority have that
//                           suffered alteration words which don&apos;t look even
//                           slightly believable. There are many available but the
//                           majority the have suffered alteration. There are many
//                           variations of dumm passages Lorem majority the have
//                           the suffered alteration.
//                         </p>
//                         <Link to="#">Reply</Link>
//                       </div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               {/* /Comments */}
//               <div className="card new-comment">
//                 <h4>Enter Details</h4>
//                 <form>
//                   <div className="mb-3">
//                     <label htmlFor="name" className="form-label">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="name"
//                       placeholder="Enter Name"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       placeholder="Enter Email Address"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="name" className="form-label">
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="phonenumber"
//                       placeholder="Enter Phone Number"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="comments" className="form-label">
//                       Details
//                     </label>
//                     <textarea
//                       className="form-control"
//                       id="comments"
//                       rows={3}
//                       placeholder="Enter Comments"
//                       defaultValue={""}
//                     />
//                   </div>
//                   <button type="button" className="btn btn-gradient">
//                     Write Review
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="col-sm-12 col-md-4 col-lg-4 blog-sidebar theiaStickySidebar">
//             <div className="stickybar">
//               <div className="card">
//                 <h4>Search</h4>
//                 <form className>
//                   <div className="blog-search">
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="search"
//                       placeholder="Enter Keyword"
//                     />
//                     <i className="feather-search" />
//                   </div>
//                 </form>
//               </div>
//               <div className="card">
//                 <h4>Latest Posts</h4>
//                 <ul className="latest-posts">
//                   <li>
//                     <div className="post-thumb">
//                       <Link to={routes.blogDetails}>
//                         <ImageWithBasePath
//                           className="img-fluid"
//                           src="assets/img/blog/latestpost-01.jpg"
//                           alt="Post"
//                         />
//                       </Link>
//                     </div>
//                     <div className="post-info">
//                       <p>Sarah</p>
//                       <h6>
//                         <Link to={routes.blogDetails}>
//                           These 15 Cabin Wedding Venues Have All the Rustic
//                           Vibes
//                         </Link>
//                       </h6>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="post-thumb">
//                       <Link to={routes.blogDetails}>
//                         <ImageWithBasePath
//                           className="img-fluid"
//                           src="assets/img/blog/latestpost-02.jpg"
//                           alt="Post"
//                         />
//                       </Link>
//                     </div>
//                     <div className="post-info">
//                       <p>Kim Forrest</p>
//                       <h6>
//                         <Link to={routes.blogDetails}>
//                           23 Super-Chic Blazer Dresses for Your Home Game
//                         </Link>
//                       </h6>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="post-thumb">
//                       <Link to={routes.blogDetails}>
//                         <ImageWithBasePath
//                           className="img-fluid"
//                           src="assets/img/blog/latestpost-03.jpg"
//                           alt="Post"
//                         />
//                       </Link>
//                     </div>
//                     <div className="post-info">
//                       <p>Jessica Estrada</p>
//                       <h6>
//                         <Link to={routes.blogDetails}>
//                           The Prettiest Floral Bats for a Rage Look
//                         </Link>
//                       </h6>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="post-thumb">
//                       <Link to={routes.blogDetails}>
//                         <ImageWithBasePath
//                           className="img-fluid"
//                           src="assets/img/blog/latestpost-04.jpg"
//                           alt="Post"
//                         />
//                       </Link>
//                     </div>
//                     <div className="post-info">
//                       <p>Naoimh</p>
//                       <h6>
//                         <Link to={routes.blogDetails}>
//                           31 Beautiful Courts Around the World
//                         </Link>
//                       </h6>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <div className="card">
//                 <h4>Categories</h4>
//                 <ul className="categories">
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         Rules in Game <span>(100)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         Badminton <span>(10)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         Bats <span>(20)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         New Game <span>(45)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         Event <span>(25)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         Rackets <span>(15)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                   <li>
//                     <h6>
//                       <Link to="#;">
//                         {" "}
//                         New Courts <span>(121)</span>
//                       </Link>
//                     </h6>
//                   </li>
//                 </ul>
//               </div>
//               <div className="card tags-card">
//                 <h4>Tags</h4>
//                 <ul className="tags clearfix">
//                   <li>
//                     <Link to="#" className="tag">
//                       Rackets
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="#" className="tag">
//                       New Game
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="#" className="tag">
//                       Dresses
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <section className="section dull-bg similar-list">
//           <div className="container">
//             <h2 className="text-center mb-40">Similar Listing</h2>
//             <div className="row">
//               <div className="featured-slider-group ">
//                 <div className="featured-venues-slider owl-theme">
//                   <Slider {...featuredVenuesSlider}>
//                     {/* Blog */}
//                     <div className="featured-venues-item">
//                       <div className="listing-item mb-0">
//                         <div className="listing-img">
//                           <Link to={routes.blogDetails}>
//                             <ImageWithBasePath
//                               src="assets/img/venues/venues-07.jpg"
//                               alt="Venue"
//                             />
//                           </Link>
//                           <div
//                             className="fav-item-venues news-sports"
//                             key={1}
//                             onClick={() => handleItemClick(1)}
//                           >
//                             <span className="tag tag-blue">Badminton</span>
//                             <div className="list-reviews coche-star">
//                               <Link
//                                 to="#"
//                                 className={`fav-icon ${selectedItems[1] ? "selected" : ""}`}
//                               >
//                                 <i className="feather-heart" />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="listing-content news-content">
//                           <div className="listing-venue-owner">
//                             <div className="navigation">
//                               <Link to="#">
//                                 <ImageWithBasePath
//                                   src="assets/img/profiles/avatar-01.jpg"
//                                   alt="User"
//                                 />
//                                 Orlando Waters
//                               </Link>
//                               <span>
//                                 <i className="feather-calendar" />
//                                 15 May 2023
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="listing-title">
//                             <Link to="#">
//                               A Great And Fun Activity For You And Your Entire
//                               Family
//                             </Link>
//                           </h3>
//                           <div className="listing-button read-new">
//                             <ul className="nav">
//                               <li>
//                                 <i className="feather-heart" />
//                                 45
//                               </li>
//                               <li>
//                                 <i className="feather-message-square" />
//                                 45
//                               </li>
//                             </ul>
//                             <span>
//                               <ImageWithBasePath
//                                 src="assets/img/icons/clock.svg"
//                                 alt="Icon"
//                               />
//                               10 Min To Read
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* /Blog */}
//                     {/* Blog */}
//                     <div className="featured-venues-item">
//                       <div className="listing-item mb-0">
//                         <div className="listing-img">
//                           <Link to={routes.blogDetails}>
//                             <ImageWithBasePath
//                               src="assets/img/venues/venues-08.jpg"
//                               alt="Venue"
//                             />
//                           </Link>
//                           <div
//                             className="fav-item-venues news-sports"
//                             key={2}
//                             onClick={() => handleItemClick(2)}
//                           >
//                             <span className="tag tag-blue">
//                               Sports Activites
//                             </span>
//                             <div className="list-reviews coche-star">
//                               <Link
//                                 to="#"
//                                 className={`fav-icon ${selectedItems[2] ? "selected" : ""}`}
//                               >
//                                 <i className="feather-heart" />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="listing-content news-content">
//                           <div className="listing-venue-owner">
//                             <div className="navigation">
//                               <Link to="#">
//                                 <ImageWithBasePath
//                                   src="assets/img/profiles/avatar-06.jpg"
//                                   alt="User"
//                                 />
//                                 Claire Nichols
//                               </Link>
//                               <span>
//                                 <i className="feather-calendar" />
//                                 16 Jun 2023
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="listing-title">
//                             <Link to="#">
//                               Sports Make Us A Lot Stronger And Healthier Than
//                               We Think
//                             </Link>
//                           </h3>
//                           <div className="listing-button read-new">
//                             <ul className="nav">
//                               <li>
//                                 <i className="feather-heart" />
//                                 35
//                               </li>
//                               <li>
//                                 <i className="feather-message-square" />
//                                 35
//                               </li>
//                             </ul>
//                             <span>
//                               <ImageWithBasePath
//                                 src="assets/img/icons/clock.svg"
//                                 alt="Icon"
//                               />
//                               12 Min To Read
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* /Blog */}
//                     {/* Blog */}
//                     <div className="featured-venues-item">
//                       <div className="listing-item mb-0">
//                         <div className="listing-img">
//                           <Link to={routes.blogDetails}>
//                             <ImageWithBasePath
//                               src="assets/img/venues/venues-09.jpg"
//                               alt="Venue"
//                             />
//                           </Link>
//                           <div
//                             className="fav-item-venues news-sports"
//                             key={3}
//                             onClick={() => handleItemClick(3)}
//                           >
//                             <span className="tag tag-blue">Rules of Game</span>
//                             <div className="list-reviews coche-star">
//                               <Link
//                                 to="#"
//                                 className={`fav-icon ${selectedItems[3] ? "selected" : ""}`}
//                               >
//                                 <i className="feather-heart" />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="listing-content news-content">
//                           <div className="listing-venue-owner">
//                             <div className="navigation">
//                               <Link to="#">
//                                 <ImageWithBasePath
//                                   src="assets/img/profiles/avatar-06.jpg"
//                                   alt="User"
//                                 />
//                                 Joanna Le
//                               </Link>
//                               <span>
//                                 <i className="feather-calendar" />
//                                 11 May 2023
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="listing-title">
//                             <Link to="#">
//                               We Organize Events &amp; Parties in our Club
//                             </Link>
//                           </h3>
//                           <div className="listing-button read-new">
//                             <ul className="nav">
//                               <li>
//                                 <i className="feather-heart" />
//                                 25
//                               </li>
//                               <li>
//                                 <i className="feather-message-square" />
//                                 25
//                               </li>
//                             </ul>
//                             <span>
//                               <ImageWithBasePath
//                                 src="assets/img/icons/clock.svg"
//                                 alt="Icon"
//                               />
//                               14 Min To Read
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* /Blog */}
//                     {/* Blog */}
//                     <div className="featured-venues-item">
//                       <div className="listing-item mb-0">
//                         <div className="listing-img">
//                           <Link to={routes.blogDetails}>
//                             <ImageWithBasePath
//                               src="assets/img/venues/venues-08.jpg"
//                               alt="Venue"
//                             />
//                           </Link>
//                           <div
//                             className="fav-item-venues news-sports"
//                             key={4}
//                             onClick={() => handleItemClick(4)}
//                           >
//                             <span className="tag tag-blue">
//                               Sports Activites
//                             </span>
//                             <div className="list-reviews coche-star">
//                               <Link
//                                 to="#"
//                                 className={`fav-icon ${selectedItems[4] ? "selected" : ""}`}
//                               >
//                                 <i className="feather-heart" />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="listing-content news-content">
//                           <div className="listing-venue-owner">
//                             <div className="navigation">
//                               <Link to="#">
//                                 <ImageWithBasePath
//                                   src="assets/img/profiles/avatar-01.jpg"
//                                   alt="User"
//                                 />
//                                 Mart Sublin
//                               </Link>
//                               <span>
//                                 <i className="feather-calendar" />
//                                 12 May 2023
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="listing-title">
//                             <Link to="#">
//                               Sports Make Us A Lot Stronger And Healthier Than
//                               We Think
//                             </Link>
//                           </h3>
//                           <div className="listing-button read-new">
//                             <ul className="nav">
//                               <li>
//                                 <i className="feather-heart" />
//                                 35
//                               </li>
//                               <li>
//                                 <i className="feather-message-square" />
//                                 35
//                               </li>
//                             </ul>
//                             <span>
//                               <ImageWithBasePath
//                                 src="assets/img/icons/clock.svg"
//                                 alt="Icon"
//                               />
//                               12 Min To Read
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* /Blog */}
//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       {/* /Page Content */}
//     </div>
//   );
// };

// export default PersonalTrainingDetails;
