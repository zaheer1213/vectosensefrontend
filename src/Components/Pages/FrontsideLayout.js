// FrontsideLayout.js
import React from "react";
import { Outlet } from "react-router-dom";

const FrontsideLayout = () => {
  return (
    <div className="frontside-layout">
      <Outlet />
    </div>
  );
};

export default FrontsideLayout;
