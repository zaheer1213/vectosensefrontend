import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CenterMode1.css";
import Card from "react-bootstrap/Card";

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "10px",
        },
      },
    ],
  };

  const cards = [
    {
      img: "images/aboutus1.png",
      heading: "Seamless Scheduling",
      text: "Effortlessly manage your appointments with our intuitive scheduling system. Enjoy the convenience of setting, modifying, and tracking appointments in real-time. Stay organized and ensure no missed appointments with our reliable and user-friendly interface.",
    },
    {
      img: "images/aboutus4.png",
      heading: "Access to Customer",
      text: "Gain valuable insights with comprehensive access to customer data. Understand client preferences, track history, and personalize services to enhance customer satisfaction. Our system ensures secure and easy retrieval of customer information.",
    },
    {
      img: "images/aboutus3.png",
      heading: "Data Driven Marketing",
      text: "Optimize your marketing strategies with our data-driven approach. Analyze customer behavior and trends to create targeted campaigns that drive engagement and sales. Make informed decisions with actionable insights derived from robust data analysis.",
    },
    {
      img: "images/abouts2.png",
      heading: "Integrated Payments",
      text: "Simplify transactions with our integrated payment solutions. Process payments quickly and securely, offering clients a hassle-free experience. Our system supports various payment methods, ensuring convenience and reliability for both you and your customers.",
    },
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="card-wrapper">
            <Card className="custom-card">
              <Card.Img
                src={card.img}
                alt={card.heading}
                className="card-img"
              />
              <Card.Body>
                <Card.Title className="cardheading">{card.heading}</Card.Title>
                <Card.Text className="mt-3 cardtext">{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CenterMode;
