import React from 'react';
import Banner from '../../components/Banner/Banner';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import RecentListings from '../../components/RecentListings/RecentListings';
import Testimonial from '../../components/Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;