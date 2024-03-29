"use client";
import { Inter,AR_One_Sans,Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import ThemeHandler from "./components/ThemeHandler";

const poppins = Poppins({ subsets: ["latin"],weight:['400','500','600','700'] });


export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>Platform</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="images/icon.jpg"></link>
      </head>
      <body
        className={`${poppins.className} bg-gray-100 dark:bg-[#121212] overflow-x-hidden`}
      >
        <ThemeHandler>
        {(!pathname.startsWith("/mainStaff") && pathname !== "/") && <Navbar />}

          <div>{children}</div>
        </ThemeHandler>
      </body>
    </html>
  );
}
