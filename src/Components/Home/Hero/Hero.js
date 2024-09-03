import React, { useRef } from "react";
import "./Hero.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../Headar/Header";
import About from "../../About/About";
import Whychoosemain from "../../Whychoose/Whychoosemain";
import Information from "../../Information/Information";
import Count from "../../CountUpAnimation/Count";
import Features from "../../Features/Features";
import Client from "../../Clients/Client";
import Journry from "../../Journry/Journry";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const Navigate = useNavigate();
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

  const movetosign = () => {
    Navigate("/registration");
    window.scroll(0, 0);
  };
  return (
    <>
      <Header
        scrollToHome={scrollToHome}
        scrollToAbout={scrollToAbout}
        scrollToPrice={scrollToPrice}
        FeaturesRef={FeaturesRef}
      />
      {/* home page */}
      <Container fluid className="main-hero">
        <Container fluid className="hero-sections">
          <Row className="align-items-start">
            <Col md={6}>
              <div>
                <div className="arrow-img">
                  <img src="/images/Arrow 2.png" alt="imges" />
                </div>
                <h1 className="growtext">Grow</h1>
                <h1 className="buiness-text">Your Business</h1>
                <Row>
                  <Col md={8}>
                    <div className="text-center">
                      <h3 className="text-with">With Vectosense</h3>
                      <Button
                        variant="danger"
                        className="sign-up-btn"
                        onClick={() => movetosign()}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="manimg">
                <img src="/images/vectoman.png" alt="man" />
              </div>
            </Col>
            <Col md={6}>
              <div className="image-container">
                <img
                  src="/images/mobilpreview.png"
                  alt="Phone Mockups"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* all pages */}
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
      {/* <div ref={pricingRef}>
        <Packageselection />
      </div> */}
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

export default Hero;
