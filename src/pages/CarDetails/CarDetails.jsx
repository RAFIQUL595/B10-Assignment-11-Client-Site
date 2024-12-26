import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const CarDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [car, setCar] = useState({});
    const { id } = useParams();
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const { data } = await useAxios.get(`/cars/${id}`);
                setCar(data);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchCarData();
    }, [id]);

    const {
        carModel,
        availability,
        features,
        price,
        description,
        carImage,
        _id,
        users,
    } = car || {}

    const handleBookNow = () => {
        setModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        const carId = _id;
        const bookingDate = new Date().toISOString();

        // Validation: Check if the user is trying to book their own car
        if (user?.email === users?.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Action not permitted! You cannot book your own car.",
            });
            return;
        }

        // 2. Prepare booking data
        const bookingData = {
            carModel,
            bookingDate,
            availability,
            features,
            price,
            description,
            carImage,
            carId,
            user: user?.email
        };

        try {
            useAxios.post("/add-count", bookingData);
            Swal.fire({
                title: "Good job!",
                text: "Booking Successful!",
                icon: "success"
            });
            
            // Navigate to My Bookings page after successful booking
            navigate('/my-bookings');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };


    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="p-6">
            {/* Car details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Images */}
                <div className="space-y-4">
                    {carImage && <img src={carImage} alt={carModel} className="w-full h-80 object-cover" />}
                </div>

                {/* Right: Car Info */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{carModel}</h1>
                    <p className="text-xl text-gray-600 mt-2">${price} per day</p>
                    <p className={`text-xl mt-2 ${availability === "Available" ? "text-green-500" : "text-red-500"}`}>
                        {availability}
                    </p>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-800">Features:</h3>
                        <ul className="list-disc ml-6 mt-2 text-gray-700">
                            <li>{features}</li>
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-800">Description:</h3>
                        <p className="text-gray-700">{description}</p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleBookNow}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
                        <p className="text-lg text-gray-800">Car: {carModel}</p>
                        <p className="text-lg text-gray-800">Price Per Day: ${price}</p>
                        <p className="text-lg text-gray-800">Availability: {availability}</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default CarDetails;
