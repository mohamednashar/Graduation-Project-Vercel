"use client";
import { ReduxProvider } from "./reduxToolkit/provider/provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
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
      <body className={`${inter.className} bg-gray-100 dark:bg-[#121212] overflow-x-hidden`}>
        <ThemeProvider attribute="class">
          <ReduxProvider>
            <Navbar />
            <div>{children}</div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
