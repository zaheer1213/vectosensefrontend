import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ fontSize: "80px", color: "#5B549E" }}
            />
            <h1 className="display-1 text-center">401</h1>
            <h1 className="mb-4 text-center">Unauthorized</h1>
            <p className="mb-4 text-center">
              You are not authorized to access this page. Please log in to
              continue.
            </p>
            <NavLink
              className="btn btn-primary py-3 px-5"
              style={{ background: "#5B549E" }}
              to="/login"
            >
              Go Back To Login
            </NavLink>
          </Col>
        </Row>
      </Container>

      {/* 404 End */}
    </>
  );
};

export default NotFound;
