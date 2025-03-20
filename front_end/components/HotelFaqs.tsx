import { useState } from "react";
import { ChevronDown } from "lucide-react";

const BookingFaqs = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleVisibility = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How to book cheap hotels?",
            answer: (
                <>
                    You can book properties at the lowest prices on ixigo as compared to other hotel booking sites. Use our filter option to set your preferred price range and compare various hotels before making your booking. You can also avail our exclusive hotel deals to book cheap accommodations.
                </>
            ),
        },
        {
            question: "How to get a discount on hotel booking?",
            answer: (
                <>
                   Yes, you can choose the ‘Pay at Hotel’ option on ixigo. With this option, you can effortlessly book your accommodation online and can pay for your stay directly at the hotel.
                </>
            ),
        },
        {
            question: "Is it possible to book the hotel online and pay directly at the hotel?",
            answer: (
                <>
                   Yes, you can choose the ‘Pay at Hotel’ option on ixigo. With this option, you can effortlessly book your accommodation online and can pay for your stay directly at the hotel.
                </>
            ),
        },
        {
            question: "What is the cancellation policy for hotel bookings on ixigo?",
            answer: (
                <>
                    The cancellation policy varies from hotel to hotel. To know more about the cancellation timeline & charges, you can refer to the hotel booking and cancellation policies on the ‘room selection’ and ‘booking review’ pages. Please visit ixigo's Customer Service section for further details.
                </>
            ),
        },
        {
            question: "Are there any hidden charges when booking hotels on ixigo?",
            answer: (
                <>
                    No, there are no hidden charges. The total amount you need to pay will be clearly displayed before booking. While most hotels don't charge any additional fees, some may apply a surcharge that is to be paid at the hotel directly. We'll inform you about it before confirming your booking.
                </>
            ),
        },
        {
            question: "How secure is the payment process on ixigo?",
            answer: (
                <>
                   ixigo ensures a safe and seamless hotel booking and payment experience. The process is extremely secure and reliable. Customers can choose from multiple payment methods or even pay at the hotel directly.
                </>
            ),
        },
    ];

    return (
        <div className="border rounded-[20px] pt-[30px] xl:border-none ">
            <h2 className="text-body-sm text-body-xl mr-[5px] xl:pb-[20px] font-bold">Hotel Booking FAQs</h2>
            <div className="xl:rounded-[20px] mt-[15px] xl:border xl:px-[20px] xl:py-[15px]">
                {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-tertiary last-of-type:border-b-transparent pt-[20px]">
                        <div
                            className="py-[10px] gap-[10px] flex items-center min-h-[44px] font-medium cursor-pointer xl:hover:bg-primary-over !bg-transparent !items-start"
                            onClick={() => toggleVisibility(index)}
                        >
                            <div className="flex-grow">
                                <h3 className="text-body-xl font-bold">{faq.question}</h3>
                            </div>
                            <div
                                className={`transition-transform duration-150 justify-end ${openIndex === index ? "rotate-180" : ""}`}
                            >
                                <ChevronDown className="w-[1.7em] h-[1.7em]" />
                            </div>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "h-auto visible" : "h-0 invisible"}`}
                        >
                            <div className="flex w-full">
                                <div className="w-full">
                                    <div className="pt-[5px] pb-[15px] text-secondary text-body-lg">{faq.answer}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingFaqs;
