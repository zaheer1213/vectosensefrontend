import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Packageselection from "../Packageselection/Packageselection";
import "./Features.css"; // Import your custom CSS file

const Features = () => {
  return (
    <>
      <Container fluid className="maindiv">
        <Container className="inner-container" fluid>
          <Row>
            <Col lg={4} md={12} className="mb-4">
              <div className="ourfeatures">
                <h2>Our Powerful </h2>
                <h2 style={{ marginTop: "-15px" }}>Features</h2>
                <p className="paragraph">
                  include advanced scheduling to streamline bookings, a client
                  management system to enhance satisfaction, seamless
                  communication channels, secure payment solutions,
                  comprehensive marketing tools, and powerful analytics to drive
                  growth and efficiency.
                </p>
              </div>
            </Col>
            <Col lg={4} md={12} className="text-center mb-4 ourtext">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="images/Our Features.png"
                  className="featureimg"
                  alt="Our Features"
                />
              </div>
            </Col>
            <Col lg={4} md={12}>
              <Row className="justify-content-center">
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img src="images/Scheduling.png" alt="Scheduling" />
                      <p className="img-text">Scheduling</p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img
                        src="images/Client Management.png"
                        alt="Client Management"
                      />
                      <p className="img-text">Client Management</p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img src="images/Communication.png" alt="Communication" />
                      <p className="img-text">Communication</p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img
                        src="images/Payment Solutions.png"
                        alt="Payment Solutions"
                      />
                      <p className="img-text">Payment Solutions</p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img src="images/Marketing.png" alt="Marketing" />
                      <p className="img-text">Marketing</p>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={4} className="mb-3">
                  <div className="featurescard text-center">
                    <div className="featuresimg">
                      <img
                        src="images/Business Intelligence.png"
                        alt="Analytics"
                      />
                      <p className="img-text">Business Intelligence</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Packageselection />
    </>
  );
};

export default Features;
