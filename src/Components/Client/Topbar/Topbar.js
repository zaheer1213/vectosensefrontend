import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faHistory,
  faSignOutAlt,
  faSignInAlt,
  faBox,
  faShoppingCart,
  faHeart,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "./Topbar.css";
import logo from "../../../VECTOSENSELOGO.png";
import Menubaricon from "../../../MenubarIcon.png";

const Topbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("client-token"));
  const [username, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const getUserInfo = async () => {
    const headers = {
      "x-access-token": token,
    };
    try {
      const response = await axios.get(BASEURL + "/accounts/user-profile", {
        headers,
      });
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
    const clientToken = localStorage.getItem("client-token");
    if (clientToken) {
      setToken(clientToken);
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const clientToken = localStorage.getItem("client-token");
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
  }, []);

  const signin = () => {
    navigate("/clientregistration");
  };
  const login = () => {
    navigate("/clientlogin");
  };
  const handleNavigate = () => {
    if (token) {
      localStorage.removeItem("client-token");
      setToken(null);
      setUserName("");
      // navigate("/login");
    } else {
      navigate("/login");
    }
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid justify-content-between">
        <div className="d-flex align-items-center">
          <a
            className="navbar-brand me-2 mb-1 d-flex align-items-center"
            href="/home"
          >
            <img
              src={logo}
              height="90"
              alt="VECTOSENSE LOGO"
              loading="lazy"
              style={{ marginTop: "2px" }}
            />
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto flex-row align-items-center">
            {/* <div className="d-flex">
              <span className="navbar-text ms-3">
                <FontAwesomeIcon icon={faBox} className="me-2" />
                Orders
              </span>
              <span className="navbar-text ms-3">
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Cart
              </span>
              <span className="navbar-text ms-3">
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Favorites
              </span>
            </div> */}
            {token && (
              <li className="nav-item me-3 me-lg-1">
                <a className="nav-link d-flex align-items-center" href="#">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="rounded-circle"
                    height="22"
                    alt="User Avatar"
                    loading="lazy"
                  />
                  <strong className="ms-1 d-none d-sm-block">
                    {username ? username : ""}
                  </strong>
                </a>
              </li>
            )}

            {!token && (
              <li className="nav-item me-3 me-lg-1">
                <a className="nav-link" href="#">
                  <Button
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    onClick={signin}
                  >
                    Sign Up
                  </Button>
                </a>
              </li>
            )}
            {!token && (
              <a className="nav-link" href="#">
                <Button
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                  }}
                  onClick={login}
                >
                  Login
                </Button>
              </a>
            )}
            {token && (
              <li className="nav-item">
                <a
                  className="btn btn-link"
                  style={{ color: "black", textDecoration: "none" }}
                  onClick={handleMenuToggle}
                >
                  <img
                    src={Menubaricon}
                    style={{ height: "60px", width: "60px" }}
                    alt="Menu Icon"
                  />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div className="menu-dropdown">
          <ul className="list-unstyled text-center">
            <li className="my-2">
              <Link to="/clinet-profile" className="nav-link">
                <FontAwesomeIcon icon={faUser} className="me-2 iconcolor" />
                Profile
              </Link>
            </li>
            <li className="my-2">
              <Link to="/my-bookings" className="nav-link">
                <FontAwesomeIcon icon={faBook} className="me-2 iconcolor" />
                My Bookings
              </Link>
            </li>
            <li className="my-2">
              <Link to="" className="nav-link">
                <FontAwesomeIcon icon={faHistory} className="me-2 iconcolor" />
                History
              </Link>
            </li>
            <li className="my-2">
              <Link to="" className="nav-link">
                <FontAwesomeIcon icon={faGear} className="me-2 iconcolor" />
                Settings
              </Link>
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
    </nav>
  );
};

export default Topbar;
