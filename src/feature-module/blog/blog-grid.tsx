import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import axios from "axios";
import { API_URL, IMG_URL } from "../../ApiUrl";

const BlogGrid = () => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch event data from API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/getAllActiveBlog`);
        const eventData = response.data.data;
        console.log(eventData,"eventData-=-=eventData")
        const mappedData = eventData.map((event: any) => ({
          id: event._id,
          title: event.blog_title,
          picture: `${IMG_URL}${event.blog_image}`,
        }));
        setEvents(mappedData);
        console.log(mappedData, "maooed data");
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  return (
    <div>
      <>
        <>
          {/* Breadcrumb */}
          <div className="breadcrumb breadcrumb-list mb-0">
            <span className="primary-right-round" />
            <div className="container">
              <h1 className="text-white">Blog</h1> 
              <ul>
                <li>
                  <Link to={routes.home}>Home</Link>
                </li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          {/* /Breadcrumb */}
          {/* Page Content */}
          <div className="content blog-grid">
            <div className="container">
              <div className="row">
                
                {
                  events.map((event:any, index) => (
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={event.id}>
                  <div className="featured-venues-item">
                    <div className="listing-item">
                      <div className="listing-img">
                        <Link to={`/blog/blog-details-sidebar-left/${event.id}`}>
                          <ImageWithBasePath
                            src={event.picture}
                            className="img-fluid blog-images"
                            alt="Venue"
                          />
                        </Link>
                     
                      </div>
                      <div className="listing-content news-content">
                        
                        <h3 className="listing-title blog-title text-center">
                          <Link to={`/blog/blog-details-sidebar-left/${event.id}`}>
                           {event.title}
                          </Link>
                        </h3>
                        
                      </div>
                    </div>
                  </div>
                  {/* /Blog */}
                </div>))}

             
              </div>
              {/*Pagination*/}
              {/* <div className="blog-pagination">
                <nav>
                  <ul className="pagination justify-content-center pagination-center">
                    <li className="page-item previtem">
                      <Link className="page-link" to="#">
                        <i className="feather-chevrons-left" />
                      </Link>
                    </li>
                    <li className="page-item previtem">
                      <Link className="page-link" to="#">
                        <i className="feather-chevron-left" />
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link active" to="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item nextlink">
                      <Link className="page-link" to="#">
                        {" "}
                        <i className="feather-chevron-right" />
                      </Link>
                    </li>
                    <li className="page-item nextlink">
                      <Link className="page-link" to="#">
                        {" "}
                        <i className="feather-chevrons-right" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div> */}
              {/*Pagination*/}
            </div>
          </div>
          {/* /Page Content */}
        </>
      </>
    </div>
  );
};

export default BlogGrid;
