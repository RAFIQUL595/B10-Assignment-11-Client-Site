import React from 'react';
import Banner from '../../components/Banner/Banner';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;