import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { CiBookmarkPlus, CiLogin } from "react-icons/ci";
import { Helmet } from "react-helmet";

const Navbar = () => {
  // links
  const links = (
    <>
      <li className="flex items-center space-x-2">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 flex items-center ${
              isActive
                ? "bg-[#55efc4] text-blue-600 rounded-md"
                : "hover:text-blue-700"
            }`
          }
          to="/"
        >
          <IoHomeOutline className="size-4 lg:size-5" />
          <span className="ml-2 lg:text-xl">Home</span>
        </NavLink>
      </li>
      <li className="flex items-center space-x-2">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 flex items-center ${
              isActive
                ? "bg-[#55efc4] text-blue-600 rounded-md"
                : "hover:text-blue-700"
            }`
          }
          to="/available-cars"
        >
          <MdOutlineEventAvailable className="size-4 lg:size-5" />
          <span className="ml-2 lg:text-xl">Available Cars</span>
        </NavLink>
      </li>
      <li className="flex items-center space-x-2">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 flex items-center ${
              isActive
                ? "bg-[#55efc4] text-blue-600 rounded-md"
                : "hover:text-blue-700"
            }`
          }
          to="/add-car"
        >
          <IoIosAddCircleOutline className="size-4 lg:size-5" />
          <span className="ml-2 lg:text-xl">Add Car</span>
        </NavLink>
      </li>
      <li className="flex items-center space-x-2">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 flex items-center ${
              isActive
                ? "bg-[#55efc4] text-blue-600 rounded-md"
                : "hover:text-blue-700"
            }`
          }
          to="/my-cars"
        >
          <FaCar className="size-4 lg:size-5" />
          <span className="ml-2 lg:text-xl">My Cars</span>
        </NavLink>
      </li>
      <li className="flex items-center space-x-2">
        <NavLink
          className={({ isActive }) =>
            `px-4 py-2 flex items-center ${
              isActive
                ? "bg-[#55efc4] text-blue-600 rounded-md"
                : "hover:text-blue-700"
            }`
          }
          to="/my-bookings"
        >
          <CiBookmarkPlus className="size-4 lg:size-5" />
          <span className="ml-2 lg:text-xl">My Bookings</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 mt-2">
      <Helmet>
        <title>Home | Car Rental</title>
      </Helmet>
      <div className="navbar-start">
        {/* hamburger menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {/* logo */}
        <Link
          to="/"
          className="btn btn-ghost text-xl md:text-3xl hover:bg-transparent"
        >
          <img className="size-14" src={logo} alt="" />
          <span
            style={{
              background: "linear-gradient(to right, red, blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Car Rental
          </span>
        </Link>
      </div>
      {/* navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1">{links}</ul>
      </div>
      {/* navbar end */}
      <div className="navbar-end">
        <Link
          className="btn text-xl bg-[#1dd1a1] hover:bg-[#10ac84] text-white"
          to="/login"
        >
          <CiLogin />
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
