import {
  faCalendarDays,
  faGift,
  faGlobe,
  faLock,
  faMedal,
  faToolbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Count from "../CountUpAnimation/Count";

function Information() {
  return (
    <>
      <Container fluid className="py-5">
        <Container>
          <div className="abouttext" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <h1 className="about-heading ">Our</h1>
            <h2 className="about-subheading ">Services</h2>
          </div>
          <Row className="justify-content-start py-3 mt-5">
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <div className="service-item">
                  <div className="icon-heading">
                    <FontAwesomeIcon
                      icon={faGlobe}
                      style={{ fontSize: "25px", color: "#5B549E" }}
                    />
                    &nbsp;&nbsp;
                    <h3 className="mt-2">
                      Comprehensive Services Tailored to Your Needs
                    </h3>
                  </div>
                  <p className="paragraph">
                    At Vecto Sense, we pride ourselves on offering a wide range
                    of services designed to meet the diverse needs of our
                    clients. Whether you’re looking for top-notch home
                    maintenance, personalized gym and fitness programs, or any
                    other specialized service.
                    {/* , we’ve got you covered. Explore
                    our full range of services to see how we can help you
                    achieve your goals and improve your daily life. */}
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <div className="service-item">
                  <div className="icon-heading">
                    <FontAwesomeIcon
                      icon={faGift}
                      style={{ fontSize: "25px", color: "#5B549E" }}
                    />
                    &nbsp;&nbsp;
                    <h3 className="mt-2">Diverse Service Offerings</h3>
                  </div>
                  <p className="paragraph">
                    From cleaning and maintenance to renovations and repairs, we
                    offer a full suite of home services designed to keep your
                    living space comfortable and functional. Our personalized
                    gym services include fitness training, wellness programs,
                    and access to state-of-the-art equipment, helping you
                    achieve your health and fitness goals.
                    {/*  We provide a variety
                    of specialized services tailored to unique needs, ensuring
                    that no matter the task, we have the expertise to handle it
                    efficiently. */}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <div className="service-item">
                  <FontAwesomeIcon
                    icon={faToolbox}
                    style={{ fontSize: "25px", color: "#5B549E" }}
                  />
                  <h3 className="mt-2">Professional and Experienced Team</h3>
                  <p className="paragraph">
                    Our team comprises highly skilled professionals, including
                    technicians, trainers, and specialists who bring their
                    expertise to every job. We prioritize customer satisfaction,
                    working closely with clients to understand their needs and
                    deliver customized solutions.
                    {/* Our staff undergoes regular
                    training to stay updated with the latest industry standards
                    and techniques, ensuring top-notch service delivery. */}
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <div className="service-item">
                  <FontAwesomeIcon
                    icon={faMedal}
                    style={{ fontSize: "25px", color: "#5B549E" }}
                  />
                  <h3 className="mt-2">
                    Commitment to Quality and Reliability
                  </h3>
                  <p className="paragraph">
                    We adhere to stringent quality standards, using the best
                    materials and practices to deliver outstanding results in
                    every service we provide. Our reputation is built on
                    reliability and trust, ensuring that clients can count on us
                    for timely and dependable service.
                    {/* We embrace innovation,
                    employing the latest technologies and methodologies to
                    enhance our services and provide efficient and effective
                    solutions. */}
                  </p>
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </Container>
      <Count />
    </>
  );
}

export default Information;
