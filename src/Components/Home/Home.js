import React, { useRef } from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import About from "../About/About";
import Header from "../Headar/Header";
import Whychoosemain from "../Whychoose/Whychoosemain";
import Information from "../Information/Information";
import Count from "../CountUpAnimation/Count";
import Features from "../Features/Features";
import Packageselection from "../Packageselection/Packageselection";
import Client from "../Clients/Client";
import Journry from "../Journry/Journry";
import Footer from "../Footer/Footer";

const Home = () => {
  const aboutRef = useRef(null);
  const pricingRef = useRef(null);
  const featuresRef = useRef(null);
  const homeRef = useRef(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToPrice = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const FeaturesRef = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behaviorL: "smooth" });
    }
  };
  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behaviorL: "smooth" });
    }
  };
  return (
    <>
      <Header
        scrollToHome={scrollToHome}
        scrollToAbout={scrollToAbout}
        scrollToPrice={scrollToPrice}
        FeaturesRef={FeaturesRef}
      />
      <Container fluid className="home-container" ref={homeRef}>
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
      <div ref={aboutRef}>
        <About />
      </div>
      <div>
        <Whychoosemain />
      </div>
      <div>
        <Information />
      </div>
      <div>
        <Count />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <div ref={pricingRef}>
        <Packageselection />
      </div>
      <div>
        <Client />
      </div>
      <div>
        <Journry />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
