import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "./ServiceSwiper.css";
import AllServies from "../AllServies/AllServies";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";

const ServiceSwiper = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allCategory, setAllCategory] = useState([]);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/customer/get-services?page=${page}&limit=${limit}`
      );
      setAllCategory(response.data.rows);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Container>
        <div className="slider-container">
          <Slider {...settings}>
            {allCategory.map((category, index) => (
              <div key={index} className="slider-card pointer">
                <div className="image-wrapper">
                  <img
                    src={BASEURL + category.category_image}
                    alt={category.category_name}
                  />
                </div>
                <div className="category-name">
                  <strong>{category.category_name}</strong>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
      <AllServies />
    </>
  );
};

export default ServiceSwiper;
