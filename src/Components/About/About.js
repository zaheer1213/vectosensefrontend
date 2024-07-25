import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <>
      <Container fluid className="aboutmain">
        <div className="Aboutcircle Abouttop-left-circle"></div>
        <div className="Aboutcircle Aboutbottom-right-circle"></div>
        <Container fluid className="About-Container">
          <Row className="align-items-center">
            <Col
              xs={12}
              md={6}
              lg={6}
              className="mb-3 d-flex flex-wrap justify-content-center aboutcard-container"
            >
              <div className="aboutcard">
                <img src="images/aboutgroupimg.png" alt="About Group" className="about-image"/>
              </div>
            </Col>
            <Col
              xs={12}
              md={6}
              lg={6}
              className="mb-3 d-flex flex-column align-items-center justify-content-center abouttext-container"
            >
              <div className="abouttext">
                <h1 className="about-heading text-start">About</h1>
                <h2 className="about-subheading text-start">VectoSense</h2>
                <p className="paragraph mt-3">
                  Our powerful platform is designed for all business owners,
                  providing advanced scheduling, client management, seamless
                  communication, secure payments, comprehensive marketing tools,
                  and analytics. This enables you to grow your business and
                  attract customers through an enhanced online presence.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    
    </>
  );
};

export default About;
