import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBusinessTime,
  faCalendar,
  faChartLine,
  faChartSimple,
  faClockRotateLeft,
  faGear,
  faList,
  faMagnifyingGlassChart,
  faMessage,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

function SuparAdminSidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(window.innerWidth >= 768);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {window.innerWidth < 768 && (
        <button className="toggle-button baricon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-menu" style={{ background: "white" }}>
          <NavLink to="/" className="sidebar-item" activeClassName="active">
            <FaHome className="sidebar-icon" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/super-dashbord"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/super-allbuiness"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faBusinessTime} className="sidebar-icon" />
            <span>All Business</span>
          </NavLink>
          <NavLink
            to="/super-services"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faBars} className="sidebar-icon" />
            <span>All Services</span>
          </NavLink>
          <NavLink
            to="/super-agnets"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <span>All Agents</span>
          </NavLink>
          <NavLink
            to="/super-allbooking"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlassChart}
              className="sidebar-icon"
            />
            <span>All Bookings</span>
          </NavLink>
          <NavLink
            to="/super-allpromotionalservices"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faChartSimple} className="sidebar-icon" />
            <span>
              Promotional <br /> Services
            </span>
          </NavLink>
          {/* <NavLink
            to="/analytics"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faChartSimple} className="sidebar-icon" />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/notification"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faBell} className="sidebar-icon" />
            <span>Notifications</span>
          </NavLink>
          <NavLink
            to="/message"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faMessage} className="sidebar-icon" />
            <span>Messages</span>
          </NavLink> */}

          {/* <NavLink
            to="/calendar"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
            <span>Calendar</span>
          </NavLink>
          <NavLink
            to="/setting"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
            <span>Setting</span>
          </NavLink>
          <NavLink
            to="/history"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className="sidebar-icon"
            />
            <span>History</span>
          </NavLink> */}
          <NavLink
            to="/super-allcategory"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faList} className="sidebar-icon" />
            <span>Category</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SuparAdminSidebar;
