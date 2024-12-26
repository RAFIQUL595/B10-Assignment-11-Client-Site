import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const MyCars = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [sortOption, setSortOption] = useState('dateDesc');
    const [showModal, setShowModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetchAllCars();
        }
    }, [user, sortOption]);

    const fetchAllCars = async () => {
        try {
            const { data } = await useAxios.get(`/my-cars/${user?.email}?sort=${sortOption}`);
            setCars(data);
        } catch (error) {
            toast.error("Error fetching cars. Please try again.");
        }
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
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to recover this car!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const { data } = await useAxios.delete(`/cars/${id}`);
                if (data.deletedCount > 0) {
                    Swal.fire("Deleted!", "The car has been deleted.", "success");
                    fetchAllCars();
                } else {
                    throw new Error("Deletion failed.");
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

        if (Object.values(updatedCar).some((value) => !value || (typeof value === 'number' && isNaN(value)))) {
            toast.error('Please fill in all fields correctly.');
            return;
        }

        try {
            await useAxios.put(`/my-cars/${selectedCar._id}`, updatedCar);
            Swal.fire("Updated!", "Car details have been updated.", "success");
            setShowModal(false);
            fetchAllCars();
        } catch (error) {
            toast.error("Failed to update the car. Please try again.");
        }
    };

    return (
        <div className="my-10">
            <Helmet>
                <title>My Cars | Car Rental</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center my-5">My Cars</h1>

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
                    <p className="text-gray-600 text-lg">You have no cars added yet. Start by adding one!</p>
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
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Car Image</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Car Model</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Daily Rental Price</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Booking Count</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Availability</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Date Added</th>
                                <th className="px-4 py-2 text-left border-b border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={index} className="hover:bg-gray-50">
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
                                        <span
                                            className={`badge text-sm px-2 py-1 rounded ${car.availability === "Available" ? "text-green-500" : "text-red-500"
                                            }`}
                                        >
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

            {showModal && selectedCar && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-5/6 lg:w-1/3 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl text-center font-bold mb-4">Update Car Details</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            {/* Add the input fields as in the original code */}
                            {/* Ensure the modal form matches the fields and validation */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;
