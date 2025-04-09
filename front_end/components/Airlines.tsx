"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";


interface Airline {
  logo: string;
  name: string;
}
const Airlines = () => {
  const [airlines, setairlines] = useState<Airline[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/flight/airlines/")
      .then((response) => {
        console.log("Flights response:", response.data);
        if (response.data?.data && Array.isArray(response.data.data)) {
          setairlines(response.data.data);
        } else {
          setairlines([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
        setairlines([]);
      });
  }, []);
  return (
    <div className="py-[30px] flex flex-col gap-[20px] px-[20px] xl:px-0">
      <h2 className="text-primary text-body-xl font-bold">Popular Domestic Airlines</h2>
      <div className="flex md:gap-[15px] p-[20px] rounded-[20px] border border-[#E4E4E7] sm:gap-[10px] xxs:flex-col xxs:gap-[10px] smx:flex-row smx:gap-[1px]">
        {airlines.map((airline, index) => (
          <a href="#" key={index} className="flex flex-col gap-[5px] flex-1 items-center">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src={airline.logo}
                alt={airline.name}
                width={100}
                height={100}
                className="w-full h-full absolute left-0 right-0 top-0 bottom-0"
              />
            </div>
            <p className="md:text-body-md text-link font-bold text-blue-500 sm:text-[10px] smx:text-[10px]">{airline.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Airlines;
