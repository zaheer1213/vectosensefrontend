import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ServicesSliderCards from "./ServicesSliderCards";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";

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
      .get(`${BASEURL}/customer/promotional-services`, {
        params: {
          page: currentPage,
          limit: pageLimit,
        },
        headers: headers,
      })
      .then((response) => {
        console.log(response);
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
  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="py-5">
          <Col className="mb-3">
            <div
              className="card d-flex flex-row align-items-center"
              style={{
                width: "20rem",
                background: "#112966",
                color: "white",
                height: "220px",
              }}
            >
              <div className="card-body">
                <h5>Elevate your wedding glow</h5>
                <span>#salon for women</span>{" "}
                <div className="mt-3">
                  <Button className="serviceButoon">Book Now</Button>
                </div>
              </div>
              <img
                src="images/mekup_women.png" // replace with your image path
                alt="Card image"
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col className="mb-3">
            <div
              className="card d-flex flex-row align-items-center"
              style={{ width: "20rem", background: "#B61575", color: "white" }}
            >
              <div className="card-body">
                <h5>Galti reh gayi toh painting free</h5>
                <span>#pay after satisfaction</span>{" "}
                <div className="mt-3">
                  <Button className="serviceButoon">Book Now</Button>
                </div>
              </div>
              <img
                src="images/service_man.png"
                alt="Card image"
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col className="mb-3">
            <div
              className="card d-flex flex-row align-items-center"
              style={{ width: "20rem", background: "#33366E", color: "white" }}
            >
              <div className="card-body">
                <h5>save on electricity bills with power saver ac service</h5>
                <div className="mt-3">
                  <Button className="serviceButoon">Book Now</Button>
                </div>
              </div>
              <img
                src="images/service_man2.png"
                alt="Card image"
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <ServicesSliderCards />
    </>
  );
};

export default CardComponent;
