"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, BadgePercent, Headset } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navigation = () => {
    const navItems = [
        {
            href: "/",
            src: "/images/flight.svg",
            label: "Flights",
            isActive: false,
        },
        {
            href: "/hotels",
            src: "/images/hotel.svg",
            label: "Hotels",
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
                            <div className="inline-flex items-center font-normal bg-custom-purple text-white absolute top-[-9px] left-[17px] px-2 rounded-[10px]">
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

interface User {
    name: string;
    email: string;
    image: string;
}

interface Session {
    user: User;
    expires: string;
}

const SingleHeader = () => {
    const [isVisible, setIsVisible] = useState(false);

    const { data: session } = useSession<Session>();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={` bg-white hidden lg:flex lg:items-center lg:sticky top-0 z-50 shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] h-[70px]`}
        >
            <div className="wrapper w-full  bg-white flex justify-between max-auto relative mainContainer">
                <div className="flex xl:gap-[20px] sm:gap-[10px] items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            className="md:block cursor-pointer"
                            height={100}
                            width={100}
                        />
                    </Link>
                    <div className="flex items-center gap-[20px] sm:gap-[10px]">
                        <div className="z-[20px] flex justify-between items-center relative">
                            <Navigation />
                        </div>
                        <div className="sm:hidden md:flex items-center relative dropdownTab">
                            <div className="flex gap-[5px] items-center cursor-pointer relative">
                                <Image
                                    src="/images/edje.svg"
                                    alt="Dropdown Icon"
                                    width={40}
                                    height={40}
                                    className="w-[60px] h-[60px]"
                                />
                                <ChevronDown className="w-[1.7em] h-[1.7em] text-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="flex items-center justify-center gap-[60px]">
                        {/* Offers Section */}
                        <div className="flex  items-center gap-[8px] cursor-pointer h-full relative">
                            <BadgePercent className=" w-6 h-6 text-blue-500" />
                            <Link href="/offers">
                                <h2 className="body-md text-xl text-blue-500">
                                    Offers
                                </h2>
                            </Link>
                            <div className="bottom-[-22px] absolute h-[5px] w-[95px] bg-blue-500 rounded-full"></div>
                        </div>

                        {/* Customer Service Section */}
                        <div className="flex items-center gap-[8px] cursor-pointer">
                            <Headset className="text-gray-500 w-6 h-6 hover:text-black" />
                            <h2 className="body-md text-xl text-custom-dark hover:text-black">
                                Customer Service
                            </h2>
                        </div>

                        {/* Avatar and Login/Signup */}
                        {session ? (
                            <div className="flex items-center justify-between md:justify-end transition-all duration-100 ease-in-out">
                                <div className="rounded-full flex justify-center items-center w-[40px] h-[40px] bg-sky-200">
                                    <Image
                                        src={session?.user?.image || '/images/profile.jpg'}
                                        alt="user-avatar"
                                        className="cursor-pointer rounded-full"
                                        height={40}
                                        width={40}
                                    />
                                </div>
                                <p className="text-custom-dark text-xl ml-2">{session.user.name}</p>
                                <button
                                    onClick={() => signOut()}
                                    className="ml-4 inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark text-xl"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link href="/login1">
                                <div className="flex items-center justify-between md:justify-end transition-all duration-100 ease-in-out">
                                    <div className="rounded-full flex justify-center items-center w-[40px] h-[40px] bg-sky-200">
                                        <Image
                                            src="/images/account.svg"
                                            alt="user-avatar"
                                            className="cursor-pointer"
                                            height={24}
                                            width={24}
                                        />
                                    </div>
                                    <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark text-xl">
                                        Log in/Sign up
                                    </button>
                                </div>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleHeader;
