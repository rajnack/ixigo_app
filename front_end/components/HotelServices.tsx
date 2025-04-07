import Image from "next/image";

const Services = () => {
    return (
        <section
            aria-labelledby="services-heading"
            className="mt-[35px] relative h-[250px] rounded-[20px] shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] bg-white"
        >
            <div className="absolute left-0 top-0 z-10 w-[142px] h-[125px]">
                <Image
                    src="/images/leftcircle.svg"
                    alt="Decorative left circle"
                    width="142"
                    height="125"
                    priority
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="absolute right-0 bottom-0 z-10 w-[150px] h-[174px]">
                <Image
                    src="/images/rightcircle.svg"
                    alt="Decorative right circle"
                    width="150"
                    height="174"
                    priority
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="pt-[45px] pb-[45px] px-[90px] z-20 flex justify-between lg:px-[60px] sm:px-[30px]">
                {/* Left Content */}
                <div className="flex md:gap-x-[30px] sm:gap-x-[16px]">
                    {/* Logo */}
                    <div className="z-10 xl:w-[160px] xl:h-[160px] md:w-[135px] md:h-[130px] sm:w-[115px] sm:h-[115px] object-cover">
                        <Image
                            src="/images/ixigo-logo.png"
                            alt="Ixigo logo"
                            height="160"
                            width="160"
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    {/* Features */}
                    <div className="flex flex-col gap-y-[20px] py-[10px]">
                        <div className="flex flex-col gap-[10px]">
                            <div className="flex items-center gap-[5px]">
                                <span className="w-[24px] h-[24px]">
                                    <Image
                                        src="/images/live.svg"
                                        alt="Live icon"
                                        width="24"
                                        height="24"
                                        className="object-cover w-full h-full"
                                    />
                                </span>
                                <p className="md:text-body-lg sm:text-body-xs">Pay at hotel option available</p>
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <span className="w-[24px] h-[24px]">
                                    <Image
                                        src="/images/track.svg"
                                        alt="Track icon"
                                        width="24"
                                        height="24"
                                        className="object-cover w-full h-full"
                                    />
                                </span>
                                <p className="md:text-body-lg sm:text-body-xs">Free cancellations on hotel bookings</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-[10px]">
                            <div className="xl:pt-[7px] xl:pb-[7px] md:px-[8px] sm:pt-[2px] sm:pb-[2px] sm:px-[2px] flex flex-col items-center justify-center gap-[2px] rounded-[10px] bg-green-800">
                                <p className="text-white text-body-xl">4.5</p>
                                <p className="tracking-[2.4px] text-body2xs text-center text-white">RATING</p>
                            </div>
                            <div className="w-[140px] h-[23px] object-cover">
                                <Image
                                    src="/images/rating.png"
                                    alt="Rating stars"
                                    width="140"
                                    height="23"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Content */}
                <div className="flex items-center md:gap-x-[20px] sm:gap-x-[10px]">
                    {/* App Download */}
                    <div>
                        <p className="md:text-body-md sm:text-[10px] mb-[10px] px-[10px] font-medium">Download the App</p>
                        <div className="flex flex-col gap-[5px]">
                            <a href="#" aria-label="Download from Google Play">
                                <div className="relative xl:h-[47px] xl:w-[158px] md:h-[40px] md:w-[135px] sm:h-[35px] sm:w-[115px]">
                                    <Image
                                        src="/images/gpay.jpeg"
                                        alt="Google Play Store logo"
                                        width="100"
                                        height="100"
                                        className="object-cover absolute inset-0 h-full w-full"
                                    />
                                </div>
                            </a>
                            <a href="#" aria-label="Download from App Store">
                                <div className="relative xl:h-[47px] xl:w-[158px] md:h-[41px] md:w-[135px] sm:w-[115px] sm:h-[35px]">
                                    <Image
                                        src="/images/appstore.jpeg"
                                        alt="Apple App Store logo"
                                        width="100"
                                        height="100"
                                        className="object-cover absolute inset-0 h-full w-full"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* QR Code */}
                    <figure className="z-10 p-[10px] text-center">
                        <div className="xl:w-[140px] xl:h-[140px] sm:w-[90px] sm:h-[90px]">
                            <Image
                                src="/images/qrcode.png"
                                alt="Scan this QR code to download the app"
                                width="140"
                                height="140"
                                className=" object-cover h-full w-full"
                            />
                        </div>
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default Services;
