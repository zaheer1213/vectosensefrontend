import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css"; // Optional: for any additional styling
import AgentSidebar from "../Admin/Sidebar/AgentSidebar";
import AgentMenu from "../Admin/Adminnavbar/AgentMenu";

const AgentAdminLayout = () => {
  return (
    <div className="admin-layout">
      <AgentMenu />
      <AgentSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AgentAdminLayout;
