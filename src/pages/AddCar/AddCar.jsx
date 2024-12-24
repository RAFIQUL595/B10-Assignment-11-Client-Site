import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import { useAxios } from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';


const AddCar = () => {
    const [images, setImages] = useState([]);
    const { user } = useAuth()
    const navigate = useNavigate()

    const onDrop = useCallback((acceptedFiles) => {
        const uploadedImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...uploadedImages]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handelAddCar = async e => {
        e.preventDefault()
        const form = e.target;
        const carModel = form.carModel.value;
        const price = parseFloat(form.price.value);
        const availability = form.availability.value;
        const registration = form.registration.value;
        const features = form.features.value;
        const location = form.location.value;
        const carImage = form.carImage.value;
        const description = form.description.value;
        const dateAdded = new Date().toISOString();
        const formData = {
            carModel,
            user: {
                email: user?.email,
                name: user?.displayName,
                photo: user?.photoURL,
            },
            dateAdded,
            price,
            availability,
            registration,
            features,
            location,
            carImage,
            description,
            bookingStatus: {
                status: 'pending',
            },
            count: 0,
        }

        // Sending data via Axios
        try {
            const response = await useAxios.post("/cars", formData);
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Good job!",
                    text: "Car has been added.",
                    icon: "success"
                });
                form.reset()
                navigate('/my-cars')
            }
        } catch (error) {
            toast.error("Failed to add the car. Please try again later.");
        }
    }

    return (
        <div>
            <Helmet>
                <title>Add Car | Car Rental</title>
            </Helmet>
            <form
                onSubmit={handelAddCar}
                className="bg-white border my-10 shadow-md rounded px-8 pt-6 pb-8 max-w-3xl mx-auto"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">Add a New Car</h1>

                {/* Car Model */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="carModel">
                        Car Model <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name='carModel'
                        placeholder="Enter car model"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Daily Rental Price */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Daily Rental Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name='price'
                        placeholder="Enter rental price"
                        className="input input-bordered w-full"
                        min="0"
                        required
                        onChange={(e) => {
                            if (e.target.value < 0) e.target.value = 0;
                        }}
                    />
                </div>

                {/* Availability */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Availability <span className="text-red-500">*</span>
                    </label>
                    <select className="select select-bordered w-full" name='availability' required>
                        <option value="">Select</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>

                {/* Vehicle Registration Number */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Vehicle Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name='registration'
                        placeholder="Enter vehicle registration"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Features */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Features <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name='features'
                        placeholder="Enter features (e.g., GPS, AC)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name='location'
                        placeholder="Enter location"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Images <span className="text-red-500">*</span>
                    </label>
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
                    >
                        <input {...getInputProps()} required name="carImage" />
                        <p>Drag & drop images here, or click to select files</p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.preview}
                                    alt={`Preview ${index}`}
                                    className="rounded shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Enter description"
                        name='description'
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <button type="submit" className="btn btn-primary w-full text-lg max-w-xs">
                        Add Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
