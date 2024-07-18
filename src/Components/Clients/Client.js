import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Client.css"; // Import the CSS file
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Journry from "../Journry/Journry";

function Client() {
  return (
    <>
      <Container fluid className="main-container">
        <div className="circle top-left-circle"></div>
        <div className="circle bottom-right-circle"></div>
        <Container fluid className="glass-container">
          <Row>
            {/* <div className="text-center mb-4 hedingdiv">
              <h1>Our</h1>
              <h2>Client Says</h2>
            </div> */}
            <div className="d-flex justify-content-center ">
              <img src="images/our client says.png" className="clinetimg" />
            </div>
          </Row>
          <Row className="justify-content-center">
            <Col md={3} className="mb-3">
              <MDBCard className="clinetcards">
                <MDBCardBody>
                  <MDBRow className="g-0 align-items-center">
                    <MDBCol md="4" className="text-center">
                      <img
                        className="client-img"
                        src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
                        alt="Client"
                      />
                    </MDBCol>
                    <MDBCol md="8" className="client-info">
                      <h4 className="mb-0">Esther Hills</h4>
                      <small className="client-role">
                        home service provider
                      </small>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBCol>
                      <MDBCardText>
                        Omnis totam molestiae delectus nemo alias nesciunt harum
                        et. Nobis dolorum excepturi quod vel. Sunt est qui ab
                        non dolores repellat rem impedit dolores. Ut ea rerum
                        cum eum. Alias dolores tempore illo accusantium est et
                        voluptatem voluptas.
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </Col>
            <Col md={3} className="mb-3">
              <MDBCard className="clinetcards">
                <MDBCardBody>
                  <MDBRow className="g-0 align-items-center">
                    <MDBCol md="4" className="text-center">
                      <img
                        className="client-img"
                        src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
                        alt="Client"
                      />
                    </MDBCol>
                    <MDBCol md="8" className="client-info">
                      <h4 className="mb-0">Esther Hills</h4>
                      <small className="client-role">
                        home service provider
                      </small>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBCol>
                      <MDBCardText>
                        Omnis totam molestiae delectus nemo alias nesciunt harum
                        et. Nobis dolorum excepturi quod vel. Sunt est qui ab
                        non dolores repellat rem impedit dolores. Ut ea rerum
                        cum eum. Alias dolores tempore illo accusantium est et
                        voluptatem voluptas.
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </Col>
            <Col md={3} className="mb-3">
              <MDBCard className="clinetcards">
                <MDBCardBody>
                  <MDBRow className="g-0 align-items-center">
                    <MDBCol md="4" className="text-center">
                      <img
                        className="client-img"
                        src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
                        alt="Client"
                      />
                    </MDBCol>
                    <MDBCol md="8" className="client-info">
                      <h4 className="mb-0">Esther Hills</h4>
                      <small className="client-role">
                        home service provider
                      </small>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBCol>
                      <MDBCardText>
                        Omnis totam molestiae delectus nemo alias nesciunt harum
                        et. Nobis dolorum excepturi quod vel. Sunt est qui ab
                        non dolores repellat rem impedit dolores. Ut ea rerum
                        cum eum. Alias dolores tempore illo accusantium est et
                        voluptatem voluptas.
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </Col>
          </Row>
        </Container>
      </Container>
      <Journry />
    </>
  );
}

export default Client;
