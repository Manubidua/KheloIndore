import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import axios from "axios";
import { API_URL, IMG_URL } from "../../ApiUrl";

const BlogDetailsSidebarLeft = () => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));
  const [blog_data, setBlog_data] = useState([]);

  const [blogDetails,setBlogDetails] = useState([])


  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

   const blogId = useParams()

  useEffect(() => {
    // Fetch event data from API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/getBlogById?id=${blogId?.id}`);
        if(response.data.success){
          const data = response.data.data;
          data.blog_image = `${IMG_URL}${data.blog_image}`;
          setBlogDetails(data)
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log(blogDetails)

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
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Blog Details</h1>
          <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>Blog Details</li>
          </ul>
        </div>
      </div>

      <div className="content">
        <section className="detail-info">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 offset-md-1 col-md-10 col-lg-10">
                <div className="wrapper">
                  <div className="banner">
                    {/* <div className="text-center">
                        <ImageWithBasePath
                          src="assets/img/events/banner-01.jpg"
                          className="img-fluid"
                          alt="Banner"
                        />
                      </div> */}
                    {/* <div className="white-bg info d-lg-flex justify-content-between align-items-center">
                        <div className="description">
                          <h6>{"eventData?.event_name"}</h6>
                        </div>
                        <div className="d-flex align-items-center time">
                          <i className="feather-clock d-flex justify-content-center align-items-center" />
                          <div className="text">
                            <h6>
                              {eventData?.start_date} <br /> To{" "}
                              {eventData?.end_date}
                               {new Date(eventData?.start_date).toLocaleDateString("en-IN")} <br/> To{" "} <br/>
                               {new Date(eventData?.end_date).toLocaleDateString("en-IN")}{" "}
                            </h6>
                            <span>08:00 AM</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center address">
                          <i className="feather-map-pin d-flex justify-content-center align-items-center" />
                          <div className="text">
                            <h6>
                              66 Broklyn Golden Street <br /> New York, USA
                              {eventData?.location}
                            </h6>
                          </div>
                        </div>
                      </div> */}
                  </div>
                  <div className="seat-booking">
                    
                      <div className="row" key={blogDetails._id} >
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                          <h1>{blogDetails.blog_title}</h1>
                          <p>{blogDetails.blog_description}</p>
                          
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                       
                          <div>
                            <img src={blogDetails.blog_image} alt="blog-image" className="blog-img" />
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CREATED AT BOX */} 
            {/* <div className="created-at">
              <p>Created at: {blogDetails.created_at}</p>
            </div> */}
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default BlogDetailsSidebarLeft;
