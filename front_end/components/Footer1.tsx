"use client";

import React, { useState, useEffect } from "react";

const FlightRoutes = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    const tabs = [
        "Popular Flight Routes",
        "Top Flight Routes",
        "Trending Flight Routes",
        "Airlines",
        "Popular Airlines Routes",
    ];

    const content = [
        [
            "Delhi to Kolkata flights",
            "Delhi to Hyderabad flights",
            "Delhi to Jaipur flights",
            "Delhi to Ahmedabad flights",
            "Bengaluru to Kolkata flights",
            "Delhi to Dharmsala flights",
            "Delhi to Kochi flights",
            "Chennai to Coimbatore flights",
            "Delhi to Kochi flights",
            "Delhi to Patna flights",
            "Bengaluru to Kolkata flights",
            "Mumbai to Hyderabad flights",
            "Delhi to Chandigarh flights",
            "Delhi to Amritsar flights",
            "Bangalore to Pune flights",
            "Mumbai to Chennai flights",
            "Bengaluru to Kochi flights",
            "Mumbai to Jaipur flights",
            "Coimbatore to Chennai flights",
            "Bengaluru to Kolkata flights",
        ],
        [
            "Patna to Delhi flights",
            "Delhi to Lucknow flights",
            "Hyderabad to Tirupati flights",
            "Mumbai to Hyderabad flights",
            "Lucknow to Delhi flights",
            "Mumbai to Kolkata flights",
            "Delhi to Port Blair flights",
            "Hyderabad to Vishakhapatnam flights",
            "Mumbai to Kochi flights",
            "Mumbai to Kolhapur flights",
            "Delhi to Udaipur flights",
            "Mumbai to Chandigarh flights",
            "Bengalore to Mangalore flights",
            "Delhi to Bhubaneswar flights",
            "Delhi to Indore flights",
            "Chennai to Madurai flights",
            "Bengaluru to Shivamogga flights",
            "Kochi to Bengaluru flights",
            "Chennai to Madurai flights",
            "Delhi to Varanasi flights",
        ],
        [
            "Mumbai to Chennai flights",
            "Bangalore to Pune flights",
            "Mumbai to Jaipur flights",
            "Coimbatore to Chennai flights",
            "Bengaluru to Kolkata flights",
            "Chennai to Hyderabad flights",
            "Delhi to Amritsar flights",
            "Mumbai to Ahmedabad flights",
            "Delhi to Chandigarh flights",
            "Delhi to Patna flights",
            "Patna to Delhi flights",
            "Delhi to Lucknow flights",
            "Hyderabad to Tirupati flights",
            "Mumbai to Hyderabad flights",
            "Lucknow to Delhi flights",
            "Mumbai to Kolkata flights",
            "Delhi to Port Blair flights",
            "Hyderabad to Vishakhapatnam flights",
            "Mumbai to Kochi flights",
            "Mumbai to Kolhapur flights",
        ],
        ["Air India", "IndiGo", "SpiceJet", "Air India express", "Akasa Air", "Vistara", "View All"],
        [
            "Patna to Delhi flights",
            "Delhi to Lucknow flights",
            "Hyderabad to Tirupati flights",
            "Mumbai to Hyderabad flights",
            "Lucknow to Delhi flights",
            "Mumbai to Kolkata flights",
            "Delhi to Port Blair flights",
            "Hyderabad to Vishakhapatnam flights",
            "Mumbai to Kochi flights",
            "Mumbai to Kolhapur flights",
            "Delhi to Udaipur flights",
            "Mumbai to Chandigarh flights",
            "Bengalore to Mangalore flights",
            "Delhi to Bhubaneswar flights",
            "Delhi to Indore flights",
            "Chennai to Madurai flights",
            "Bengaluru to Shivamogga flights",
            "Kochi to Bengaluru flights",
            "Chennai to Madurai flights",
            "Delhi to Varanasi flights",
        ],
    ];

    return (
        <div className="bg-charcoal w-full px-5 xl:px-0">
            <div className="wrapper flex flex-col">
                {/* Tabs */}
                <div className="flex items-center border-b pt-[20px] gap-[30px] sm:gap-0 xxs:gap-0">
                    {tabs.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`relative py-[5px] px-[8px] md:text-[16px] sm:text-[12px] xxs:text-[10px] ${
                                activeTab === index
                                    ? "text-selection-outline before:bg-current hover:bg-selection-over"
                                    : "text-primary hover:bg-primary-over before:bg-transparent"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-grow pt-[20px] pb-[10px] flex flex-wrap xxs:gap-[15px] smx:gap-0">
                    {content[activeTab]?.map((route, index) => (
                        <a href="#" key={index} className="w-full basis-1/5 pb-2.5">
                            <p className="md:text-body-sm text-secondary sm:text-[10px] xxs:text-[10px]">{route}</p>
                        </a>
                    ))}
                </div>
                <div className="border-t border-t-[rgb(214_215_219)]"></div>
                <div className="px-[20px] py-[30px] xl:py-[20px] xl:px-0">
                    <p className="text-body-xs text-secondary font-medium">Important Links</p>
                    <div className="flex flex-wrap gap-x-[20px] pt-[10px] xl:pt-[5px] x:gap-0">
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Indigo Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Air India Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Spicejet Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Vistara Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Student Flight Booking</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Senior Citizen Flight Booking</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Armed Forces Flight Booking</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Air India Express Flight Status</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">International Flights</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Flights Offers</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Travel Stories</a>
                        </p>
                        <p className="text-body-xs text-secondary pb-[5px] mr-[5px] mt-[10px] xl:mt-0 xl:py-[5px] xl:pr-[10px] xl:text-[12px]">
                            <a href="flight status">Responsible Disclosure</a>
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default FlightRoutes;
