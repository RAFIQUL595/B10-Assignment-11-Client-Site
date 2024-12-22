import React from 'react';

const SpecialOffers = () => {
    return (
        <div className="flex flex-col items-center px-4 my-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Offer 1 */}
                <div className="card w-80 bg-white shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px] border">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900">Get 15% off for weekend rentals!</h3>
                        <button className="btn btn-primary w-full mt-4">Learn More</button>
                    </div>
                </div>

                {/* Offer 2 */}
                <div className="card w-80 bg-white shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px] border">
                    <div className="card-body">
                        <h3 className="text-lg font-semibold text-gray-900">Luxury cars at $99/day this holiday season!</h3>
                        <button className="btn btn-secondary w-full mt-4">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffers;
