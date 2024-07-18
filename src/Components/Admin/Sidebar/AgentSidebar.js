import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBriefcase, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function AgentSidebar() {
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
          <NavLink
            to="/agent-dashbord"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faChartSimple} className="sidebar-icon" />
            <span>Dashbord</span>
          </NavLink>
          <NavLink
            to="/agent-booking"
            className="sidebar-item"
            activeClassName="active"
          >
            <FaBars className="sidebar-icon" />
            <span>All Bookings</span>
          </NavLink>
          <NavLink
            to="/agent-services"
            className="sidebar-item"
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />
            <span>My Services</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AgentSidebar;
