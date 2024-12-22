import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            image: "https://via.placeholder.com/150",
            rating: 5,
            review: "Amazing service and great experience! Highly recommend!",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://via.placeholder.com/150",
            rating: 4,
            review: "Very satisfied with the support and quality.",
        },
        {
            id: 3,
            name: "Alice Johnson",
            image: "https://via.placeholder.com/150",
            rating: 5,
            review: "Fantastic! Will definitely come back again.",
        },
    ];

    return (
        <div className="w-full lg:w-[70%] mb-10 flex flex-col mx-auto ">
            <h2 className="text-3xl font-bold text-center mb-6">User Testimonials</h2>
            <div className="px-4 border rounded-lg">
                <Slide autoplay={true} duration={5000} transitionDuration={1000}>
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="flex border lg:w-[400px] h-full mx-auto flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                            <div className="flex justify-center my-2">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i} className="text-yellow-500 text-xl">
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.review}"</p>
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default Testimonials;
