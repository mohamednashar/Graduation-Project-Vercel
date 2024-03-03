"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import ThemeHandler from "./components/ThemeHandler";
const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} bg-gray-100 dark:bg-[#121212] overflow-x-hidden`}
      >
        <ThemeHandler>
        {(!pathname.startsWith("/mainStaff") && pathname !== "/") && <Navbar />}

          <div>{children}</div>
        </ThemeHandler>
      </body>
    </html>
  );
}
