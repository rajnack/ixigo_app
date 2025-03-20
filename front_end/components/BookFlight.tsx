"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import axios from "axios";

type City = {
    id: number;
    name: string;
    state: string;
    image: string;
    city: string;
    price: number;
};

type CityDate = {
    id: number;
    cityId: number;
    date: string;
};


const BookFlight = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [cityDates, setCityDates] = useState<CityDate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/v1/flight/cities/")
            .then((response) => {
                console.log("cities response:", response.data);
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setCities(response.data.data);
                } else {
                    setCities([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
                setCities([]);
            });

        axios
            .get("http://127.0.0.1:8000/api/v1/flight/city-dates/")
            .then((response) => {
                console.log("City Dates API Response: ", response.data);
                if (response.data?.data) {
                    setCityDates(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching city dates: ", error);
            });
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cities.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cities.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="xl:pt-0 xl:px-[10px] xl:rounded-[20px] xl:flex xl:flex-col xl:gap-[10px] xl:bg-white xl:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] xl:my-[30px] xl:pb-[40px]">
            <div className="xl:relative flex pb-[12px] top-0 px-[20px] bg-white mt-[30px]">
                <h2 className="text-body-xl font-bold mr-[5px]">Cheapest Fares From</h2>
                <div className="xl:relative">
                    <div className="text-custom-dark hover:bg-neutral-outline-over border-neutral-outline cursor-pointer min-h-[30px] icon-md text-body-sm inline-flex items-center font-normal rounded-full px-[6px] border border-black">
                        <span className="px-[5px]">
                            <span className="truncate max-w-[100px] block">New Delhi</span>
                        </span>
                        <ChevronDown className="w-[1em] h-[1em]" />
                    </div>
                </div>
            </div>
            <div className="px-[20px]">
                <div className="relative w-full my-auto mx-0">
                    <div className="flex w-full overflow-x-auto scrollbar-hide overscroll-x-contain snap-x snap-mandatory scroll-smooth no-scrollbar gap-[20px]">
                        {cities.slice(currentIndex, currentIndex + 12).map((city, index) => {
                            const cityDate = cityDates.find((date) => date.cityId === city.id);

                            return (
                                <div key={index} className="shrink-0 overflow-hidden rounded-xl flex flex-col border border-neutral-200 rounded-[20px] w-[352px] h-full">
                                    <div className="relative h-[210px] w-full">
                                        <Image
                                            src={city.image}
                                            alt="booking"
                                            layout="fill"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="px-[15px] py-[10px]">
                                        <div className="flex items-center">
                                            <p className="text-body-lg truncate font-bold">{city.city}</p>
                                            <p className="text-body-lg text-primary truncate font-normal">, {city.state}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                {cityDate ? (
                                                    <p className="text-body-sm text-sm text-secondary mt-[5px] font-normal">
                                                        {new Intl.DateTimeFormat('en-US', {
                                                            weekday: 'short',
                                                            day: '2-digit',
                                                            month: 'short',
                                                        }).format(new Date(cityDate.date))}
                                                    </p>
                                                ) : (
                                                    <p className="text-body-sm text-sm text-secondary mt-[5px] font-normal">Date not available</p>
                                                )}
                                                <div className="text-body-md text-primary flex items-center gap-[5px]">
                                                    <p className="text-body-md font-bold">{city.price}</p>
                                                    <span>onwards</span>
                                                </div>
                                            </div>
                                            <a href="booking">
                                                <button className="inline-flex justify-center items-center text-brand-outline hover:bg-brand-outline-over border-brand-outline border-[1.5px] gap-[5px] rounded-[10px] min-h-[40px] button-md icon-md px-[15px]">
                                                    Book Flight
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="flex order-1 mx-5 bg-transparent focus:outline-none absolute top-1/2 -translate-y-1/2 left-0"
                        onClick={handlePrev}
                    >
                        <div className="w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-center text-blue-500 shadow-500 z-20 mb-15 mr-10">
                            <ChevronLeft className="w-[2em] h-[2em]" />
                        </div>
                    </button>
                    <button
                        className="flex order-1 mx-5 bg-transparent focus:outline-none absolute top-1/2 -translate-y-1/2 right-0"
                        onClick={handleNext}
                    >
                        <div className="w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-center text-blue-500 shadow-500 z-20 mb-15 mr-10">
                            <ChevronRight className="w-[2em] h-[2em]" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookFlight;
