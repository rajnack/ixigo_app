"use client"

import Image from 'next/image';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Destination {
    image: string;
    title: string;
    subtitle: string;
    properties: number;
}
const PopularDestination = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/hotel/destinations/');
                console.log('Image Destinations response:', response.data);

                if (response.data?.data && Array.isArray(response.data.data)) {
                    setDestinations(response.data.data);
                } else {
                    setDestinations([]);
                }
            } catch (error) {
                console.error('Error fetching image destinations:', error);
                setDestinations([]);
            }
        };

        fetchDestinations();
    }, []);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? destinations.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === destinations.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className='flex flex-col py-[30px]'>
            <h2 className='text-body-xl font-bold text-primary mb-[20px]'>Offers For You</h2>
            <div className='relative w-full my-auto mx-0'>
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-[20px]">
                    {destinations.slice(currentIndex, currentIndex + 12).map((destination, index) => (
                        <div
                            key={index}
                            className="shrink-0 overflow-hidden rounded-xl last:mr-20 first:ml-20 xl:first:ml-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)]"
                        >
                            <a href="destinations">
                                <div className="max-w-[280px] w-full rounded-20 overflow-hidden">
                                    <div className="relative w-full overflow-hidden">
                                        <div className='w-[280px] h-[340px] overflow-hidden rounded-[20px]'>
                                            <Image
                                                src={destination.image}
                                                alt="destination"
                                                width={280}
                                                height={340}
                                                className="object-cover w-full h-full rounded-[20px]"
                                            />
                                        </div>

                                        <div className="rounded-[20px] absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end px-[20px] py-[15px] bg-gradient-to-t from-black/70 via-transparent">
                                            <h3 className="text-body-xxxl text-center text-white">{destination.title}</h3>
                                            <p className="text-body-2xs text-center uppercase text-white">{destination.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="rounded-[10px] rounded-b-[20px] border-t-0 rounded-tl-none rounded-tr-none border border-primary px-[20px] pb-[15px] pt-[25px] flex items-center justify-center gap-x-[5px]">
                                        <p className="text-body-lg text-primary">
                                            <strong className="font-bold">{destination.properties}</strong> Properties
                                        </p>
                                        <ArrowRight />
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                {currentIndex > 0 && (
                    <button
                        className='flex order-1 mx-5 bg-transparent focus:outline-none absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer'
                        onClick={handlePrev}
                    >
                        <div className='w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15 mr-10'>
                            <ChevronLeft className='w-[2em] h-[2em]' />
                        </div>
                    </button>
                )}

                <button className='flex order-1 mx-5 bg-transparent focus:outline-none  absolute top-1/2 -translate-y-1/2 right-0 flex order-2 mx-5 bg-transparent focus:outline-none cursor-pointer' onClick={handleNext}>
                    <div className='w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-center text-blue-500 shadow-500 z-20 mb-15 mr-10'>
                        <ChevronRight className='w-[2em] h-[2em]' />
                    </div>
                </button>
                <div className='flex justify-center mt-4'>
                    <div className='bg-customGray rounded-xl w-[40px] h-[5px] p-0 relative'>
                        <div
                            className='w-[5px] h-[5px] bg-blue-500 rounded-fill absolute transition-transform duration-300'
                            style={{ transform: `translateX(${currentIndex * 10}px)` }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularDestination;
