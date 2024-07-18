import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "./Navigation.css";
import Home from "../AgnetHome/Home";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Navbar style={{ background: "black" }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="images/logo.png"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Products</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#contact">Support</Nav.Link>
            </Nav>
            <Button className="primary">Start Free Trial</Button> &nbsp;&nbsp;
            <NavLink to="/clientregistration">
              <Button className="primary">Sign Up</Button>
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Home />
    </>
  );
};

export default Navigation;
