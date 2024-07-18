import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import "./finalhome.css";
import Services from "../Services/Services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ServiceSwiper from "../ServiceSwiper/ServiceSwiper";

const Finalhome = () => {
  const [search, setSearch] = useState("");
  const services = [
    {
      name: "Service 1",
      description: "Description for service 1",
      image: "url-to-service-1-image.jpg",
    },
    {
      name: "Service 2",
      description: "Description for service 2",
      image: "url-to-service-2-image.jpg",
    },
    // Add more services as needed
  ];
  const handleSearch = () => {
    return <Services search={search} />;
  };
  return (
    <>
      <Topbar />
      <div className="bg-filler py-5 finalhomehero">
        <div className="container">
          <div className="row align-items-center herodiv">
            <div className="col">
              <img
                src="images/homeimg.png"
                alt="Professional Services"
                className="img-fluid hero-img"
              />
            </div>
          </div>
          <div className="container mt-5">
            <div className="row rowtext">
              <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                <div className="flex-grow-1 me-2">
                  <input
                    type="search"
                    className="form-control  search-input"
                    placeholder="Enter Service Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="btn inputheight"
                    style={{ background: "#5B549E", color: "white" }}
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <div className="input-container location-input">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <input
                    type="search"
                    className="form-control "
                    placeholder="Enter Your Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ServiceSwiper services={services} />
      <Services search={search} />
    </>
  );
};

export default Finalhome;
