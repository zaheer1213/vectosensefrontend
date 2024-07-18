import React from "react";
import "./Home.css";
import Topbar from "../Topbar/Topbar";
import Services from "../Services/Services";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="container mt-5">
        <div className="row">
          {/* Column 1: Image */}
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/641x641.png"
              alt="Placeholder Image"
              className="img-fluid"
              style={{ height: "541px", width: "541px" }}
            />
          </div>

          {/* Column 2: Heading, Text, and Search Box */}
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h1 className="mb-4 firstheding">
                Your One-Stop Solution for All Professional Services
              </h1>
              <p className="paragraph">
                Connect with trusted professionals for all your home and
                personal needs.
              </p>
              <div className="input-group mb-3">
                <input
                  type="search"
                  className="form-control customeinput"
                  placeholder="Enter email to get started..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <button
                  className="btn"
                  style={{ background: "#5B549E", color: "white" }}
                  type="button"
                >
                  Get Started Free
                </button>
              </div>
              <div className="d-flex justify-content-between flex-wrap">
                <div className="text-center mb-3">
                  <span className="count">5910+</span>
                  <p>Customers are using & it’s growing everyday</p>
                </div>
                <div className="text-center mb-3">
                  <span className="count">240+</span>
                  <p>UI blocks that help you to build rapid websites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
    </>
  );
};

export default Home;
