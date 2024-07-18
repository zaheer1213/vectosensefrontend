import React from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import About from "../About/About";
import Header from "../Headar/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container fluid className="home-container" id="home">
        <Carousel>
          <Carousel.Item>
            <div className="carousel-item-content">
              <Row className="align-items-center">
                <Col md={6} className="order-md-1">
                  <div className="carousel-text">
                    <div className="textdiv">
                      <span className="grow-text">Grow</span>
                      <span className="business-text">Your Business</span>
                      <span className="with-text">With Vectosense</span>
                    </div>
                    <div className="text-start mt-5">
                      <Button className="radintbtn">Learn More</Button>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="order-md-2">
                  <div className="carousel-image-container">
                    <img
                      src="images/bg1-removebg-preview (1).jpg"
                      alt="First slide"
                      className="carousel-image"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-item-content">
              <Row className="align-items-center">
                <Col md={6} className="order-md-1">
                  <div className="carousel-text">
                    <div className="textdiv">
                      <span className="grow-text">Elevate</span>
                      <span className="business-text">Your Success</span>
                      <span className="with-text">With Vectosense</span>
                    </div>
                    <div className="text-start mt-5">
                      <Button className="radintbtn">Learn More</Button>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="order-md-2">
                  <div className="carousel-image-container">
                    <img
                      src="images/bg1-removebg-preview (1).jpg"
                      alt="First slide"
                      className="carousel-image"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
      <About />
    </>
  );
};

export default Home;
