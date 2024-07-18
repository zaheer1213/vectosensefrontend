import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Theme.css";

const Theme = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center theme-container">
        <Col md={10}>
          <h1>Choose Theme</h1>
          <p>
            Pick a theme that suits your brand. Customize to create a
            professional and attractive online presence.
          </p>
          <Row className="text-start">
            <h5 className="mt-3">Available Themes</h5>
            <hr className="underline" />
            <Row className="justify-content-center">
              <Col md={4}>
                <Card className="theme-card pointer">
                  <Card.Img
                    variant="top"
                    src="images/image (Base).png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Gym Theme</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="theme-card">
                  <Card.Img
                    variant="top"
                    src="images/hometheme.png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Home Theme</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="theme-card">
                  <Card.Img
                    variant="top"
                    src="images/mordentheme.png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Modern lite</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
              <Col md={4}>
                <Card className="theme-card">
                  <Card.Img
                    variant="top"
                    src="images/lighttheme.png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Gym Theme</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="theme-card">
                  <Card.Img
                    variant="top"
                    src="images/theme5.png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Home Theme</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="theme-card">
                  <Card.Img
                    variant="top"
                    src="images/theme6.png"
                    className="cardimages"
                  />
                  <Card.Body>
                    <Card.Title className="textcolor">Modern lite</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Row>
          <Button variant="" className="longbtn mb-3">
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Theme;
