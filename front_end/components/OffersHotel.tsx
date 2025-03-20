"use client"

import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Items {
    id: number;
    href: string;
    image: string;
    alt: string;
}

interface Service {
    id: number;
    image: string;
    alt: string;
}

export default function HotelsList() {
    const [items, setItems] = useState<Items[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {


        axios.get('http://127.0.0.1:8000/api/v1/hotel/items/')
            .then((response) => {
                console.log('items response:', response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setItems(response.data.data);
                } else {
                    setItems([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                setItems([]);
            });


        axios.get('http://127.0.0.1:8000/api/v1/hotel/services/')
            .then((response) => {
                console.log('services response:', response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setServices(response.data.data);
                } else {
                    setServices([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
                setServices([]);
            });

    }, []);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div className=''>
            <div className='flex flex-col py-[30px]'>
                <h2 className='text-body-xl font-bold text-primary mb-[20px]'>Offers For You</h2>
                <div className='relative w-full my-auto mx-0'>
                    <div className="flex order-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth no-scrollbar py-[10px] offers-carousel-gutter gap-[25px] proximity-scroll-snapping">
                        {items.slice(currentIndex, currentIndex + 12).map((item, index) => (
                            <div
                                key={index}
                                className="shrink-0 overflow-hidden rounded-xl last:mr-20 first:ml-20 xl:first:ml-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] xl:duration-300 xl:ease-out"
                            >
                                <Link href={`/offers/${item.id}`}>
                                    <div className='w-[364px] h-[225px] rounded-20 object-cover'>
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            width={364}
                                            height={225}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                </Link>
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

            <div className='mt-[30px] xl:m-0 xl:pt-[30px] xl:pb-[20px]'>
                <h2 className='text-body-xl font-bold  text-primary mb-[20px]'>Why Book Hotels With ixigo?</h2>
                <div className='relative w-full my-auto mx-0'>
                    <div className='flex order-3 overflow-x-auto overscroll-x-contain snap-x-mandatory scroll-smooth scrollbar-hide no-scrollbar  gap-[20px]'>
                        {services.slice(currentIndex, currentIndex + 5).map((service) => (
                            <div
                                key={service.id}
                                className="shrink-0 overflow-hidden rounded-xl last:mr-20 first:ml-20 xl:first:ml-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] xl:duration-300 xl:ease-out"
                            >
                                <div className='w-[363px] h-[123px] rounded-20 object-cover'>
                                    <Image
                                        src={service.image}
                                        alt={service.alt}
                                        width={363}
                                        height={123}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
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
                </div>
            </div>
        </div>
    );
}
