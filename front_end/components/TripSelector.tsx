"use client";

import { useState, useEffect } from "react";

const TripSelector = () => {
    const [activeTrip, setActiveTrip] = useState<string | null>(null);

    useEffect(() => {
        setActiveTrip("One Way"); 
    }, []);

    if (!activeTrip) return null; 

    return (
        <div className="flex items-center gap-4 justify-center">
            <button
                className={`flex items-center transition-all min-h-[40px] py-5 px-4 rounded-full ${
                    activeTrip === "One Way"
                        ? "border-2 border-blue-500 text-blue-500 bg-transparent"
                        : "border-2 bg-white text-black border-gray-300"
                } hover:bg-blue-100`}
                onClick={() => setActiveTrip("One Way")}
            >
                One Way
            </button>
            <button
                className={`flex items-center transition-all min-h-[40px] py-5 px-4 rounded-full ${
                    activeTrip === "Round Trip"
                        ? "border-2 border-blue-500 text-blue-500 bg-transparent"
                        : "border-2 bg-white text-black border-gray-300"
                } hover:bg-blue-100`}
                onClick={() => setActiveTrip("Round Trip")}
            >
                Round Trip
            </button>
        </div>
    );
};

export default TripSelector;
