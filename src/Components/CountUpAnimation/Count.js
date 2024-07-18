import React from "react";
import CountUpAnimation from "./CountUpAnimation";
import "./CountUpAnimation.css";
import { Col, Container, Row } from "react-bootstrap";
import Features from "../Features/Features";

const Count = () => {
  return (
    <>
      <Container fluid className="py-5">
        <Container>
          <Row className="counter">
            <Col xs={12} sm={6} md={3} lg={3} style={{ color: "#5B549E" }}>
              <div className="counterpluse">
                <CountUpAnimation
                  start={0}
                  end={100}
                  duration={5}
                  className="clients-count"
                />
                <span className="plus-sign">+</span>
              </div>
              <span className="counttext">. SERVICES</span>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} style={{ color: "#5B549E" }}>
              <div className="counterpluse">
                <CountUpAnimation
                  start={0}
                  end={30}
                  duration={3}
                  className="services-count"
                />
                <span className="plus-sign">k +</span>
              </div>
              <span className="counttext">. SERVICES DONE</span>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} style={{ color: "#5B549E" }}>
              <div className="counterpluse">
                <CountUpAnimation
                  start={0}
                  end={100}
                  duration={2}
                  className="team-members-count"
                />
                <span className="plus-sign">+</span>
              </div>
              <span className="counttext">. CITIES</span>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} style={{ color: "#5B549E" }}>
              <div className="counterpluse">
                <CountUpAnimation
                  start={0}
                  end={30}
                  duration={2}
                  className="team-members-count"
                />
                <span className="plus-sign">+</span>
              </div>
              <span className="counttext">. TEAM MEMBER</span>
            </Col>
          </Row>
        </Container>
      </Container>
      <Features />
    </>
  );
};

export default Count;
