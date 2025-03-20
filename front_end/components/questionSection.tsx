"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Questions = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(2);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const faqData = [
        {
            question: "Why is flight ticket booking the cheapest on ixigo?",
            answer: (
                <>
                    ixigo directly searches multiple airline websites for the <b>cheapest fares</b>. Many airlines prefer
                    to sell their cheapest flight tickets on ixigo. Additionally, with its <b>exclusive offers and deals</b>,
                    including several bank and partner offers, ixigo serves as the best platform to book <b>cheap flights</b>.
                    You also get additional discounts with special fares for students, armed forces, and senior citizens. Some
                    of the ongoing flight deals include:
                    <ol className="list-decimal ml-[16px] mr-[10px]">
                        <li className="ml-4">Get up to Rs. 3000 Off on flights with ICICI Bank Credit Cards EMI.</li>
                        <li className="ml-4">Flat Rs. 555 Off on Flight Bookings via MobiKwik wallet.</li>
                        <li className="ml-4">Get Flat 12% Off on flights with RBL Bank on Credit Card EMI.</li>
                    </ol>
                    Visit{" "}
                    <a href="#" className="text-brand-500">
                        ixigo flight offers
                    </a>{" "}
                    for the best flight deal.
                </>
            ),
        },
        {
            question: "How do I book cheap flight tickets?",
            answer: (
                <>
                    Here's how you can book <b>cheap flight tickets</b>:
                    <ul className="list-disc mt-[16px] ml-[16px]">
                        <li className="ml-4">Book your flights from ixigo in advance to get the cheapest deals.</li>
                        <li className="ml-4">Be flexible, and consider flying during off-peak hours to get cheaper flight tickets.</li>
                        <li className="ml-4">
                            ixigo's fare alerts feature sends you notifications when the air ticket price on your route gets
                            cheap.
                        </li>
                        <li className="ml-4">
                            If you have time, try stopover flights as flights with multiple stops are often cheaper.
                        </li>
                        <li className="ml-4">Avoid traveling on weekends, as air tickets are usually higher during this time.</li>
                        <li className="ml-4">Try budget airlines like Indigo, Air India to book cheap flight tickets.</li>
                    </ul>
                </>
            ),
        },
        {
            question: "What are the benefits of flight booking with ixigo?",
            answer: (
                <>
                    The benefits of booking with ixigo include cheap fares, <b>easy ticket booking</b>, real-time flight
                    status tracking, <b>exclusive flight ticket offers</b>, flexible date options, auto web-checkin, and quick
                    refunds.
                </>
            ),
        },
        {
            question: "How do you make flexible online flight ticket booking with changeable dates?",
            answer: (
                <>
                    Select your preferred flight and opt for 'Assured Flex' on the 'Review Flight' page to make <b>flexible online flight ticket bookings</b>
                    with changeable dates. This will allow you to modify your travel dates
                </>
            ),
        },
        {
            question: "Can I modify or cancel my booking?",
            answer: (
                <>
                    Yes, you can modify or cancel your flight with Assured and Assured Flex fares. Assured offers free cancellations on new bookings, while Assured Flex provides free cancellations or one-time free rescheduling, including date, airline, and route changes.
                </>
            ),
        },
        {
            question: "Are there any special fares for children, infants, or senior citizens?",
            answer: (
                <>
                    ixigo offers up to a <b>10% discount on base fares</b>
                    for senior citizens aged 60 and older. It also offers up to a 10% discount on base fares and extra baggage allowance for students aged 12 and above.
                </>
            ),
        },
        {
            question: "Can I book additional baggage through ixigo?",
            answer: (
                <>
                    Yes, you can book additional baggage through ixigo by selecting the option during <b>flight booking</b>
                    or managing your booking later, depending on the airline's policy. This is applicable on ixigo for some airlines like IndiGo, Akasa Air, etc.
                </>
            ),
        },
        {
            question: "How to check flight status on ixigo?",
            answer: (
                <>
                    To check flight status, open the flight status page, enter your flight details, and view real-time updates on your flight.
                </>
            ),
        },
        {
            question: "How can I get domestic flight offers on ixigo?",
            answer: (
                <>
                    <p className="mb-[15px]">To get domestic flight offers on ixigo:</p>

                    <ol className="list-decimal ml-[16px] mr-[10px]">
                        <li className="ml-4">Visit the ixigo website and enter your travel dates and destination.</li>
                        <li className="ml-4">Click on the "offers" tab to view available discounts and promotions on domestic flights.</li>
                        <li className="ml-4">Choose your preferred offer and make the payment at the time of booking using various payment options, including credit and debit cards, net banking, and wallets.</li>
                    </ol>
                    ixigo offers various cashback offers on <b>domestic flight bookings</b>
                    from time to time.
                </>
            ),
        },
    ];

    const toggleVisibility = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleViewMore = () => {
        setVisibleCount(faqData.length);
    };

    if (!isClient) return null;

    return (
        <div className="px-[20px] py-[15px] border rounded-[20px] mt-[40px] xl:mt-[60px] xl:border-none xl:px-0 xl:p-0">
            <h2 className="text-body-sm text-body-xl mr-[5px] xl:pb-[20px] font-bold">
                Frequently Asked Questions
            </h2>
            <div className="xl:rounded-[20px] xl:border xl:p-[20px] xl:py-0">
                {faqData.slice(0, visibleCount).map((faq, index) => (
                    <div key={index} className="border-b border-tertiary last-of-type:border-b-transparent pt-[20px]">
                        <div
                            className="py-[10px] gap-[10px] flex items-center min-h-[44px] font-medium cursor-pointer xl:hover:bg-primary-over !bg-transparent !items-start"
                            onClick={() => toggleVisibility(index)}
                        >
                            <div className="flex-grow">
                                <h3 className="text-body-xl font-bold">{faq.question}</h3>
                            </div>
                            <div className={`transition-transform duration-150 justify-end ${openIndex === index ? "rotate-180" : ""}`}>
                                <ChevronDown className="w-[1.7em] h-[1.7em]" />
                            </div>
                        </div>
                        {openIndex === index && (
                            <div className="pt-[5px] pb-[15px] text-secondary text-body-lg">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
            {visibleCount < faqData.length && (
                <div className="flex justify-center mt-[10px]">
                    <button
                        className="inline-flex justify-center items-center text-brand-outline hover:bg-brand-outline-over border-brand-outline gap-[5px] rounded-[10px] min-h-[40px] button-md icon-md px-[15px] w-full xl:w-auto"
                        onClick={handleViewMore}
                    >
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Questions;
