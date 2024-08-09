import React, { useEffect, useState } from "react";
import { Container, Col, Button } from "react-bootstrap";
import Slider from "react-slick";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import ServicesSliderCards from "./ServicesSliderCards";
import "./CardComponent.css";

const CardComponent = () => {
  const [pageLimit, setPageLimit] = useState(8); // Items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allservicedata, setAllservicedata] = useState([]);

  const getAllServices = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/customer/promotional-service`, {
        params: {
          page: currentPage,
          limit: pageLimit,
        },
        headers: headers,
      })
      .then((response) => {
        setAllservicedata(response.data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container >
        <Slider {...settings}>
          {allservicedata &&
            allservicedata.map((cards, index) => {
              const colors = ["#112966", "#B61575", "#33366E"];
              const backgroundColor = colors[index % colors.length];
              return (
                <div key={index} className="permostioncards">
                  <div
                    className="card d-flex flex-row align-items-center "
                    style={{
                      width: "20rem",
                      background: backgroundColor,
                      color: "white",
                      height: "220px",
                    }}
                  >
                    <div className="card-body">
                      <h5>{cards.title}</h5>
                      <span>#{cards.promotional_parameter}</span>{" "}
                      <div className="mt-3">
                        <Button className="serviceButoon">Book Now</Button>
                      </div>
                    </div>
                    <img
                      src={BASEURL + cards.banner_image}
                      alt="Card image"
                      style={{
                        width: "50%",
                        height: "100%",
                        objectFit: "",
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </Slider>
      </Container>
      <ServicesSliderCards />
    </>
  );
};

export default CardComponent;
