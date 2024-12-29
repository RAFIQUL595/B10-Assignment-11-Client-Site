import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const MyCars = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [sortOption, setSortOption] = useState('dateDesc');
    const [showModal, setShowModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const axiosSecure=useAxios()
  

    useEffect(() => {
        if (user?.email) {
            fetchAllCars();
        }
    }, [user]);

    const fetchAllCars = async () => {
        try {
            const { data } = await axiosSecure.get(`/my-cars/${user?.email}`);
            setCars(data);
        } catch (error) {
            toast.error("Error fetching cars:", error);
        }
    };

    const sortCars = (cars, sortOption) => {
        return cars.sort((a, b) => {
            switch (sortOption) {
                case 'dateDesc':
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case 'dateAsc':
                    return new Date(a.dateAdded) - new Date(b.dateAdded);
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleUpdate = (car) => {
        setSelectedCar(car);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            // Show confirmation dialog first
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be deleted this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                // Proceed with delete if user confirms
                const { data } = await axiosSecure.delete(`/cars/${id}`);

                // Validate response
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The car has been deleted.",
                        icon: "success"
                    });
                    fetchAllCars();
                } else {
                    throw new Error("Deletion failed. No records were deleted.");
                }
            }
        } catch (error) {
            toast.error("An error occurred while deleting the car.");
        }
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCar = {
            carModel: form.carModel.value,
            price: parseFloat(form.price.value),
            availability: form.availability.value,
            registration: form.registration.value,
            features: form.features.value,
            location: form.location.value,
            carImage: form.carImage.value,
            description: form.description.value,
        };

        // Validate the form
        if (!updatedCar.carModel || isNaN(updatedCar.price) || !updatedCar.availability || !updatedCar.registration || !updatedCar.features || !updatedCar.location || !updatedCar.carImage || !updatedCar.description) {
            toast.error('Please fill in all fields correctly.');
            return;
        }

        try {
            // Send the updated car data to the API
            await axiosSecure.put(`/my-cars/${selectedCar._id}`, updatedCar);

            // Show success modal if the update is successful
            Swal.fire({
                title: "Good job!",
                text: "Car updated successfully!",
                icon: "success"
            });
            setShowModal(false);
            fetchAllCars();
        } catch (error) {
            toast.error('Car not updated');
        }
    };



    return (
        <div className='my-10'>
            <Helmet>
                <title>My Cars | Car Rental</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center my-5">My Cars</h1>

            {/* Sort Options Dropdown */}
            <div className="mb-4">
                <label className="mr-2 font-bold">Sort by:</label>
                <select
                    onChange={handleSortChange}
                    value={sortOption}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="dateDesc">Date Added - Newest First</option>
                    <option value="dateAsc">Date Added - Oldest First</option>
                    <option value="priceAsc">Price - Lowest First</option>
                    <option value="priceDesc">Price - Highest First</option>
                </select>
            </div>

            {cars.length === 0 ? (
                <div className="text-center my-10">
                    <p className="text-gray-600 text-lg">
                        You have no cars added yet. Start by adding one!
                    </p>
                    <Link
                        to="/add-car"
                        className="inline-block bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                    >
                        Add Car
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-center">
                                <th className="px-4 py-2 border-b border-gray-300 ">Car Image</th>
                                <th className="px-4 py-2 border-b border-gray-300">Car Model</th>
                                <th className="px-4 py-2 border-b border-gray-300">Daily Rental Price</th>
                                <th className="px-4 py-2 border-b border-gray-300">Booking Count</th>
                                <th className="px-4 py-2 border-b border-gray-300">Availability</th>
                                <th className="px-4 py-2 border-b border-gray-300">Date Added</th>
                                <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortCars(cars, sortOption).map((car, index) => (
                                <tr key={index} className="hover:bg-gray-50 text-center">
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <img
                                            src={car.carImage}
                                            alt={car.carModel}
                                            className="w-24 h-auto object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300">{car.carModel}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">${car.price}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{car.bookingCount}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <span className={`badge text-sm px-2 py-1 rounded ${car.availability === "Available" ? "text-green-500" : "text-red-500"
                                            }`}>
                                            {car.availability}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        {new Date(car.dateAdded).toLocaleDateString("en-GB").replace(/\//g, "-")}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <button
                                            onClick={() => handleUpdate(car)}
                                            className="bg-blue-500 mb-2 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && selectedCar && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-5/6 lg:w-1/3 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl text-center font-bold mb-4">Update Car Details</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            {/* Car Model */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="carModel">
                                    Car Model
                                </label>
                                <input
                                    type="text"
                                    name='carModel'
                                    placeholder="Enter car model"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.carModel}
                                />
                            </div>

                            {/* Daily Rental Price */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Daily Rental Price ($)
                                </label>
                                <input
                                    type="number"
                                    name='price'
                                    placeholder="Enter rental price"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.price}
                                    onChange={(e) => {
                                        if (e.target.value < 0) e.target.value = 0;
                                    }}
                                />
                            </div>

                            {/* Availability */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Availability
                                </label>
                                <select className="select select-bordered w-full" name='availability' defaultValue={selectedCar.availability}>
                                    <option value="">Select</option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>

                            {/* Vehicle Registration Number */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Vehicle Registration Number
                                </label>
                                <input
                                    type="text"
                                    name='registration'
                                    placeholder="Enter vehicle registration"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.registration}
                                />
                            </div>

                            {/* Features */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Features
                                </label>
                                <input
                                    type="text"
                                    name='features'
                                    placeholder="Enter features (e.g., GPS, AC)"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.features}
                                />
                            </div>

                            {/* Location */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name='location'
                                    placeholder="Enter location"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.location}
                                />
                            </div>

                            {/* Images */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Car Image URL
                                </label>
                                <input
                                    type="url"
                                    name='carImage'
                                    placeholder="e.g., https://example.com/car-image.jpg"
                                    className="input input-bordered w-full"
                                    defaultValue={selectedCar.carImage}
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Enter description"
                                    name='description'
                                    className="textarea textarea-bordered w-full"
                                    defaultValue={selectedCar.description}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;
