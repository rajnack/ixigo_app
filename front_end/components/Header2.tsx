"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, BadgePercent, Headset, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

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
        <ul className="flex justify-between text-base font-normal gap-6 px-0 sm:gap-[6px]">
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

const HeaderPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const { data: session } = useSession<Session>();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                } z-40  xl:px-0`}
        >
            <div className="wrapper w-full h-[82px] bg-white flex justify-between max-auto relative mainContainer">
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
                            <div className="flex gap-[5px] items-center cursor-pointer relative ">
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

                <nav className="relative">
                    {/* Mobile Menu Icon (Visible on Small Screens) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="absolute top-[25px] right-[1px] lg:hidden text-gray-700 hover:text-black focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />} {/* Toggles Icon */}
                    </button>
                    {/* Desktop Navigation (Visible on lg and larger screens) */}
                    <div className="hidden lg:flex items-center justify-end">
                        <div className="flex items-center justify-end gap-[40px]">
                            <div className="flex gap-[30px] py-[10px]">
                                {/* Offers Section */}
                                <div className="flex items-center gap-[5px] cursor-pointer">
                                    <BadgePercent className="text-gray-500 w-6 h-6 hover:text-black" />
                                    <h2 className="body-md text-custom-dark hover:text-black">Offers</h2>
                                </div>

                                {/* Customer Service Section */}
                                <div className="flex items-center gap-[5px] cursor-pointer">
                                    <Headset className="text-gray-500 w-6 h-6 hover:text-black" />
                                    <h2 className="body-md text-custom-dark hover:text-black">Customer Service</h2>
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
                                            className="ml-4 inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark text-xl"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/login">
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

                    {/* Mobile Menu (Visible on smaller screens) */}
                    {isMobileMenuOpen && (
                        <div className=" lg:hidden absolute top-12 right-0 w-[250px] bg-white shadow-lg rounded-lg p-4">

                            <div className="flex flex-col items-start gap-4">
                                {/* Offers */}
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <BadgePercent className="text-gray-500 w-6 h-6 hover:text-black" />
                                    <h2 className="body-md text-custom-dark hover:text-black">Offers</h2>
                                </div>

                                {/* Customer Service */}
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Headset className="text-gray-500 w-6 h-6 hover:text-black" />
                                    <h2 className="body-md text-custom-dark hover:text-black">Customer Service</h2>
                                </div>

                                {/* Avatar and Login/Signup */}
                                {session ? (
                                    <div className="flex flex-col items-start">
                                        <Image
                                            src={session?.user?.image || '/images/profile.jpg'}
                                            alt="user-avatar"
                                            className="cursor-pointer rounded-full"
                                            height={40}
                                            width={40}
                                        />
                                        <p className="text-custom-dark body-md mt-2">{session.user.name}</p>
                                        <button
                                            onClick={() => signOut()}
                                            className="mt-4 text-brand hover:bg-brand-over rounded-10 min-h-[40px] px-6 text-custom-dark text-xl"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <button className=" text-brand hover:bg-brand-over rounded-10 min-h-[40px] px-6 text-custom-dark body-md">
                                            Log in/Sign up
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

            </div>
        </div>
    );
};

export default HeaderPage;
