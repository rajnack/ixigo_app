"use client"

import Image from "next/image";
import { Copy } from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";
import OffersLayout from "@/app/offers/layout";
import SingleHeader from "./HeaderSingle";
import { useEffect, useState } from 'react';
import axios from 'axios';



interface Offer {
  id: number;
  discount_international: string;
  expiresOn: string;
  minBooking: string;
  code: string;
  about: string[];
  terms: string[];
  image: string;
  title: string;
  btn_title: string;
  card_title: string;
  bank_icon: string;
  card_icon: string;
  minBooking1: string;
  discount: string;
  category: string;
  status: string;
  offer_available: OfferAvailable;
};

interface OfferAvailable {
  phone_img: string;
  offer: string[];
}
interface FlightDetailsProps {
  id?: string;
}

const FlightDetails = ({ id }: FlightDetailsProps) => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/v1/flight/offers/${id}/`)
        .then((response) => {
          console.log("API Response:", response.data);
          setOffer(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error.response?.data || error.message);
          setError("Failed to load offer.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!offer) return <p>No offer found.</p>;

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <>
      <OffersLayout title={offer.title}>
        <SingleHeader />
        <div className="lg:py-[30px] bg-[#F4F5F5]">
          <div className="wrapper mainContainer">
            <div className="hidde lg:block">
              <nav className="">
                <ul className="flex items-center my-[2px]">
                  <li>
                    <Link href="/" className="text-subbrand-500">
                      <span className="overline-none">Home</span>
                    </Link>
                    <span className="overline-none mx-2">/</span>
                  </li>
                  <li>
                    <Link href="/offers" className="text-subbrand-500">
                      <span className="overline-none">Offers</span>
                    </Link>
                    <span className="overline-none mx-2">/</span>
                  </li>
                  <li>
                    <span className="overline-none truncate">
                      {offer.title}
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-[20px] lg:mt-[40px] relative">
              <div className="lg:w-[400px] lg:rounded-[20px] lg:bg-white lg:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] h-fit">
                <div className="lg:rounded-t-20 w-full h-[250px] lg:h-[179px] relative">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={400}
                    height={250}
                    className="object-cover lg:rounded-t-20 h-full w-full"
                  />
                </div>
                <div className="p-[20px] -mt-[20px] bg-white relative z-10 rounded-[30px] lg-static lg:m-0">
                  <div className="mb-[20px] flex gap-[5px]">
                    <div className="flex pr-[10px] pl-[5px] border-[1px] border-selection-subtle items-center gap-[5px] w-fit bg-subbrand-100 rounded-[20px]">
                      <div className="w-[30px] h-[30px]">
                        <Image
                          src={offer.card_icon}
                          alt=""
                          width="30"
                          height="30"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <p className="text-body-sm text-subbrand-500 font-medium">
                        {offer.card_title}
                      </p>
                    </div>
                    {offer &&
                      (offer.bank_icon ? (
                        <div className="cursor-pointer">
                          <Image
                            src={offer.bank_icon}
                            alt=""
                            width="30"
                            height="30"
                            className="rounded-full"
                          />
                        </div>
                      ) : null)}
                  </div>

                  <h1 className="text-body-lg font-medium">{offer.title}</h1>
                  <div className="my-[20px] rounded-[20px] border">
                    {/* Offer details - display data dynamically */}
                    {offer && (
                      <table className="w-full">
                        <tbody>
                          {offer.discount && (
                            <tr>
                              <td className="w-1/3 px-4 py-2 bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">Discount</p>
                              </td>
                              <td className="w-2/3 px-4 py-2 border-b">
                                <div className="text-body-sm font-400 capitalize">
                                  {offer.discount}
                                </div>
                              </td>
                            </tr>
                          )}

                          {offer.category && (
                            <tr>
                              <td className="w-1/3 px-4 py-2 bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">Category</p>
                              </td>
                              <td className="w-2/3 px-4 py-2 border-b">
                                <div className="text-body-sm capitalize">{offer.category}</div>
                              </td>
                            </tr>
                          )}
                          {offer.expiresOn && (
                            <tr>
                              <td className="w-1/3 px-4 py-2 bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">Expires on</p>
                              </td>
                              <td className="w-2/3 px-4 py-2 border-b">
                                <div className="flex items-center justify-between">
                                  {formatDate(offer.expiresOn)}
                                  {offer.status && (
                                    <div className="bg-[#DC3532] text-white text-body-2xs rounded-full px-2 py-1">
                                      {offer.status}
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}

                          {offer.minBooking && (
                            <tr>
                              <td className="w-1/3 px-4 py-2 bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">
                                  Min. Booking
                                </p>
                              </td>
                              <td className="w-2/3 px-4 py-2 border-b">
                                <div className="text-body-sm font-400 capitalize">
                                  {offer.minBooking}
                                </div>
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td colSpan={2} className={`w-full px-4 py-2 rounded-b-20 ${offer.code ? 'bg-blue-50' : 'bg-[#FAFAFA]'}`}>
                              <div className="flex items-center justify-between">
                                {offer.code ? (
                                  <>
                                    <p className="text-body-md text-charcoal-500">
                                      Use code:
                                      <span className="text-body-md font-bold text-black"> {offer.code}</span>
                                    </p>
                                    <button className="flex items-center text-brand-outline hover:bg-brand-outline-over border-brand-outline border-[1.5px] rounded-[30px] px-4 py-1">
                                      <Copy className="w-4 h-4" />
                                      Copy
                                    </button>
                                  </>
                                ) : (
                                  <p className="text-body-md text-custom-gray text-center">
                                    No coupon code required
                                  </p>
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                  </div>
                  {offer &&
                    (offer.discount_international ? (
                      <div className="my-[20px] lg:mb-0 rounded-[20px] border">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="w-1/3 px-[15px] py-[10px] bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">
                                  Discount
                                </p>
                              </td>
                              <td className="w-2/3 px-[15px] py-[10px] border-b relative">
                                <div className="text-body-sm font-400 capitalize">
                                  {offer.discount_international}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="w-1/3 px-[15px] py-[10px] bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">Expires on</p>
                              </td>
                              <td className="w-2/3 px-[15px] py-[10px] border-b relative">
                                <div className="text-body-sm capitalize">
                                  <div className="flex items-center justify-between">
                                    {offer.expiresOn ? formatDate(offer.expiresOn) : "N/A"}
                                  </div>
                                </div>
                              </td>
                            </tr>


                            <tr>
                              <td className="w-1/3 px-[15px] py-[10px] bg-neutral-40 border-r border-b">
                                <p className="text-body-sm font-400 text-charcoal-500">
                                  Min. Booking
                                </p>
                              </td>
                              <td className="w-2/3 px-[15px] py-[10px] border-b relative">
                                <div className="text-body-sm font-400 capitalize">
                                  {offer.minBooking1}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={2}
                                className="w-full px-[15px] py-[10px] rounded-b-20 bg-blue-50"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-body-md text-charcoal-500">
                                    Use code:
                                    <span className="text-body-md font-bold text-black">
                                      {offer.code}
                                    </span>
                                  </p>
                                  <button className="inline-flex justify-center items-center text-brand-outline hover:bg-brand-outline-over border-brand-outline border-[1.5px] border-solid gap-[0.5px] rounded-[5px] button-sm min-h-[30px] icon-md px-[10px] rounded-[30px] h-[8px]">
                                    <Copy className="w-1em h-1em" />
                                    Copy
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ) : null)}

                  <div className="hidden lg:block sticky bottom-0 py-[20px] bg-white z-[20px]">
                    <button className="inline-flex justify-center items-center bg-brand-solid text-brand-solid hover:bg-brand-solid-over gap-[5px] rounded-10 min-h-[50px] button-lg icon-md px-[20px] w-full text-white text-body-lg">
                      {offer.btn_title}
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-[1245px] bg-white rounded-[20px] px-[20px] lg:px-[40px] lg:py-[30px] lg:shadow-[0px_4px_30px_-5px_rgba(0,_0,_0,_0.25)] h-fit">
                <div className="mb-[30px]">
                  <h2 className="text-body-xxl font-bold mb-[10px]">About the Offer</h2>
                  <div className="cms-content-container container [&_li]:text-base">
                    {Array.isArray(offer?.about) && offer.about.length > 0 ? (
                      <ul className="list-disc ml-[30px]">
                        {offer.about.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No information available about the offer.</p>
                    )}
                  </div>
                </div>

                {offer?.offer_available?.offer?.length > 0 || offer?.offer_available?.phone_img ? (
                  <div className="my-[30px] lg:grid lg:grid-cols-2 lg:gap-[20px]">
                    <div>
                      <h2 className="text-body-xxl font-bold mb-[10px]">How to avail the offer?</h2>
                      <div className="cms-content-container container [&_li]:text-base">
                        {Array.isArray(offer.offer_available.offer) && offer.offer_available.offer.length > 0 ? (
                          <ul className="list-disc ml-[30px]">
                            {offer.offer_available.offer.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No information available on how to avail the offer.</p>
                        )}
                      </div>
                    </div>
                    {offer.offer_available.phone_img && (
                      <div className="flex justify-center items-center p-[10px]">
                        <Image
                          src={offer.offer_available.phone_img}
                          alt="How to avail the offer?"
                          width="335"
                          height="300"
                          className="w-[435px] h-[400px]"
                        />
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="mb-[30px]">
                  <h2 className="text-body-xxl font-bold mb-[10px]">Terms & Conditions</h2>
                  <div className="cms-content-container">
                    {Array.isArray(offer?.terms) && offer.terms.length > 0 ? (
                      <ul className="list-disc ml-[30px]">
                        {offer.terms.map((item, idx) => {
                          const urlMatch = item.match(/(ixigo.com|ixigo website)/);

                          if (urlMatch) {
                            const url = urlMatch[0];
                            const textBeforeUrl = item.split(url)[0];
                            const textAfterUrl = item.split(url)[1];

                            return (
                              <li key={idx}>
                                {textBeforeUrl}
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600"
                                >
                                  {url}
                                </a>
                                {textAfterUrl}
                              </li>
                            );
                          } else {
                            return <li key={idx}>{item}</li>;
                          }
                        })}
                      </ul>
                    ) : (
                      <p>No terms and conditions available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F5F5]">
          <div className="wrapper px-[20px] py-[30px] bg-neutral-20 xl:py-[20px] xl:px-0 xl:bg-transparent">
            <p className="text-body-xs text-secondary font-bold mb-[10px]">
              Important Links
            </p>
            <div className="flex flex-wrap gap-[20px]">
              <a className="text-body-xs text-custom-gray" href="#">
                IRCTC Trains
              </a>
              <a className="text-body-xs text-custom-gray" href="#">
                Tatkal Railway Reservation
              </a>
              <a className="text-body-xs text-custom-gray" href="#">
                PNR Status
              </a>
              <a className="text-body-xs text-custom-gray" href="#">
                Train Running Status
              </a>
              <a className="text-body-xs text-custom-gray" href="#">
                Train Seat Availability
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Platform Locator
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Vande Bharat Express
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                IRCTC Cancellation Charges
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Flight Booking
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                International Flights
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Student Flight Booking
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Armed Forces Flight Booking
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Senior Citizen Flight Booking
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Airlines{" "}
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                abhibus
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                ConfirmTkt
              </a>

              <a className="text-body-xs text-custom-gray" href="#">
                Travel Stories
              </a>
            </div>
          </div>
        </div>
        <Footer className="!px-0" />
      </OffersLayout>
    </>
  );
};
export default FlightDetails;

