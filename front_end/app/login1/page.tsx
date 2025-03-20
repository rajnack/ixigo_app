"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronDown } from 'lucide-react';
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HotelPage from "../hotels/page";

const Login = () => {
    const { data: session } = useSession();
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (session?.user) {
            router.push("/");
        }
    }, [session, router]);

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setMobileNumber(value);

        if (value.length > 10) {
            setError("Mobile number cannot exceed 10 digits.");
        } else {
            setError("");
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const handleLogin = async () => {
        if (mobileNumber.length !== 10 || password.length < 8) {
            setError("Please enter valid credentials.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/users/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mobile_number: mobileNumber,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log("Response Data:", data);

            if (response.ok && data.access_token) {
                localStorage.setItem("token", data.access_token);
                router.push("/hotels");
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasNumber) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }

        return null;
    };

    const handleGoogleSignIn = async () => {
        const result = await signIn("google", { redirect: false });

        if (result?.ok) {
            setIsModalVisible(false);
        } else {
            console.log("Google login failed", result?.error);
        }
    };

    const handleFacebookSignIn = async () => {
        const result = await signIn("facebook", { redirect: false });

        if (result?.ok) {
            setIsModalVisible(false);
        } else {
            console.log("Facebook login failed", result?.error);
        }
    };

    if (!mounted || !isModalVisible) return null;

    return (
        <>
            <div className="main fixed inset-0 overflow-hidden z-50">
                <HotelPage />
            </div>
            <div className="fixed z-[1300] inset-0 flex justify-center items-center !justify-end" aria-hidden="false">
                <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50" aria-hidden="true">
                    <div className="fixed top-0 left-0 h-screen w-[calc(100%-540px)] flex flex-col justify-center items-center">
                        <Image src="/images/offerhotels.png" alt="ixigo advantages" width="500" height="500" className="w-[620px]" />
                    </div>
                </div>
                <div className="bg-white flex flex-col outline-none overflow-y-auto max-h-full w-full h-full !rounded-none !w-[520px] relative">
                    <div className="w-[520px]">
                        <Link href="/hotels">
                            <button
                                className="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-0.5 rounded-5 button-sm min-h-30px icon-md px-[2.5] !p-0 absolute top-[20px] right-[30px]"
                                onClick={() => setIsModalVisible(false)}
                            >
                                <X className="h-2em w-2em text-charcoal-800 display:inline-block" />
                            </button>
                        </Link>
                        <div className="fixed z-10 !rounded-t-[20px] !rounded-b-none !max-w-full bg-white w-[520px] top-1/2 translate-y-[-50%]">
                            <div className="p-[30px]">
                                <h5 className="text-body-xxl font-bold">Log in to ixigo</h5>
                                <div className="login-form">
                                    <div className="input-container mt-[30px] relative">
                                        <div className="phone-emil-input">
                                            <div className="relative">
                                                <div className="inline-flex flex-col text-secondary w-full">
                                                    <div className="flex flex-col gap-4 w-full">
                                                        {/* Mobile Number Input with Country Code */}
                                                        <div className="flex relative transition-all group/input px-[15px] rounded-10 items-center mt-[8px]">
                                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 text-border-primary"></div>
                                                            <div className="border-r-[1px] mr-[10px] pr-[5px] flex items-center cursor-pointer">
                                                                +91 <ChevronDown className="w-1em h-1em" />
                                                            </div>
                                                            <div className="flex flex-grow items-center relative group">
                                                                <label
                                                                    className={`body-md select-none pointer-events-none absolute transition-all origin-[left_center] scale-75 top-0 left-[-65px] px-[3px] -translate-y-1/2 bg-white ${error ? "text-red-500" : "text-blue-500"
                                                                        } group-focus-within:scale-75 group-focus-within:translate-y-[-50%]`}
                                                                >
                                                                    Enter Mobile Number
                                                                </label>
                                                                <input
                                                                    placeholder="Enter Mobile Number"
                                                                    inputMode="numeric"
                                                                    className="outline-none w-full bg-transparent placeholder:text-disabled py-[12px] text-primary placeholder:opacity-0 focus:placeholder-opacity-100 focus:outline-none"
                                                                    value={mobileNumber}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Password Input (Separate from Mobile Number) */}
                                                        <div className="flex relative transition-all group/input px-[15px] rounded-10 items-center mt-[8px]">
                                                            <div className="absolute inset-0 transition-[border] select-none pointer-events-none border group-hover/input:border-2 rounded-10 text-border-primary"></div>
                                                            <div className="flex flex-grow items-center relative group">
                                                                <label
                                                                    className={`body-md select-none pointer-events-none absolute transition-all origin-[left_center] scale-75 top-0 left-[0px] px-[3px] -translate-y-1/2 bg-white ${error ? "text-red-500" : "text-blue-500"
                                                                        } group-focus-within:scale-75 group-focus-within:translate-y-[-50%]`}
                                                                >
                                                                    Enter Password
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    placeholder="Enter Password"
                                                                    className="outline-none w-full bg-transparent placeholder:text-disabled py-[12px] text-primary placeholder:opacity-0 focus:placeholder-opacity-100 focus:outline-none"
                                                                    value={password}
                                                                    onChange={handlePasswordChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    <button
                                        className="bg-orange-500 text-white rounded-10 min-h-[40px] mt-[20px] w-full"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                                <div>
                                    <div className="relative flex pt-[20px] items-center">
                                        <div className="flex-grow border-t border-charcoal-100"></div>
                                        <p className="text-body-xs flex shrink mx-[4px] text-charcoal-400">Other login options:</p>
                                        <div className="flex-grow border-t border-charcoal-100"></div>
                                    </div>
                                    <div className="flex justify-center mt-[14px] flex-col gap-[15px]">
                                        <div className="relative">
                                            <div
                                                className="h-[50px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] rounded-[10px] flex items-center justify-center top-0 bg-white w-full gap-[15px] cursor-pointer"
                                                onClick={handleGoogleSignIn}
                                            >
                                                <div className="h-[20px] w-[20px]">
                                                    <Image src="/images/google.png" alt="google-login" width={20} height={20} className="h-full w--full object-cover" />
                                                </div>
                                                <p className="text-body-md font-bold">Log in with Google</p>
                                            </div>
                                        </div>
                                        <div
                                            className="h-[50px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] rounded-[10px] flex items-center justify-center top-0 bg-white w-full gap-[15px] cursor-pointer"
                                            onClick={handleFacebookSignIn}
                                        >
                                            <div className="h-[20px] w-[20px]">
                                                <Image src="/images/facebook.png" alt="facebook-login" width={20} height={20} className="h-full w-full" />
                                            </div>
                                            <p className="text-body-md font-bold">Log in with Facebook</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-body-xs my-[20px] text-center">By proceeding, you agree to our
                                    <a href="#" className="text-blue-500"> T&C  </a> and
                                    <a href="#" className="text-blue-500"> Privacy policy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
