import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxios from "../../hooks/useAxios";

const RecentListings = () => {
    const [cars, setCars] = useState([]);
    const axiosSecure = useAxios()

    useEffect(() => {
        const fetchAllCars = async () => {
            const { data } = await axiosSecure.get(`/cars`);
            setCars(data);
        };
        fetchAllCars();
    }, []);
    return (
        <div className="mb-10">
            <h2 className="text-3xl font-bold text-center mb-6">Recent Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...cars].slice(0, 6).map((car) => (
                    <div
                        key={car._id}
                        className="card bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg overflow-hidden"
                    >
                        <img
                            src={car.carImage}
                            alt={car.carModel}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-bold">Model: {car.carModel}</h3>
                            <p className="text-gray-500">Daily Price: ${car.price}</p>
                            <p><span className="font-bold">Availability: </span> <span
                                className={`badge text-sm px-2 py-1 rounded ${car.availability === "Available" ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {car.availability}
                            </span></p>
                            <p className="text-sm text-gray-500">Booking Count: {car.bookingCount}</p>
                            <p className="text-sm text-gray-400">
                                {/* Date Posted: {moment(new Date(car.dateAdded)).fromNow()} */}
                                {moment(car.dateAdded).fromNow()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentListings;
