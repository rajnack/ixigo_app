"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollingInfoBox from "./Scrolling";
import TripSelector from "./TripSelector";
import { ChevronRight, Check, CircleX } from "lucide-react";
import HeaderPage from "./Header2";


const Navigation = () => {
    const navItems = [
        {
            href: "/",
            src: "/images/flight.svg",
            label: "Flights",
            isActive: true,
        },
        {
            href: "/hotels",
            src: "/images/hotel.svg",
            label: "Hotels",
            badge: "Up to 50% Off",
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
        <ul className="flex justify-between text-base font-normal gap-20 px-0 xxs:gap-[10px]">
            {navItems.map((item, index) => (
                <li
                    key={index}
                    className={`relative pb-2 text-sm text-center font-medium ${item.isActive ? "text-custom-dark" : "text-custom-gray"
                        }`}
                >
                    <a
                        href={item.href}
                        className="flex items-center gap-5 cursor-pointer sm:flex-row xxs:flex-col"
                    >
                        <div className="w-[60px] h-[60px] flex justify-center xl:w-auto">
                            <Image
                                src={item.src}
                                alt={item.label}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {item.badge && (
                            <div className="inline-flex items-center sm:block xxs:hidden font-normal bg-custom-purple text-white absolute top-[-9px] left-[17px] px-[5px]  rounded-[10px]">
                                <p className="text-body-2xs">{item.badge}</p>
                            </div>
                        )}
                        <p className="sm:text-sm xl:text-xl font-semibold">{item.label}</p>
                        {item.isActive && (
                            <p className="w-full bg-[#0770E4] absolute bottom-0 rounded left-0 h-5"></p>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const NavPage = () => {

    const [currentDate, setCurrentDate] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [hovered, setHovered] = useState<string>("");
    const [activeType, setActiveType] = useState<string>("");


    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("default", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
        setCurrentDate(formattedDate);
    }, []);


    const handleSearchClick = () => {
        if (from.trim() && to.trim()) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
            setFrom("");
            setTo("");
        } else {
            console.log("Both inputs are required.");
        }
    };


    const handleMouseEnter = (type: string) => {
        setHovered(type);
    };

    const handleMouseLeave = () => {
        setHovered("");
    };

    const handleTypeClick = (type: string) => {
        setActiveType(type);
    };

    const handleCloseClick = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        setActiveType("");
    };

    const content = {
        Student: {
            title: "For travellers 12 years and above",
            description: "Enjoy exclusive discounts and offers.",
        },
        "Senior Citizen": {
            title: "For senior citizens",
            description: "Special benefits and perks for seniors.",
        },
        "Armed Forces": {
            title: "For armed forces personnel",
            description: "Honoring our heroes with unique rewards.",
        },
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked((prev) => !prev);
    };
    return (
        <div className="relative pt-[40px] xxs:pt-[25px]">
            <HeaderPage />
            <div className="px-7 z-20 flex justify-between items-center relative">
                <Navigation />
                <h1 className="lg:text-lg sm:text-sm text-custom-active sm:hidden xxs:hidden md:block">Flight Booking</h1>
            </div>
            <div className="border-0 border-solid border-[#e5e7eb] box-border rounded-[20px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] p-7 flex flex-col gap-[10px] bg-white">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <TripSelector />
                    </div>
                    <ScrollingInfoBox />
                </div>
                <div className="xl:flex xl:gap-0.5 xl:h-[60px]  ">
                    <div className="relative flex gap-0.5 flex-1 border-b-1 border-neutral-300 xxs:flex-col smx:flex-row">
                        <div className="bg-gray-200 bg-opacity-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none rounded-1-10 sm:rounded-bl-none xxs:rounded-bl-none xxs:rounded-tr-10 xxs:mb-0.5 sm:mb-0.5 smx:rounded-tr-none smx:mb-0">
                            <div className="flex justify-between items-center relative w-full h-full block">
                                <div className="flex-1 h-full flex flex-col justify-center py-2.5 px-4">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <p className="text-body-lg xl:max-w-[190px] md:max-w-[100px] truncate text-custom-gray font-normal font-medium">
                                                <input
                                                    className="text-body-lg xl:max-w-[190px] md:max-w-[100px] truncate text-custom-gray font-normal font-medium bg-transparent border-none focus:outline-none"
                                                    type="text"
                                                    placeholder="From"
                                                    value={from}
                                                    onChange={(e) => setFrom(e.target.value)}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 bg-opacity-40 flex items-center relative w-full h-[60px] hover:bg-neutral-subtle-over border-none xl:rounded-none sm:rounded-tr-10 md:rounded-tr-10  smx:rounded-tr-10">
                            <div className="flex justify-between items-center relative w-full h-full pl-7 block sm:pl-0 xxs:pl-0">
                                <div className="flex-1 h-full flex flex-col justify-center py-2.5 px-4">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <p className="text-body-lg xl:max-w-[190px] lg:max-w-[100px] truncate text-custom-gray font-normal font-medium">
                                                <input
                                                    className="text-body-lg xl:max-w-[190px] lg:max-w-[100px] truncate text-custom-gray font-normal font-medium bg-transparent border-none focus:outline-none"
                                                    type="text"
                                                    placeholder="To"
                                                    value={to}
                                                    onChange={(e) => setTo(e.target.value)}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between xl:border-none xxs:flex-col xl:w-[580px] md:w-[680px] smx:flex-row smx:w-[500px] sm:mt-0 xxs:mt-[5px] relative md:w-[320px] xxs:w-[250px] xs:w-[290px] xsm:w-[365px] gap-0.5 overflow-visible calendarInput sm:w-full sm:border-b border-charcoal-400 ">
                        <div className="bg-gray-200 bg-opacity-40 hover:bg-neutral-subtle-over w-full">
                            <div className="flex justify-between items-center relative w-full h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                <div className="flex-1 h-full flex flex-col justify-center py-2.5 px-4 ">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <p className="text-body-2xs text-custom-gray">Departure</p>
                                            <p className="text-body-lg xxs:text-[18px] md:max-w-[190px] truncate text-custom-active  font-normal font-medium font-semibold">
                                                {currentDate || "16 Jan"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 bg-opacity-40 border-gray-200 hover:bg-neutral-subtle-over hover:border-contrast w-full">
                            <div className="flex justify-between items-center relative w-full h-[60px] justify-center border-b-4 lg:min-h-[60px] border-transparent">
                                <div className="flex-1 h-full flex flex-col justify-center py-2.5 px-4">
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <p className="text-body-lg max-w-[190px] truncate text-custom-gray font-normal font-medium">
                                                <span className="absolute top-20">Return</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-visible xl:mt-0 xxs:mt-[5px]">
                        <div className="flex justify-between items-center relative md:h-[60px] xl:w-[280px] md:w-[680px] xxs:w-[250px] xs:w-[290px] xsm:w-[365px] smx:w-[500px] bg-gray-200 bg-opacity-40 hover:bg-neutral-subtle-over border-b-4 py-0.5 flex justify-center md:h-[60px] border-transparent sm:w-full sm:border-t-1 border-neutral-300">
                            <div className="flex-1 h-full flex flex-col justify-center md:py-2.5 sm:px-4 sm:pb-0">
                                <div className="flex items-center !border-none">
                                    <div className="flex flex-col">
                                        <p className="text-body-2xs text-custom-gray">
                                            Travellers & Class
                                        </p>
                                        <p className="text-body-lg xxs:text-[18px] max-w-[190px] truncate text-custom-active  font-normal font-medium font-semibold">
                                            1 Traveller, Economy
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSearchClick}
                        className="inline-flex justify-center xxs:w-full md:text-body-xxl xxs:text-[20px] items-center bg-[#fc790d] text-white hover:bg-[#f5871d] gap-[5px]  min-h-[50px] text-2xl xl:w-[200px] px-[25px] pr-[15px] md:rounded-none xl:rounded-none xl:rounded-br-[10px] xl:rounded-tr-[10px] md:rounded-br-[10px] md:rounded-bl-[10px] sm:rounded-10 sm:rounded-tl-none sm:rounded-tr-none sm:w-full xxs:rounded-10 xxs:rounded-tl-none xxs:rounded-tr-none xxs:w-full"
                    >
                        Search
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
                <div className="xl:flex xl:justify-between xl:items-center xl:border-none pb-0 pl-0 sm:flex-row sm:justify-between sm:items-center ">
                    <div className="flex md:gap-4 !flex-row justify-start sm:mb-[10px] sm:gap-[5px] xxs:gap-[10px] xxs:mb-[10px]">
                        <div className="flex gap-5 items-center relative">
                            <p className="md:text-body-lg sm:text-body-sm flex text-custom-dark gap-[3px] font-bold xxs:text-[10px]">
                                Special Fares
                                <span className="font-normal text-custom-gray">
                                    (Optional)
                                </span>
                                <span className="block text-custom-gray">:</span>
                            </p>
                        </div>
                        <div className="flex md:gap-10 xl:gap-7 sm:gap-[5px] xxs:flex-col smx:flex-row xxs:gap-[10px]">

                            <div
                                className={`relative text-custom-dark border-custom-dark h-[35px] icon-md text-body-sm inline-flex items-center font-normal rounded-full px-2 border border-solid shrink-0 ${activeType === "Student"
                                    ? "bg-[rgb(7,112,228)] text-white hover:bg-blue-800 cursor-pointer"
                                    : "bg-transparent text-custom-dark hover:bg-neutral-subtle-over cursor-pointer"
                                    }`}
                                onClick={() => handleTypeClick("Student")}
                                onMouseEnter={() => handleMouseEnter("Student")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="px-2">Student</span>
                                {activeType === "Student" && (
                                    <CircleX
                                        className="ml-2 cursor-pointer"
                                        onClick={(event) => handleCloseClick(event)}
                                    />
                                )}
                                {hovered === "Student" && (
                                    <div className="absolute top-[40px] left-0 bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[250px] z-10">
                                        <p className="text-sm font-semibold text-gray-700">{content["Student"].title}</p>
                                        <p className="text-sm text-gray-600 bg-[#f5f5dc] border border-[#e0e0e0] p-2 rounded-md mt-2">
                                            {content["Student"].description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative text-custom-dark border-custom-dark h-[35px] icon-md text-body-sm inline-flex items-center font-normal rounded-full px-2 border border-solid shrink-0 ${activeType === "Senior Citizen"
                                    ? "bg-[rgb(7,112,228)] text-white hover:bg-blue-800 cursor-pointer"
                                    : "bg-transparent text-custom-dark hover:bg-neutral-subtle-over cursor-pointer"
                                    }`}
                                onClick={() => handleTypeClick("Senior Citizen")}
                                onMouseEnter={() => handleMouseEnter("Senior Citizen")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="px-2">Senior Citizen</span>
                                {activeType === "Senior Citizen" && (
                                    <CircleX
                                        className="ml-2 cursor-pointer"
                                        onClick={(event) => handleCloseClick(event)}
                                    />
                                )}
                                {hovered === "Senior Citizen" && (
                                    <div className="absolute top-[40px] left-0 bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[250px] z-10">
                                        <p className="text-sm font-semibold text-gray-700">{content["Senior Citizen"].title}</p>
                                        <p className="text-sm text-gray-600 bg-[#f5f5dc] border border-[#e0e0e0] p-2 rounded-md mt-2">
                                            {content["Senior Citizen"].description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative text-custom-dark border-custom-dark h-[35px] icon-md text-body-sm inline-flex items-center font-normal rounded-full px-2 border border-solid shrink-0 ${activeType === "Armed Forces"
                                    ? "bg-[rgb(7,112,228)] text-white hover:bg-blue-800 cursor-pointer"
                                    : "bg-transparent text-custom-dark hover:bg-neutral-subtle-over cursor-pointer"
                                    }`}
                                onClick={() => handleTypeClick("Armed Forces")}
                                onMouseEnter={() => handleMouseEnter("Armed Forces")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="px-2">Armed Forces</span>
                                {activeType === "Armed Forces" && (
                                    <CircleX
                                        className="ml-2 cursor-pointer"
                                        onClick={(event) => handleCloseClick(event)}
                                    />
                                )}
                                {hovered === "Armed Forces" && (
                                    <div className="absolute top-[40px] left-0 bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-[250px] z-10">
                                        <p className="text-sm font-semibold text-gray-700">{content["Armed Forces"].title}</p>
                                        <p className="text-sm text-gray-600 bg-[#f5f5dc] border border-[#e0e0e0] p-2 rounded-md mt-2">
                                            {content["Armed Forces"].description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-fit rounded-10 p-[5px] bg-custom-sky">
                        <div className="style_hotelUpsellInput__utb7k flex gap-5">
                            <span
                                className={`relative shrink-0 inline-flex items-center justify-center w-[28px] h-[25px] rounded ${isChecked
                                    ? "bg-white border border-gray-300"
                                    : "bg-blue-800"
                                    } ${isChecked ? "" : "hover:bg-blue-700"} selection:bg-blue-500 selection:text-white my-auto`}
                                onClick={handleCheckboxClick}
                            >
                                <input
                                    type="checkbox"
                                    className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
                                    checked={isChecked}
                                    readOnly
                                />
                                {isChecked ? (
                                    <div className="w-4 h-4 bg-transparent" />
                                ) : (
                                    <Check className="w-4 h-4 text-white" />
                                )}
                            </span>
                            <p className="text-body-lg sm:text-body-md xxs:text-[14px]">Add hotel and save up to 50%</p>
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 bg-white p-6 rounded-xl shadow-2xl transition-all duration-300 ease-in-out opacity-100 scale-105">
                        <div className="flex justify-center items-center flex-col">
                            <div className="bg-red-500 text-white text-xl font-semibold p-3 rounded-full mb-4">
                                <p>⚠️</p>
                            </div>
                            <p className="text-xl text-center font-medium text-gray-800">
                                Data empty
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavPage;