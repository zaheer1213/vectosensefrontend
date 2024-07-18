import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Whychoose.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";

class Whychoose extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "10px",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    const cards = [
      {
        img: "images/aboutus1.png",
        heading: "Seamless Scheduling",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ",
      },
      {
        img: "images/aboutus4.png",
        heading: "Access to Costumer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ",
      },
      {
        img: "images/aboutus3.png",
        heading: "Data Driven Marketing",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ",
      },
      {
        img: "images/abouts2.png",
        heading: "Integrated Payments",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ",
      },
    ];
    return (
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {cards.map((item, index) => (
            <div className="card-wrapper py-5" key={index}>
              <Card className="custom-card">
                <Card.Img
                  variant=""
                  src={item.img}
                  alt={item.heading}
                  style={{ width: "278px", height: "185px", margin: "20px" }}
                />
                <Card.Body>
                  <Card.Title>{item.heading}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "red",
        textAlign: "center",
        color: "black",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "red",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

export default Whychoose;
