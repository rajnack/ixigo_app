import Image from "next/image";


interface FooterProps {
    className?: string;
  }
  const Footer: React.FC<FooterProps> = () => {
    return (
        <div className=" flex items-center flex-col gap-y-10 bg-neutral-200 ">
          <div className={` flex justify-between gap-x-[20px] py-20 wrapper`}>
                <div className="flex flex-col gap-y-[10px] items-center xl:flex-row-reverse xl:gap-[26px] ">
                    <div className="flex items-center gap-x-4">
                        <p className="text-body-3xs text-custom-gray text-center xl:list-item">
                            <a href="/ads">Advertise with us</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/about">About Us</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/investor">Investor Relations</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/about/csr">CSR</a>
                        </p>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <p className="text-[10px] text-custom-gray text-center list-item">
                            <a href="/privacy">Privacy</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/terms-info">Terms of Use</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/careers">Career</a>
                        </p>
                        <p className="text-[10px] text-custom-gray text-center list-item xl:list-item">
                            <a href="/center">Customer Service</a>
                        </p>
                    </div>
                    <p className="text-[10px] text-custom-gray text-center">
                        © 2025 Le Travenues Technology Ltd. India. All brands are trademarks of their respective owners.
                    </p>
                </div>
                <div className="flex justify-center gap-x-6 p-0.5">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/facebook.svg" alt="facebook" width={40} height={40} className="w-[40px] h-[40px]" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/twitter.svg" alt="twitter" width={40} height={40} className="w-[40px] h-[40px]" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/instagram.svg" alt="instagram" width={40} height={40} className="w-[40px] h-[40px]" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/linkedin.svg" alt="linkedin" width={40} height={40} className="w-[40px] h-[40px]" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/youtube.svg" alt="youtube" width={40} height={40} className="w-[40px] h-[40px]" />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Footer;
