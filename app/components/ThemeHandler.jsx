"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeHandler({ children }) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
    
}
