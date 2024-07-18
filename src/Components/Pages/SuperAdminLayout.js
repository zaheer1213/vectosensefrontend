import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css"; // Optional: for any additional styling
import SuparAdminSidebar from "../SuperAdmin/SuparAdminSidebar/SuparAdminSidebar";
import SuperMenu from "../SuperAdmin/SuperMenu/SuperMenu";

const SuperAdminLayout = () => {
  return (
    <div className="admin-layout">
      <SuperMenu />
      <SuparAdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
