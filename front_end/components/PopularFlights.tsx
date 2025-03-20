"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface Flight {
  image: string;
  altText: string;
  title: string;
  destinations: string[];
}

export default function FlightsList() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/flight/flights/")
      .then((response) => {
        console.log("Flights response:", response.data);
        if (response.data?.data && Array.isArray(response.data.data)) {
          setFlights(response.data.data);
        } else {
          setFlights([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
        setFlights([]);
      });
  }, []);

  return (
    <div className="flex flex-col px-[20px] mt-[30px] xl:mt-0 xl:py-[30px] xl:px-0">
      <h2 className="text-primary py-[5px] mb-[15px] xl:pt-0 xl:pt-0 text-xl font-bold">
        Popular Flight Routes
      </h2>
      <div className="flex flex-col gap-[15px] xl:flex-row xl:flex-wrap xl:gap-0">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`xl:basis-1/3 xl:pb-[15px] ${
              index % 3 !== 0 ? "xl:pl-[20px]" : ""
            }`}
          >
            <div className="flex rounded-[10px] items-stretch border border-neutral-200 overflow-hidden">
              <div className="relative w-[50px] h-[60px]">
               <div  className="xl:h-[82px] w-[52px] h-[60px] object-cover">
               <Image
                  src={flight.image}
                  alt="flights"
                  width={50}
                  height={60}
                  className="object-cover w-full h-full"
                />
               </div>
              </div>
              <div className="px-[10px] py-[2px] xl:py-[15px]">
                <p className="text-body-lg text-primary font-bold">{flight.title}</p>
                <div className="flex items-start gap-[5px]">
                  <p className="text-body-md text-secondary">To:</p>
                  <div className="flex items-center gap-[10px] flex-wrap">
                    {flight.destinations.map((destination, destIndex) => (
                      <div key={destIndex} className="flex items-center gap-[10px]">
                        {destIndex !== 0 && (
                          <p className="text-body-md text-subbrand-500">•</p>
                        )}
                        <p className="text-body-md text-subbrand-500">
                          <a href="destination">{destination}</a>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
