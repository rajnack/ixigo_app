"use client"

import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';


interface Feature {
    link: string;
    image: string;
    alt: string;
    width: number;
    height: number;
    name: string;
}

interface Card {
    id: number;
    image: string;
    alt: string;
}
interface ImageCard {
    id: number;
    image: string;
    alt: string;
    href: string;
}

const DoMoreWithIxigo = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [imageCards, setImageCards] = useState<ImageCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/v1/flight/features/')
            .then((response) => {
                console.log('Features response:', response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setFeatures(response.data.data);
                } else {
                    setFeatures([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching features:', error);
                setFeatures([]);
            });


        axios.get('http://127.0.0.1:8000/api/v1/flight/cards/')
            .then((response) => {
                console.log('cards response:', response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setCards(response.data.data);
                } else {
                    setCards([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching cards:', error);
                setCards([]);
            });

        axios.get('http://127.0.0.1:8000/api/v1/flight/imagecard/')
            .then((response) => {
                console.log('Image Cards response:', response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setImageCards(response.data.data);
                } else {
                    setImageCards([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching image cards:', error);
                setImageCards([]);
            });

    }, []);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <div className="flex flex-col gap-25 mt-[60px] px-20 xl:px-0">
                <h2 className="text-body-xl font-bold mb-[25px]">Do More With ixigo</h2>
                <div className="flex justify-between relative overflow-x-auto scrollbar-hide pt-[30px] py-[20px] px-0 rounded-[20px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] items-center space-x-0">
                    <div className="relative w-full my-auto mx-0 ">
                        <div className="flex order-3 overflow-x-auto scrollbar-hide overscroll-x-contain snap-x-mandatory scroll-smooth no-scrollbar !gap-0 justify-between">
                            {features.map((feature, index) => (
                                <div key={index} className="shrink-0 overflow-hidden rounded-xl max-w-[172px] w-full flex flex-col items-center pax-10 border-r-[1px] last:border-r-0 border-customNeutral px-4 !rounded-none last:border-r-0">
                                    <a href={feature.link} className="relative flex flex-col items-center min-w-[60px] text-center xl:hover:scale-[102%] inline-flex w-1/4 m-auto">
                                        <span className="flex flex-col items-center justify-center">
                                            <div style={{ width: feature.width, height: feature.height }}>
                                                <Image src={feature.image} alt={feature.alt} width={feature.width} height={feature.height} className="text-brand object-cover w-full h-full" />
                                            </div>
                                            <p className="text-sm text-custom-dark mt-3 flex items-center font-bold">
                                                {feature.name}
                                            </p>
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='pt-[35px]'>
                    <div className='flex flex-col py-[35px] '>
                        <h2 className='text-body-xxl font-bold'>Today s Flight Offers</h2>
                        <div className='relative w-full my-auto mx-0'>
                            <div className="flex order-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide scroll-smooth no-scrollbar py-[10px] offers-carousel-gutter gap-[25px] proximity-scroll-snapping">
                                {cards.slice(currentIndex, currentIndex + 12).map((card, index) => (
                                    <div
                                        key={index}
                                        className="shrink-0 overflow-hidden rounded-xl last:mr-20 first:ml-20 xl:first:ml-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-100 xl:duration-300 xl:ease-out"
                                    >
                                        <Link href={`/offers/${card.id}`}>
                                            <div className="w-[364px] h-[225px] rounded-20 object-cover cursor-pointer">
                                                <Image
                                                    src={card.image}
                                                    alt="cards"
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
                                    <div className='w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-blue-500 shadow-500 z-20 mb-15'>
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
                        <h2 className='text-body-xl font-bold pl-[20px] xl:pl-0 xl:pb-[10px]'>Why Book With ixigo?</h2>
                        <div className='realtive w-full my-auto mx-0'>
                            <div className='flex order-3 overflow-x-auto scrollbar-hide overscroll-x-contain snap-x-mandatory scroll-smooth no-scrollbar py-[15px] gap-[20px]'>
                                {imageCards.map((imageCard) => (
                                    <div key={imageCard.id} className='shrink-0 overflow-hidden rounded-xl last:mr-20 first:ml-20 xl:first:ml-0 xl:rounded-20 xl:transition-all xl:duration-300 xl:ease-in xl:hover:shadow-100 xl:duration-300 xl:ease-out'>
                                        <div className='w-[363px] h-[123px] rounded-20 object-cover'>
                                            <Image
                                                src={imageCard.image}
                                                alt={imageCard.alt}
                                                width={363}
                                                height={123}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoMoreWithIxigo;
