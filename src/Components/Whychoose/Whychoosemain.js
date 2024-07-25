import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CenterMode from "./CenterMode";
import "./CenterMode.css";
function Whychoosemain() {
  return (
    <>
      <Container fluid className="maindivbg">
        <Row className="justify-content-center align-items-center w-100">
          <Col lg={3} className="text-center mb-4">
            <Row>
              <Col>
                <img
                  src="images/Why choose VectoSense_.png"
                  className="mainimg"
                  alt="Why Choose VectoSense"
                />
              </Col>
            </Row>
          </Col>
          <Col lg={9}>
            <CenterMode />
          </Col>
        </Row>
        <img src="images/arrowgirl.png" className="girlimg" alt="Arrow Girl" />
      </Container>
    </>
  );
}

export default Whychoosemain;
