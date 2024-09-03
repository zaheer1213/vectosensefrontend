import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const Hero = () => {
  return (
    <>
      <Container fluid>
        <Container>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img src="/images/bg1-removebg-preview.jpg" alt="bg" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/bg1-removebg-preview.jpg" alt="bg" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/bg1-removebg-preview.jpg" alt="bg" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Container>
    </>
  );
};

export default Hero;
