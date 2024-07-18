import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css"; // Optional: for any additional styling
import MenuBar from "../Admin/Adminnavbar/MenuBar";
import Sidebar from "../Admin/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MenuBar />
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
