import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div
            className="relative h-96 lg:h-[600px] my-10 bg-cover bg-center"
            style={{ backgroundImage: "url('https://i.ibb.co.com/71vpJ4j/hq720.jpg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 shadow-lg">
                    Drive Your Dreams Today!
                </h1>
                <Link
                    to="/available-cars"
                    className="btn btn-primary lg:btn-lg shadow-md"
                >
                    View Available Cars
                </Link>
            </div>
        </div>
    );
};

export default Banner;
