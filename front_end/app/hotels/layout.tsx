import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Providers from "../Providers";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Online Hotal Booking | Book Cheap, Budget and Luxury Hotels - ixigo",
    description:
        "Online Hotal Booking | Book Cheap, Budget and Luxury Hotels - ixigo",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
