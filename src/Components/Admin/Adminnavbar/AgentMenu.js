import React, { useEffect, useState } from "react";
import "./MenuBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faGear,
  faIdCard,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";

const AgentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState("images/userimg.jpg");
  const [username, setUserName] = useState("");
  const [businessinfoID, setBussinessInfoID] = useState(null);
  const [businessObject, setBusinessObject] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getUserInfo = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    try {
      const response = await axios.get(BASEURL + "/accounts/user-profile", {
        headers,
      });
      if (response && response.data && response.data.data) {
        setBusinessObject(response?.data?.data?.business_data);
        setLogo(response?.data?.data?.profile_pic);
        setBussinessInfoID(response?.data?.data?.business_data?.id);
        const fullName = response.data.data?.username;
        const firstName = fullName.split(" ")[0];
        setUserName(firstName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigate = () => {
    navigate("/businessinfo");
  };
  useEffect(() => {
    getUserInfo();
  }, [businessObject]);

  return (
    <>
      <div className="dashboard-header">
        <div className="logo pointer">
          <img src={logo ? BASEURL + logo : logo} alt="Logo" />
        </div>
        <div className="hamburger-menu">
          <button className="hamburger-icon" onClick={toggleMenu}>
            <img
              src="images/Variant2.png"
              style={{ height: "60px", width: "60px" }}
              alt="Menu Icon"
            />
          </button>
          <nav className={`menu-list ${isOpen ? "open" : ""}`}>
            <ul>
              <li>
                <FontAwesomeIcon icon={faUser} className="iconcolor" /> &nbsp;
                <a href="">{username}</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faBusinessTime} className="iconcolor" />{" "}
                &nbsp;
                <a href="" onClick={() => handleNavigate()}>
                  Business Info
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faIdCard} className="iconcolor" /> &nbsp;
                <a href="" onClick={() => navigate("/profile")}>
                  Profile
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faGear} className="iconcolor" /> &nbsp;
                <a href="#item3">Settings</a>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="iconcolor"
                />{" "}
                &nbsp;
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AgentMenu;
