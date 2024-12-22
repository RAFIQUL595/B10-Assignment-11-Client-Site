import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdElectricBolt } from "react-icons/md";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <LiaCarSideSolid className="text-blue-400" />,
            title: "Wide Variety of Cars",
            description: "From budget-friendly options to luxury vehicles.",
        },
        {
            icon: <GiReceiveMoney className="text-green-400" />,
            title: "Affordable Prices",
            description: "Competitive daily rates you can count on.",
        },
        {
            icon: <MdElectricBolt className="text-yellow-500" />,
            title: "Easy Booking Process",
            description: "Seamlessly book your ride in just a few clicks.",
        },
        {
            icon: <FaPhoneAlt className="text-green-500" />,
            title: "Customer Support",
            description: "24/7 assistance for all your queries.",
        },
    ];

    return (
        <section className="py-12 bg-gray-50 mb-10">
            <div className="px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card border bg-white shadow-md p-6 text-center hover:shadow-lg"
                        >
                            <div className="text-4xl flex flex-col items-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
