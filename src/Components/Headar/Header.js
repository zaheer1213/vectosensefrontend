import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Commanconstans/Comman";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header({ scrollToAbout, scrollToPrice, FeaturesRef, scrollToHome }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const getUserInfo = async () => {
    const headers = {
      "x-access-token": token,
    };
    try {
      const response = await axios.get(BASEURL + "/accounts/user-profile", {
        headers,
      });
      console.log(response);
      if (response && response.data && response.data.data) {
        const fullName = response.data.data.username;
        const firstName = fullName.split(" ")[0];
        setUserName(firstName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const clientToken = localStorage.getItem("token");
    if (clientToken) {
      setToken(clientToken);
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const clientToken = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      setRole(userRole);
      if (clientToken) {
        setToken(clientToken);
        getUserInfo();
      } else {
        setToken(null);
        setUserName("");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [role]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleNavigate = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken(null);
      setUserName("");
    } else {
      navigate("/login");
    }
    setMenuOpen(false);
  };

  const handelMoveDashbord = () => {
    if (role === "Agent") {
      navigate("/agent-dashbord");
    } else if (role === "Admin") {
      navigate("/dashbord");
    }
  };
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
              <Nav.Link
                to="/"
                exact
                className="nav-link-custom"
                onClick={scrollToHome}
              >
                Home
              </Nav.Link>
              <Nav.Link className="nav-link-custom" onClick={scrollToAbout}>
                About Us
              </Nav.Link>
              <Nav.Link
                to="/contact"
                className="nav-link-custom"
                onClick={scrollToPrice}
              >
                Pricing
              </Nav.Link>
              <Nav.Link to="" className="nav-link-custom" onClick={FeaturesRef}>
                Features
              </Nav.Link>
              <NavLink
                to="/"
                className="nav-link-custom"
                style={{ marginTop: "10px" }}
              >
                Book a Service
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          {/* Right section */}
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {token && (
                <li className="nav-link-custom mt-3">
                  <a className="nav-link d-flex align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                      className="rounded-circle"
                      height="22"
                      alt="User Avatar"
                      loading="lazy"
                    />
                    <strong className="ms-1 d-none d-sm-block ">
                      {username ? username : ""}
                    </strong>
                  </a>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <a
                    className="btn btn-link"
                    style={{ color: "black", textDecoration: "none" }}
                    onClick={handleMenuToggle}
                  >
                    <img
                      src="images/Variant2.png"
                      style={{ height: "60px", width: "60px" }}
                      alt="Menu Icon"
                    />
                  </a>
                </li>
              )}
              {!token && (
                <NavLink
                  to="/login"
                  className="nav-link-custom "
                  style={{ marginTop: "10px" }}
                >
                  Login
                </NavLink>
              )}
              {!token && (
                <NavLink to="/registration" className="nav-link-custom">
                  <Button className="buttons">Sign up</Button>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {menuOpen && (
        <div className="header-menu-dropdown">
          <ul className="list-unstyled text-center">
            <li className="my-2">
              <Button
                className="btn btn-link nav-link"
                onClick={handelMoveDashbord}
                style={{
                  color: "black",
                  textDecoration: "none",
                  background: "white",
                }}
              >
                <FontAwesomeIcon icon={faUser} className="me-2 iconcolor" />
                Dashbord
              </Button>
            </li>
            <li className="my-2">
              <Button
                className="btn btn-link nav-link"
                onClick={handleNavigate}
                style={{
                  color: "black",
                  textDecoration: "none",
                  background: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={token ? faSignOutAlt : faSignInAlt}
                  className="me-2 iconcolor"
                />
                {token ? "Logout" : "Login"}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
