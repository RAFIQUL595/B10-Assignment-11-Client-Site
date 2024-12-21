import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
    </div>
  );
};

export default MainLayout;
