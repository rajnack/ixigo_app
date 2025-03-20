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
                            <div className="inline-flex items-center font-normal bg-custom-purple text-white absolute top-[-9px] left-[17px] px-[5px] rounded-[10px] min-h-[15px] text-[10px]">
                                <p className="">{item.badge}</p>
                            </div>
                        )}
                        <p className="xl:text-body-md font-semibold">{item.label}</p>
                        {item.isActive && (
                            <p className="w-full bg-[#0770E4] absolute bottom-0 rounded left-0 h-5"></p>
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
const HeaderHotel = () => {
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
            className={`bg-white border-b border-neutral-100 !py-0 w-full fixed left-0 duration-300 ease-in-out ${isVisible ? "top-0" : "-top-[120px]"
                } z-40 px-[20px] xl:px-0`}
        >
            <div className="wrapper w-full h-[82px] bg-white flex justify-between max-auto relative mainContainer">
                <div className="flex gap-[20px] items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            className=" cursor-pointer"
                            height={100}
                            width={100}
                        />
                    </Link>
                    <div className="flex items-center gap-[20px]">
                        <div className="z-[20px] flex justify-between items-center relative">
                            <Navigation />
                        </div>
                        <div className="flex items-center relative dropdownTab">
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
                    <div className="flex items-center justify-center gap-[40px]">
                        <div className="flex gap-[30px] py-[10px]">
                            {/* Offers Section */}
                            <div className="flex items-center gap-[8px] cursor-pointer">
                                <BadgePercent className="text-gray-500 w-6 h-6 hover:text-black" />
                                <h2 className="body-md body-md text-custom-dark hover:text-black">
                                    Offers
                                </h2>
                            </div>

                            {/* Customer Service Section */}
                            <div className="flex items-center gap-[8px] cursor-pointer">
                                <Headset className="text-gray-500 w-6 h-6 hover:text-black" />
                                <h2 className="body-md body-md text-custom-dark hover:text-black">
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
                                    <p className="text-custom-dark body-md ml-2">{session.user.name}</p>
                                    <button
                                        onClick={() => signOut()}
                                        className="ml-4 inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark body-md"
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
                                        <button className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark body-md">
                                            Log in/Sign up
                                        </button>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderHotel;
