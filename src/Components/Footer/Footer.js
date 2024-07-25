import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const userRole = localStorage.getItem("role");
  const AdminTokne = localStorage.getItem("admin-token");
  return (
    <>
      <Container fluid className="py-1 footercolor">
        <Container className="mt-5">
          <Row>
            <Col md={4}>
              <div className="footersection">
                <div className="footerlogo">
                  <img
                    src="images/VECTOSENSELOGO.png"
                    className="footer"
                    alt=""
                    decoding="async"
                  />
                </div>
                <p className="text-light mt-3">
                  VectoSense is your comprehensive solution for diverse
                  services. We pride ourselves on delivering tailored services
                  to meet your unique needs, ensuring top-notch quality and
                  customer satisfaction.
                </p>
                <div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "25px",
                    }}
                  >
                    <div className="m-3">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <div className="m-3">
                      <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="m-3">
                      <FontAwesomeIcon icon={faFacebook} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4 mb-md-0">
                <h5 className="text-uppercase text-light">Quick links</h5>
                {userRole == "Admin" ? (
                  <div className="link-animated d-flex flex-column justify-content-start mt-3">
                    <div className="text-light mb-2">Home</div>
                    <div className="text-light mb-2">About Us</div>
                    <div className="text-light mb-2">Services</div>
                    <div className="text-light mb-2">Pricing</div>
                  </div>
                ) : (
                  <div className="link-animated d-flex flex-column justify-content-start mt-3">
                    <NavLink to="/home" className="custom-link">
                      <div className="text-light mb-2">Home</div>
                    </NavLink>
                    <NavLink to="/partners" className="custom-link">
                      <div className="text-light mb-2">Grow With Us</div>
                    </NavLink>
                    {/* <div className="text-light mb-2">Pricing</div> */}
                  </div>
                )}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4 mb-md-0">
                <h5 className="text-uppercase text-light">LEGAL</h5>
                <div className="link-animated d-flex flex-column justify-content-start mt-3">
                  <NavLink to="/termscondition" className="custom-link">
                    <div className="text-light mb-2">Terms And Conditions</div>
                  </NavLink>
                  <NavLink to="/privacyPolicy" className="custom-link">
                    <div className="text-light mb-2">Privacy Policy</div>
                  </NavLink>
                  <NavLink to="/refund" className="custom-link">
                    <div className="text-light mb-2">Refund</div>
                  </NavLink>
                  {/* <div className="text-light mb-2">Cookies Policy</div> */}
                </div>
              </div>
            </Col>
            {/* <Col md={3}>
              <div className="mb-4 mb-md-0">
                <h5 className="text-uppercase text-light">Lorem ipsum dolor</h5>
                <div className="link-animated d-flex flex-column justify-content-start mt-3">
                  <div className="text-light mb-2">Lorem ipsum dolor</div>
                  <div className="text-light mb-2">Lorem ipsum dolor</div>
                  <div className="text-light mb-2">Lorem ipsum dolor</div>
                  <div className="text-light mb-2">Lorem ipsum dolor</div>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Footer;
