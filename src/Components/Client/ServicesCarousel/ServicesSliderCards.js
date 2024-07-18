import React from "react";
import { Container, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServicesSliderCards.css";

const ServicesSliderCards = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // screen width of 768px or less
        settings: {
          slidesToShow: 2, // show 2 slides at a time
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 576, // screen width of 576px or less
        settings: {
          slidesToShow: 1, // show 1 slide at a time
          centerPadding: "10px",
        },
      },
    ],
  };

  const cardData = [
    { imgSrc: "images/new.png", title: "Kitchen Cleaning" },
    { imgSrc: "images/homealience.png", title: "Native Water Purifier" },
    { imgSrc: "images/painter.png", title: "Home painting" },
    { imgSrc: "images/women_body.png", title: "Laser Hair Reduction" },
    { imgSrc: "images/massage.png", title: "Spa Ayurveda" },
    { imgSrc: "images/women_body.png", title: "Laser Hair Reduction" },
    { imgSrc: "images/homealience.png", title: "Laser Hair Reduction" },
  ];

  return (
    <Container>
      <div className="slider-container">
        <h2 className="text-start">New and noteworthy</h2>
        <Slider {...settings}>
          {cardData.map((card, index) => (
            <div key={index} style={{ padding: "0 10px" }}>
              <Card style={{ width: "100%", height: "233px" }}>
                <Card.Img
                  variant="top"
                  src={card.imgSrc}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="slidercardtitle">
                    {card.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default ServicesSliderCards;
