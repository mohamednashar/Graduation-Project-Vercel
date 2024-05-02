"use client"
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Lectures from "./lectures";
import Assignments from "./Assignments";
import Quizzes from "./Quizzes";
import Link from "next/link";
import { usePathname } from 'next/navigation'

 
export default function layout({children}) {
  const pathname = usePathname()

  let modifiedLink = pathname.replace("sections", "postsSection");

  const [activeTab, setActiveTab] = useState("lectures");
  const data = [
    {
      label: "Lectures",
      value: "lectures",
      desc: <Lectures />,
    },
    {
      label: "Assignments",
      value: "assignments",
      desc: <Assignments/>,
    },
    {
      label: "Quizzes",
      value: "quizzes",
      desc: <Quizzes/>,
    },
    
    {
      label: "Posts",
      value: "posts",
      link: `${modifiedLink}`, // Define the link URL
    },
  ];
  return (
    <>
    <Tabs value={activeTab} className="w-full">
      <TabsHeader
        className="w-full flex items-center bg-white dark:bg-[#282828]  p-3"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 dark:border-white shadow-none rounded-none",
        }}
      >
{data.map(({ label, value, link }) => (
  <React.Fragment key={value}>
    {link ? (
      <Link href={link}>
          {label}
      </Link>
    ) : (
      <Tab
        value={value}
        onClick={() => setActiveTab(value)}
        className={`w-fit  text-gray-900 dark:text-white ${
          activeTab === value ? "active" : ""
        }`}
      >
        {label}
      </Tab>
    )}
  </React.Fragment>
))}
      </TabsHeader>
      <TabsBody
      animate={{
        initial: { y: 250 },
        mount: { y: 0 },
        unmount: { y: 250 },
      }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  
    </>
  );
}