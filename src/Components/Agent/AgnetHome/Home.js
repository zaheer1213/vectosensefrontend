import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import WhoWeAre from "../Whoweare/WhoWeAre";
import OurTeam from "../TeamMembers/OurTeam";
import Timings from "../TIMMINGS/Timings ";
import Footer from "../../Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="home-container-agnet">
        <Container fluid>
          <Container fluid>
            <Row className="align-items-center min-vh-100">
              <Col md={6} className="text-white text-center text-md-start p-5">
                <h1 className="heroheding">
                  Lorem Ipsum is simply dummy text of the
                </h1>
                <p className="herop">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat.
                </p>
                <Button className="me-3 customebtn">Book</Button>
                <div className="mt-3">
                  Trusted by 50k+ users
                  <ul className="list-unstyled starDiv mb-3">
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-yellow" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-yellow" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-yellow" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-yellow" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-yellow" />
                    </li>{" "}
                    &nbsp;
                    <span> 4.1/5</span>
                  </ul>
                </div>
              </Col>
              <Col
                md={6}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src="images/herosection.png"
                  alt="Your Image"
                  className="img-fluid h-100"
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
      <WhoWeAre />
      <OurTeam />
      <Timings />
      <Footer/>
    </>
  );
};

export default Home;
