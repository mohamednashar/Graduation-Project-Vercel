"use client";
import AddCourse from "./AddSection";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import AddSection from "./AddSection";
import UpdateSection from "./UpdateSection";
import DeleteSection from "./DeleteSection";

const data = [
  {
    label: "Add Section",
    value: "Add Section",
  },
  {
    label: "Show Sections",
    value: "Show Sections",
  },
  {
    label: "Delete Section",
    value: "Delete Section",
  },
];

const page = () => {
  const defaultTabValue = data[0].value;
  const tabAnimate = {
    initial: { y: -50, scale: 0.7 },
    mount: { y: 0, scale: 1 },
    unmount: { y: 50, scale: 0.7 },
  };
  return (
    <div>
      <Tabs value={defaultTabValue}>
        <TabsHeader className="w-full md:w-[90%] mx-auto bg-gray-300 dark:bg-[#282828] tabsheader">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="font-['__Poppins_4a3e9c', '__Poppins_Fallback_4a3e9c']">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
        >
          {data.map(({ value }) => (
            <TabPanel key={value} value={value}>
              {value === "Add Section" && <div className=" w-full md:w-[85%] mx-auto"><AddSection /></div>}
              {value === "Show Sections" && <div className="min-h-[700px]  w-full md:w-[85%] mx-auto"><UpdateSection /></div> }
              {value === "Delete Section" && <div className="min-h-[700px]  w-full md:w-[85%] mx-auto"><DeleteSection /></div>}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
