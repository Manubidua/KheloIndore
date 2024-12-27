import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import axios from "axios";
import { API_URL, IMG_URL } from "../../ApiUrl";
// import data from '../../../public/assets/img/featured'
interface Location {
  address: string;
  city: string;
  state: string;
  zipcode: number;
}

interface Coach {
  first_name: string;
  last_name: string;
  location: Location;
  experience: string;
  availability: string;
  specializations: string[];
  bio: string;
  _id: number;
  price: number;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  profile_picture: any;
  src: string;
  orgname: string;
  // profile:string;
  category: string;
  near_by_location: string;
  age: number;
}
interface FilterData {
  first_name: string;
  last_name: string;
  location: Location;
  experience: string;
  availability: string;
  specializations: string[];
  bio: string;
  _id: number;
  price: number;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  profile_picture: any;
  src: string;
  orgname: string;
  // profile:string;
  category: string;
  near_by_location: string;
  age: number;
}

interface SortCriteria {
  name: string;
  // other properties if needed
}


const CoachesGrid = (props: { id: any }) => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(9).fill(false));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortCriteria>();

  const [name, setName] = useState<FilterData[]>([]);
  const [locationName, setLocationName] = useState<FilterData[]>([]);
  const [location, setLocation] = useState<string | null>(null);

  const [coachPrice, setCoachPrice] = useState<FilterData[]>([]);
  const [coachCategogy, setCoachCategory] = useState<FilterData[]>([]);
  const [coachByLocation, setCoachByLocation] = useState<FilterData[]>([]);
  const [finalFilterCoach, setFinalFilterCoach] = useState<FilterData[]>([]);


  const { id } = props;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const locationByHome = useLocation();
  const { selectedLocationSort } = locationByHome.state || {};

  useEffect(() => {
    setLocation(selectedLocationSort?.name)
  }, [coaches])



  useEffect(() => {
    // Fetch coach data from API
    const fetchCoaches = async () => {
      try {
        const response = await axios.get(`${API_URL}/web/fetch-all-coaches`);
        const coachData = response.data.data;
        const mappedData = coachData.map((coach: any) => ({
          first_name: coach.first_name,
          last_name: coach.last_name,
          location: coach.location,
          experience: coach.experience,
          availability: coach.availability,
          specializations: coach.specializations,
          bio: coach.bio,
          _id: coach._id,
          price: coach.price,
          profile_picture: coach.profile_picture,
          category: coach.category,
          near_by_location: coach.near_by_location,
        }));
        setCoaches(mappedData);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {

    const areaMap = coaches.map((t: any) => ({
      name: t.category
    }))

    const allNames = areaMap.flatMap(item => item.name);
    const updatedNames = allNames
      .filter((item, index) => allNames.indexOf(item) === index)
      .filter((item) => item !== undefined);
    setName(updatedNames);
  }, [coaches]);

  useEffect(() => {

    const areaMap = coaches.map((t: any) => ({
      name: t.near_by_location
    }))

    const allNames = areaMap.flatMap(item => item.name);
    const updatedNames = allNames
      .filter((item, index) => allNames.indexOf(item) === index)
      .filter((item) => item !== undefined)
    setLocationName(updatedNames);
  }, [coaches]);




  useEffect(() => {
    if (location) {
      const filteredData = coaches.filter((t: any) => t.near_by_location?.includes(location));
      setCoachByLocation(filteredData);
      setFinalFilterCoach(filteredData);
    }
  }, [location,coaches])

  useEffect(() => {

    if (selectedCategory) {
      if (selectedSort) {
        const filteredData = coachPrice.filter((t: any) => t.category?.includes(selectedCategory));
        // setFilterCoaches(filteredData);
        setFinalFilterCoach(filteredData);
      } else {
        const filteredData = coaches.filter((t: any) => t.category?.includes(selectedCategory));
        setCoachCategory(filteredData);
        setFinalFilterCoach(filteredData);
      }
    }

    if (selectedCategory) {
      const filteredData = coaches.filter((t: any) => t.category?.includes(selectedCategory));
      setCoachCategory(filteredData);
      setFinalFilterCoach(filteredData);
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSort) {
      if (selectedCategory) {
        if (selectedSort.name === "low price") {
          const filterData = coachCategogy.filter((trainer: any) => trainer.price <= 50)
          // setCoachPrice(filterData);
          setFinalFilterCoach(filterData);
        } else {
          const filterData = coachCategogy.filter((trainer: any) => trainer.price > 50)
          // setCoachPrice(filterData);
          setFinalFilterCoach(filterData);
        }
      } else {
        if (selectedSort.name === "low price") {
          const filterData = coaches.filter((trainer: any) => trainer.price <= 50)
          setCoachPrice(filterData);
          setFinalFilterCoach(filterData);
        } else {
          const filterData = coaches.filter((trainer: any) => trainer.price > 50)
          setCoachPrice(filterData);
          setFinalFilterCoach(filterData);
        }
      }
    }
  }, [selectedSort]);


  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const sortOptions = [{ name: "low price" }, { name: "high price" }];
  // const locationOptions = [];


  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Coaches</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Coaches</li>
          </ul>
        </div>

      </section>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sortby-section">
                <div className="sorting-info">
                  <div className="row d-flex align-items-center">
                    <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                      <div className="count-search">
                        <p>
                          <span>
                            {selectedCategory || selectedSort || location ? finalFilterCoach.length : coaches.length}
                          </span> Coach are listed
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                      <div className="sortby-filter-group">
                        <div className="grid-listview">
                          <ul className="nav">
                            {/* <li>
                              <span>View as</span>
                            </li> */}
                            {/* <li>
                              <Link to={routes.coachesGrid} className="active">
                                <ImageWithBasePath
                                  src="assets/img/icons/sort-01.svg"
                                  alt="Icon"
                                />
                              </Link>
                            </li> */}
                            {/* <li>
                              <Link to={routes.coachesList}>
                                <ImageWithBasePath
                                  src="assets/img/icons/sort-02.svg"
                                  alt="Icon"
                                />
                              </Link>
                            </li> */}
                            <li>
                              {/* <Link to={routes.coachesMap}>
                                <ImageWithBasePath
                                  src="assets/img/icons/sort-03.svg"
                                  alt="Icon"
                                />
                              </Link> */}

                              <div className="sorting-select">
                                <Dropdown
                                  // value={selectedCategory}
                                  onChange={(e) => setLocation(e.value)}
                                  options={locationName.map((coach, index) => ({
                                    value: coach,
                                    label: coach
                                  }))}
                                  placeholder={<span><ImageWithBasePath
                                    src="assets/img/icons/sort-03.svg"
                                    alt="Icon"
                                  /></span>}
                                  className="select custom-select-list w-100"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="sortbyset">
                          {/* <span className="sortbytitle">Sort By</span> */}
                          <div className="sorting-select">
                            <Dropdown
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.value)}
                              // options={categoryOptions}
                              options={name.map((coach, index) => ({
                                value: coach,
                                label: coach
                              }))}
                              // optionLabel="name"
                              placeholder="category"
                              className="select custom-select-list w-100"
                            />
                          </div>

                          <div className="sorting-select">
                            <Dropdown
                              value={selectedSort}
                              onChange={(e) => setSelectedSort(e.value)}
                              options={sortOptions}
                              optionLabel="name"
                              placeholder="Price"
                              className="select custom-select-list w-100"
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="row justify-content-center">
            {selectedCategory || selectedSort || location ?
              finalFilterCoach.map((coach, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="featured-venues-item">
                    <div className="listing-item listing-item-grid">
                      <div className="listing-img" style={{ height: "316px" }}>
                        {/* <Link to={routes.coachDetail}>
                      <ImageWithBasePath
                        src={`assets/img/featured/${coach.profile}`}
                        alt="Venue"
                      />
                    </Link> */}

                        <Link to={`/coaches/${coach.category.replace(/\s+/g, '-').toLowerCase()}/${coach.first_name.replace(/\s+/g, '-').toLowerCase()}/${coach._id}`}>
                          <ImageWithBasePath
                            src={
                              coach.profile_picture[0]?.src
                                ? `${IMG_URL}${coach.profile_picture[0]?.src}`
                                :
                                "assets/img/no-img.png"
                            }

                            alt="user"
                          />
                        </Link>
                        <>
                          {" "}
                        </>
                        <div
                          className="fav-item-venues"
                          onClick={() => handleItemClick(index)}
                        >
                          <span className="tag tag-blue">{coach.category}</span>
                          {/* <div className="list-reviews coche-star">
                            <Link
                              to="#"
                              className={`fav-icon ${selectedItems[index] ? "selected" : ""
                                }`}
                            >
                              <i className="feather-heart" />
                            </Link>
                          </div> */}
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From ₹{coach.price} <span>/month</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <h3 className="listing-title">
                          <Link to={`/coaches/${coach.category.replace(/\s+/g, '-').toLowerCase()}/${coach.first_name.replace(/\s+/g, '-').toLowerCase()}/${coach._id}`}>
                            {coach.first_name} {coach.last_name}
                          </Link>
                        </h3>
                        <ul className="mb-2">
                          <li>
                            <span>
                              <i className="feather-map-pin me-2" />
                              {/* {coach.location?.address},{coach.location?.city},{" "}
                                {coach.location?.state}.{coach.location?.zipcode} */}
                              {coach.near_by_location}
                            </span>
                          </li>
                        </ul>
                        <div className="listing-details-group">
                          {/* <p>{coach.bio}</p> */}
                          <p>
                            Specializations: {coach.specializations.join(", ")}
                          </p>
                        </div>
                        <div className="coach-btn">
                          <ul>
                            <li>
                              <Link
                                // to={
                                //   routes.coachDetail
                                // }
                                to={`/coaches/${coach.category.replace(/\s+/g, '-').toLowerCase()}/${coach.first_name.replace(/\s+/g, '-').toLowerCase()}/${coach._id}`}
                                className="btn btn-primary w-100"
                              >
                                <i className="feather-eye me-2" />
                                View Profile
                              </Link>
                            </li>
                            <li>
                              <Link to={`/coaches/coach-timedate/${coach._id}`} className="btn btn-secondary w-100">
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
              ))
              :
              coaches.map((coach, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="featured-venues-item">
                    <div className="listing-item listing-item-grid">
                      <div className="listing-img" style={{ height: "316px" }}>
                        {/* <Link to={routes.coachDetail}>
                        <ImageWithBasePath
                          src={`assets/img/featured/${coach.profile}`}
                          alt="Venue"
                        />
                      </Link> */}

                        <Link to={`/coaches/${coach?.category?.replace(/\s+/g, '-').toLowerCase()}/${coach?.first_name?.replace(/\s+/g, '-').toLowerCase()}/${coach?._id}`}>

                          <ImageWithBasePath
                            // src="assets/img/featured/featured-05.jpg"
                            src={
                              coach.profile_picture[0]?.src
                                ? `${IMG_URL}${coach.profile_picture[0]?.src}`
                                :
                                "/assets/img/no-img.png"
                            }

                            alt="user"
                          />
                        </Link>
                        <div
                          className="fav-item-venues"
                          onClick={() => handleItemClick(index)}
                        >
                          <span className="tag tag-blue">{coach.category}</span>
                          {/* <div className="list-reviews coche-star">
                            <Link
                              to="#"
                              className={`fav-icon ${selectedItems[index] ? "selected" : ""
                                }`}
                            >
                              <i className="feather-heart" />
                            </Link>
                          </div> */}
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From ₹{coach.price} <span>/month</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <h3 className="listing-title">
                          <Link to={`/coaches/${coach?.category?.replace(/\s+/g, '-').toLowerCase()}/${coach?.first_name?.replace(/\s+/g, '-').toLowerCase()}/${coach?._id}`}>
                            {coach?.first_name} {coach?.last_name}
                          </Link>
                        </h3>
                        <ul className="mb-2">
                          <li>
                            <span>
                              <i className="feather-map-pin me-2" />
                              {coach?.near_by_location}


                            </span>
                          </li>
                        </ul>
                        <div className="listing-details-group">
                          {/* <p>{coach.bio}</p> */}
                          <p>
                            Specializations: {coach.specializations.join(", ")}
                          </p>
                        </div>
                        <div className="coach-btn">
                          <ul>
                            <li>
                              <Link
                                // to={
                                //   routes.coachDetail
                                // }
                                to={`/coaches/${coach?.category?.replace(/\s+/g, '-').toLowerCase()}/${coach?.first_name?.replace(/\s+/g, '-').toLowerCase()}/${coach?._id}`}
                                className="btn btn-primary w-100"
                              >
                                <i className="feather-eye me-2" />
                                View Profile
                              </Link>
                            </li>
                            <li>
                              <Link to={`/coaches/coach-timedate/${coach?._id}`} className="btn btn-secondary w-100">
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
          </div>
          <div className="col-12 text-center mt-3">
            <Link to="#" className="btn btn-load">
              Load More Coaches{" "}
              <ImageWithBasePath
                src="assets/img/icons/u_plus-square.svg"
                className="ms-2"
                alt="Icon"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default CoachesGrid;
