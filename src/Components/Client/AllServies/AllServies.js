import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AllServies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";

const AllServies = () => {
  return (
    <>
      <Container fluid>
        <Container className="py-5 farme-container">
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12} className="farme">
                  <Row>
                    <div>
                      <img
                        src="images/groupImages.png"
                        alt="groupimg"
                        className="groupimg"
                      />
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <div>
                <div className="catogarysection">
                  <span className="mb-3">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#5B549E" }}
                    />{" "}
                    4.8 Service Rating
                  </span>
                  <div className="justify-content-end">
                    <span>
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ color: "#5B549E" }}
                      />{" "}
                      5M+ Customers Globally
                    </span>
                  </div>
                </div>
                <div className="ineerdiv">
                  <h5
                    style={{ fontWeight: "bold", fontSize: "25px" }}
                    className="mb-3"
                  >
                    What are you looking for?
                  </h5>
                  <Row>
                    <Col xs={12} md={4} className="mb-4">
                      <div className="category-card">
                        <img
                          className="category-card-img-top"
                          src="images/1678864013225-bfc1de.jpeg.svg"
                          alt="Women's Salon"
                        />
                        <div className="card-body mt-3">
                          <h5 className="cardhedings">Women's Salon</h5>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                      <div className="category-card">
                        <img
                          className="category-card-img-top"
                          src="images/img-1.svg"
                          alt="Men's Salon & Massage"
                        />
                        <div className="card-body mt-3">
                          <h5 className="cardhedings">Men's Salon & Massage</h5>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                      <div className="category-card">
                        <img
                          className="category-card-img-top"
                          src="images/img.svg"
                          alt="AC & Appliance Repair"
                        />
                        <div className="card-body mt-3">
                          <h5 className="cardhedings">AC & Appliance Repair</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} className="mb-4">
                      <div className="card d-flex flex-row align-items-center h-100">
                        <div className="card-body">
                          <h5 className="cardhedings">
                            Electrician, Plumber & Carpenter
                          </h5>
                        </div>
                        <img
                          className="category-card-img-top"
                          src="images/1658402794135-faf080.png.svg"
                          alt="Drill Machine"
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={6} className="mb-4">
                      <div className="card d-flex flex-row align-items-center h-100">
                        <div className="card-body">
                          <h5 className="cardhedings">Native Water Purifier</h5>
                        </div>
                        <img
                          className="category-card-img-top"
                          src="images/img 3.svg"
                          alt="Water Purifier"
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} className="mb-4">
                      <div className="card d-flex flex-row align-items-center h-100">
                        <div className="card-body">
                          <h5 className="cardhedings">
                            Cleaning & Pest Control
                          </h5>
                        </div>
                        <img
                          className="category-card-img-top"
                          src="images/im0g.svg"
                          alt="Cleaning"
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={6} className="mb-4">
                      <div className="card d-flex flex-row align-items-center h-100">
                        <div className="card-body">
                          <h5 className="cardhedings">
                            Painting & Waterproofing
                          </h5>
                        </div>
                        <img
                          className="category-card-img-top"
                          src="images/1658402794135-faf080.RTHRTJHNKpng.svg"
                          alt="Painting"
                          style={{ width: "50%", height: "auto" }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <h5 style={{ fontWeight: "bold", fontSize: "25px" }}>
                    Services at your doorstep
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AllServies;
