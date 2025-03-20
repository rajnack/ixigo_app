"use client";
import { useEffect } from "react";
import Head from "next/head";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

type OffersLayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function OffersLayout({
  title = "Default Title",
  description = "Explore amazing offers on flights and hotels.",
  children,
}: OffersLayoutProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className={`${poppins.variable} antialiased`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
