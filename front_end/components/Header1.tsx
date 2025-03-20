'use client';

import { BadgePercent, Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    image: string;
}

interface Session {
    user: User;
    expires: string;
}

const Header = () => {
    const { data: session } = useSession<Session>();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleAuth = () => {
        if (isLoggedIn) {

            localStorage.removeItem("token");
            setIsLoggedIn(false);
            router.push("/hotels");
        } else {

            router.push("/login1");
        }
    };

    return (
        <div className="border-b-2 border-neutral-300">
            <div className="wrapper w-full bg-white z-30">
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0 w-full h-[80px]">
                    <div className="flex justify-center md:justify-start">
                        <div className="w-[82px] h-[40px]">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                height={45}
                                width={100}
                                className="object-cover w-full h-full md:block cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-[60px]">
                        <div className="flex items-center justify-center md:justify-start gap-[40px]">
                            {/* Offers Section */}
                            <div className="flex items-center gap-[8px] cursor-pointer">
                                <BadgePercent className="text-gray-500 w-6 h-6 hover:text-black" />
                                <h2 className="body-md  text-custom-dark hover:text-black">Offers</h2>
                            </div>

                            {/* Customer Service Section */}
                            <div className="flex items-center gap-[8px] cursor-pointer">
                                <Headset className="text-gray-500 w-6 h-6 hover:text-black" />
                                <h2 className="body-md  text-custom-dark hover:text-black">Customer Service</h2>
                            </div>
                        </div>

                        {/* Avatar Section */}
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
                                    <button
                                        onClick={handleAuth}
                                        className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-[3px] rounded-10 min-h-[40px] button-md pl-2 pr-6 hover:bg-white text-custom-dark body-md"
                                    >
                                        {isLoggedIn ? "Logout" : "Log in/Sign up"}
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

export default Header;
