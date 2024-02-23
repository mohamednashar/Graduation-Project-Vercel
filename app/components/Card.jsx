"use client"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
 
export function CardDefault({courseTitle , courseImg , courseDescription}) {
  
  
  return (
    <div className="max-w-screen-lg mx-4 mt-6 overflow-hidden border dark:border-none shadow-lg rounded-xl sm:mx-auto">
    <div className="flex flex-col overflow-hidden bg-white dark:bg-[#1e1e1e] dark:text-white sm:flex-row md:h-80">
      <div className="text-white dark:text-black p-8 sm:p-8 bg-[#66bfbf] order-first ml-auto h-48 w-full sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5 flex flex-col justify-between">
        <div className>
          <small className="text-xs uppercase sm:text-sm">Course</small>
          <h2 className="mt-2 text-xl font-medium sm:mt-4 sm:text-3xl">{courseTitle}</h2>
        </div>
        <Link  href={`courses/${courseTitle}`} >
        <button className="flex items-center mt-8 text-sm text-gray-200 sm:mt-0 text-start transition-all duration-200 hover:text-white dark:text-black">View all Lectures
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        </Link>
      </div>
      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5 text-[#66bfbf]">
        <div className="flex items-start justify-between mb-4">
          <div className="text-sm font-medium uppercase sm:text-base text-[#66bfbf]">11 Lecture</div>
          <div className="text-end">
            <div className="w-full sm:w-80 bg-[#EEEEEE] h-2 rounded-md">
              <div className="bg-[#66bfbf] h-2 rounded-md" style={{width: '67%'}} />
            </div>
            <small className="font-semibold">6/9 Challenges</small>
          </div>
        </div>
        <h2 className="text-2xl font-medium lg:text-4xl">Callback & Closures</h2>
        <div className="flex justify-end mt-8 sm:mt-auto ">
          <Link  href={`courses/${courseTitle}`} className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-full bg-[#66bfbf] px-6 py-2 text-white dark:text-black transition-all duration-200 hover:bg-[#f76b8a]">
            <div className="flex items-center justify-center w-full py-1 font-semibold text-center rounded group">
              Open Course </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}