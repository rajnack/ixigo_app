"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import styles from './SearchButton.module.css';
import HotelsList from "./OffersHotel";
import PopularDestination from "./Destinations";
import BookingFaqs from "./HotelFaqs";
import Services from "./HotelServices";
import Features from "./FeaturesHotel";
import HeaderHotel from "./Header2.5";

const Navigation = () => {
    const navItems = [
        {
            href: "/",
            src: "/images/flight.svg",
            label: "Flights",
        },
        {
            href: "/hotels",
            src: "/images/hotel.svg",
            label: "Hotels",
            badge: "Up to 50% Off",
            isActive: true,
        },
        {
            href: "/trains",
            src: "/images/train.svg",
            label: "Trains",
        },
        {
            href: "/buses",
            src: "/images/bus.svg",
            label: "Buses",
        },
    ];

    return (
        <ul className="flex justify-between text-base font-normal gap-6 px-0">
            {navItems.map((item, index) => (
                <li
                    key={index}
                    className={`relative pb-2 text-sm text-center font-medium ${item.isActive ? "text-custom-dark" : "text-custom-gray"
                        }`}
                >
                    <a
                        href={item.href}
                        className="flex items-center gap-5 cursor-pointer"
                    >
                        <div className="w-[50px] flex justify-center xl:w-auto">
                            <Image
                                src={item.src}
                                alt={item.label}
                                width={40}
                                height={40}
                                className="w-[60px] h-[60px]"
                            />
                        </div>
                        {item.badge && (
                            <div className="inline-flex items-center font-normal bg-custom-purple text-white absolute top-[-9px] left-[17px] px-2  rounded-[10px]">
                                <p className="text-body-2xs">{item.badge}</p>
                            </div>
                        )}
                        <p className="text-xl font-semibold">{item.label}</p>
                        {item.isActive && (
                            <p className="w-full bg-[#0770E4] absolute bottom-0 rounded left-0 h-2"></p>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const Hotel = () => {
    const [destination, setDestination] = useState("Goa");
    const [roomsGuests, setRoomsGuests] = useState("1 Room, 2 Guests");
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

    useEffect(() => {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(checkInDate.getDate() + 1);
        setCheckOutDate(nextDay);
    }, [checkInDate]);

    return (
        <div className="wrapper mainContainer">
            <div className="relative pt-[40px]">
                <HeaderHotel />
                <div className="hom-container">
                    <div className="px-7 z-20 flex justify-between items-center gap-10 relative">
                        <Navigation />
                        <h1 className="text-body-lg text-custom-active text-primary">Cheap Hotel Booking Online</h1>
                    </div>
                    <div className="rounded-[20px] bg-text-primary p-[20px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)]">
                        <div className="z-20 flex gap-1">
                            {/* Destination */}
                            <div className="flex-1 flex-shrink-0 text-primary relative">
                                <div className="flex-1 flex-shrink-0 text-primary cursor-pointer rounded-1-10 bg-neutral-40 pt-[10px] border-transparent flex cursor-pointer px-[15px] pb-[7px] border-bottom-width:3px">
                                    <div className="flex-1">
                                        <p className="text-body-xs text-secondary">Destination</p>
                                        <input
                                            placeholder="Enter city, area or property name"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)} // Fix: Add onChange
                                            className="w-full focus:outline-none bg-transparent text-body-xl font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Check-in and Check-out */}
                            <div className="flex flex-[0_0_36%] gap-1 relative max-w-[590px]">
                                <div className="flex-1 flex-shrink-0 text-primary cursor-pointer bg-neutral-40 pt-[10px] border-transparent flex cursor-pointer px-[15px] pb-[7px] border-bottom-width:3px">
                                    <div className="flex-1">
                                        <p className="text-body-xs text-secondary">Check-in</p>
                                        <DatePicker
                                            selected={checkInDate}
                                            onChange={(date) => setCheckInDate(date)}
                                            dateFormat="EEE, dd MMM"
                                            className="w-full focus:outline-none bg-transparent text-body-xl font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex-shrink-0 text-primary cursor-pointer bg-neutral-40 pt-[10px] border-transparent flex cursor-pointer px-[15px] pb-[7px] border-bottom-width:3px">
                                    <div className="flex-1">
                                        <p className="text-body-xs text-secondary">Check-out</p>
                                        <DatePicker
                                            selected={checkOutDate}
                                            onChange={(date) => setCheckOutDate(date)}
                                            dateFormat="EEE, dd MMM"
                                            className="w-full focus:outline-none bg-transparent text-body-xl font-medium"
                                            minDate={checkInDate}
                                            readOnly
                                            showPopperArrow={true}
                                            open={isCheckOutOpen}
                                            onClickOutside={() => setIsCheckOutOpen(false)}
                                            onFocus={() => setIsCheckOutOpen(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Rooms & Guests */}
                            <div className="flex-[0_0_17%] max-w-[250px] relative">
                                <div className="flex-1 flex-shrink-0 text-primary cursor-pointer bg-neutral-40 pt-[10px] border-transparent flex cursor-pointer px-[15px] pb-[7px] border-bottom-width:3px">
                                    <div className="flex-1">
                                        <p className="text-body-xs text-secondary">Rooms & Guests</p>
                                        <input
                                            placeholder="Select"
                                            value={roomsGuests}
                                            onChange={(e) => setRoomsGuests(e.target.value)} // Fix: Add onChange
                                            className="w-full focus:outline-none bg-transparent text-body-xl font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Search Button */}
                            <button className={`w-[194px] flex items-center justify-center bg-[#fc790d] text-white hover:bg-[#f5871d] gap-1.5 rounded-r-lg rounded-l-none min-h-[50px] px-5 flex-shrink-0 ${styles['hover-move-right']}`}>
                                <div className="flex items-center gap-1.5 font-medium text-body-lg">
                                    Search
                                    <div className={`h-6 w-6 transform ${styles['animated-icon']}`}>
                                        <ChevronRight />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <HotelsList />
                <PopularDestination />
                <BookingFaqs />
                <Services />
                <Features />
            </div>
        </div>
    );
};
export default Hotel;
