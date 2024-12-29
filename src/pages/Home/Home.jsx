import React, { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import RecentListings from '../../components/RecentListings/RecentListings';
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';
import CarBrands from '../../components/CarBrands/CarBrands';
import { FadeLoader } from 'react-spinners';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-11/12 mx-auto">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <FadeLoader color="#36d7b7" loading={isLoading} size={80} />
                </div>
            ) : (
                <>
                    <Banner />
                    <WhyChooseUs />
                    <RecentListings />
                    <CarBrands />
                    <SpecialOffers />
                </>
            )}
        </div>
    );
};

export default Home;
