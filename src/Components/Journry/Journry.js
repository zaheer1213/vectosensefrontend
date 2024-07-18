import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Journry.css";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";

const Journry = () => {
  return (
    <>
      <Container fluid className="maincontainer">
        <Container className="Journry-Container">
          <Row className="align-items-center">
            <Col xs={12} md={6} lg={6} className="mb-3">
              <div className="journy-subdiv">
                <img src="images/Group.png" alt="Illustration" />
              </div>
              <hr className="underline" />
            </Col>
            <Col xs={12} md={6} lg={6} className="mb-3">
              <div className="text-center">
                <h1>Start</h1>
                <h3>Your Journey Today!</h3>
                <NavLink to="/registration">
                  <Button className="buton">Sign up</Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Journry;
