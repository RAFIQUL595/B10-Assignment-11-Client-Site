import React from 'react';
import Marquee from 'react-fast-marquee';

const CarBrands = () => {
    const brands = [
        {
            image: 'https://i.ibb.co.com/ydSphCv/images.png'
        },
        {
            image: 'https://i.ibb.co.com/smGybRn/ford-logo-1-preview.jpg'
        },
        {
            image: 'https://i.ibb.co.com/Y02FjKP/images-1.png'
        },
        {
            image: 'https://i.ibb.co.com/Cw8Cd8k/images-2.png'
        },
        {
            image: 'https://i.ibb.co.com/TK8MpKY/chattogram-bangladesh-may-29-2023-600nw-2309781029.jpg'
        },
        {
            image: 'https://i.ibb.co.com/4SgDYVb/Audi-logo-1999.png'
        },
        {
            image: 'https://i.ibb.co.com/3pS4FPn/png-transparent-nissan-car-logo-nissan-emblem-trademark-desktop-wallpaper.png'
        },
        {
            image: 'https://i.ibb.co.com/MZ1d9n4/images.png'
        }
    ];

    return (
        <div>
            <h2 className='text-3xl text-center font-bold'>Car Brands</h2>
            <Marquee speed={50}>
                <div className="flex my-5">
                    {brands.map((brand, index) => (
                        <div key={index} className="mx-4">
                            <img className='w-40 h-20' src={brand.image} alt='logo' />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default CarBrands;
