import React from "react";
import logo from "../../../assets/logo/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                {/* Logo and Company Info */}
                <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                    <img className="h-20 w-20 mb-3" src={logo} alt="Car Rental Logo" />
                    <p className="text-center lg:text-left">
                        <span className="text-3xl font-bold">Car Rental</span> <br />
                        Your trusted car rental service since 2024
                    </p>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {/* Services */}
                    <div>
                        <h6 className="font-semibold text-lg mb-3">Services</h6>
                        <Link
                            to="/car-rentals"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            Car Rentals
                        </Link>
                        <Link
                            to="/fleet"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            Fleet Information
                        </Link>
                        <Link
                            to="/offers"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300"
                        >
                            Special Offers
                        </Link>
                    </div>

                    {/* Company */}
                    <div>
                        <h6 className="font-semibold text-lg mb-3">Company</h6>
                        <Link
                            to="/about"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/careers"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300"
                        >
                            Careers
                        </Link>
                    </div>

                    {/* Legal */}
                    <div>
                        <h6 className="font-semibold text-lg mb-3">Legal</h6>
                        <Link
                            to="/terms"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            Terms of Use
                        </Link>
                        <Link
                            to="/privacy"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300 mb-2"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/cookies"
                            className="block text-gray-400 hover:text-white hover:underline transition duration-300"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 lg:mt-0 flex justify-center space-x-6">
                    <Link
                        to="https://www.facebook.com/rafiqul.islam.126222"
                        className="text-gray-400 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook className="text-2xl" />
                    </Link>
                    <Link
                        to="https://www.instagram.com/rafiqul._.islam/"
                        className="text-gray-400 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="text-2xl" />
                    </Link>
                    <Link
                        to="https://x.com/RAFIQUL81739959"
                        className="text-gray-400 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter className="text-2xl" />
                    </Link>
                </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-6 text-center text-white">
                <p>
                    Copyright © {new Date().getFullYear()} - All rights reserved by Car Rental
                </p>
            </div>
        </footer>
    );
};

export default Footer;
