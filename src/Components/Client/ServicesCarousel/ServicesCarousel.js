import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ServicesCards from "./ServicesCards";

const ServicesCarousel = () => {
  return (
    <>
      <Container>
        <Carousel fade className="py-5">
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src="images/slider_img1.png"
              alt="First slide"
              style={{ height: "100%", objectFit: "cover", width: "90%" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src="images/slider_img1.png"
              alt="Second slide"
              style={{ height: "100%", objectFit: "cover", width: "90%" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src="images/slider_img1.png"
              alt="Third slide"
              style={{ height: "100%", objectFit: "cover", width: "90%" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>
      <ServicesCards />
    </>
  );
};

export default ServicesCarousel;
