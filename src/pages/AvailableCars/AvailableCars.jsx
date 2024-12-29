import React, { useEffect, useState } from 'react';
import { CiBoxList, CiGrid41, CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import useAxios from '../../hooks/useAxios';


const AvailableCars = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isGridView, setIsGridView] = useState(true);
    const [sortOption, setSortOption] = useState('dateDesc');
    const [cars, setCars] = useState([]);
    const axiosSecure=useAxios()


    useEffect(() => {
        const fetchAllCars = async () => {
            const { data } = await axiosSecure.get('/cars');
            setCars(data);
        };
        fetchAllCars();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter cars based on the search query
    const filteredCars = cars.filter((car) =>
        car.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort cars based on the selected option
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

    // Toggle between grid and list views
    const toggleView = () => {
        setIsGridView((prev) => !prev);
    };

    // Apply sorting to filtered cars
    const sortedFilteredCars = sortCars(filteredCars, sortOption);

    return (
        <div className='my-10'>
            <Helmet>
                <title>Available Cars | Car Rental</title>
            </Helmet>
            {/* Search Bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by model, brand, or location"
                className="w-full lg:ml-[20%] lg:w-[50%] p-3 mb-6 border border-gray-300 rounded-md"
            />

            <div className='flex justify-between items-center gap-3'>
                <div>
                    {/* Sorting Dropdown */}
                    <label className="mr-2 font-bold">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="mb-6 p-3 border border-gray-300 rounded-md"
                    >
                        <option value="dateDesc">Newest First (Date)</option>
                        <option value="dateAsc">Oldest First (Date)</option>
                        <option value="priceAsc">Lowest Price First</option>
                        <option value="priceDesc">Highest Price First</option>
                    </select>
                </div>

                <div className='mb-5'>
                    {/* Toggle Button for Grid/List View */}
                    <button
                        onClick={toggleView}
                        className=" rounded-md transition-all"
                    >
                        {isGridView ? <CiBoxList className='size-10' /> : <CiGrid41 className='size-10' />}
                    </button>
                </div>
            </div>

            {/* Cars View */}
            <div
                className={`${isGridView ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8' : 'space-y-6'}`}
            >
                {sortedFilteredCars.filter(car => car?.availability === "Available").map((car) => (
                    <div
                        key={car._id}
                        className={`${isGridView
                            ? 'bg-white border mb-5 border-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-2 transition-all duration-300 ease-in-out'
                            : 'bg-white border border-gray-200 rounded-lg shadow-md p-4 flex items-center'
                            }`}
                    >
                        <img
                            src={car.carImage}
                            alt={car.carModel}
                            className={`${isGridView ? 'w-full h-48 object-cover rounded-t-lg' : 'w-36 md:w-60 h-40 md:h-48 object-cover mr-4'}`}
                        />
                        <div className={isGridView ? 'p-4 space-y-2' : 'flex flex-col justify-center space-y-2'}>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">Car Model: {car.carModel}</h3>
                            <p className="md:text-lg font-bold text-gray-700">Price: ${car.price}</p>
                            <p className="text-sm md:text-lg text-gray-600 flex items-center gap-2"><CiLocationOn />{car.location}</p>
                            <p className="text-sm text-gray-700">Date Added: {new Date(car.dateAdded).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>

                            {/* Book Now Button */}
                            <Link to={`/car-details/${car._id}`}>
                                <button className="px-6 w-full mt-2 py-3 bg-primary border-none text-white text-lg rounded">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableCars;
