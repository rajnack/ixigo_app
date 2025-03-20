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
                <div className="flex items-center border-b pt-[20px] gap-[30px]">
                    {tabs.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`relative py-[5px] px-[8px] ${
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
                <div className="flex-grow pt-[20px] pb-[10px] flex flex-wrap">
                    {content[activeTab]?.map((route, index) => (
                        <a href="#" key={index} className="w-full basis-1/5 pb-2.5">
                            <p className="text-body-sm text-secondary">{route}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlightRoutes;
