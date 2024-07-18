import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <div className="who-we-are-container">
      <Container fluid className="p-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img
              src="images/whoarewe.png"
              alt="Who We Are"
              className="img-fluid"
            />
          </Col>
          <Col md={6} className="text-white">
            <h1 style={{color:"#FCF20D"}}>WHO WE ARE</h1>
            <p style={{ fontSize: "25px" }}>
              Sed facilis adipisci non quia inventore ut consequatur laudantium
              eos voluptatem beatae et nemo nostrum et nihil dolor. Eos debitis
              aliquid 33 voluptates omnis aut unde nemo ab quia quasi ea
              consequatur incidunt ut voluptas quas in Quis nulla. Id earum
              sapiente ea rerum temporibus sed saepe quisquam sed repellat omnis
              ea blanditiis voluptatibus.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhoWeAre;
