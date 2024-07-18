import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="images/VECTOSENSELOGO.png"
              className="navbar-logo"
              alt="logo"
            />
          </Navbar.Brand>

          {/* Center section */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center navbar-center"
          >
            <Nav>
              <Nav.Link to="/" exact className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link to="/" className="nav-link-custom">
                About Us
              </Nav.Link>
              <NavDropdown
                title="Services"
                id="basic-nav-dropdown"
                className="nav-dropdown-custom"
              >
                <NavDropdown.Item href="#action/3.2">
                  Home Services
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  Gym Services
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  Other Services
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link to="/contact" className="nav-link-custom">
                Pricing
              </Nav.Link>
              <Nav.Link to="/contact" className="nav-link-custom">
                Contact Us
              </Nav.Link>
              <NavLink to="/home" className="nav-link-custom" style={{ marginTop: "10px" }}>
                Client
              </NavLink>
              {/* <NavLink
                to="/clientregistration"
                className="nav-link-custom"
                style={{ marginTop: "10px" }}
              >
                Customer Registration
              </NavLink> */}
              {/* <NavDropdown
                title="Resources"
                id="basic-nav-dropdown"
                className="nav-dropdown-custom"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>

          {/* Right section */}
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavLink
                to="/login"
                className="nav-link-custom "
                style={{ marginTop: "10px" }}
              >
                Login
              </NavLink>
              <NavLink to="/registration" className="nav-link-custom">
                <Button className="buttons">Sign up</Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
