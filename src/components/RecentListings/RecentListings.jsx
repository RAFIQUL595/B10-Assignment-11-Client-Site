import React from "react";

const RecentListings = () => {
    const cars = [
        {
            id: 1,
            image: "https://i.ibb.co.com/6NyB8rg/mlp-img-perf.jpg",
            model: "Toyota Camry 2023",
            price: "$45/day",
            availability: "Available",
            datePosted: "Added 2 days ago",
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/NsKKtQL/523292-honda-accord-hybride-2022-l-hybride-pseudo-sportive.jpg",
            model: "Honda Accord 2022",
            price: "$40/day",
            availability: "Unavailable",
            datePosted: "Added 5 days ago",
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/5YS88r9/tesla-model-3-highland-2023-04-min-e1697633950390.jpg",
            model: "Tesla Model 3 2023",
            price: "$65/day",
            availability: "Available",
            datePosted: "Added 1 day ago",
        },
    ];

    return (
        <div className="mb-10">
            <h2 className="text-4xl font-bold text-center mb-6">Recent Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className="card bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 rounded-lg overflow-hidden"
                    >
                        <img
                            src={car.image}
                            alt={car.model}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-bold">{car.model}</h3>
                            <p className="text-gray-500">{car.price}</p>
                            <span
                                className={`badge ${car.availability === "Available"
                                        ? "badge-success"
                                        : "badge-error"
                                    }`}
                            >
                                {car.availability}
                            </span>
                            <p className="text-sm text-gray-400 mt-2">{car.datePosted}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentListings;
