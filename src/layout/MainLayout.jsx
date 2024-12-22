import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto min-h-[calc(100vh-288px)]">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
