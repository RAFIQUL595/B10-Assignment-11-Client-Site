import React from 'react';
import Banner from '../../components/Banner/Banner';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import RecentListings from '../../components/RecentListings/RecentListings';
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';
import CarBrands from '../../components/CarBrands/CarBrands';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <CarBrands></CarBrands>
            <SpecialOffers></SpecialOffers>
        </div>
    );
};

export default Home;