"use client";
import AddCourse from "./AddCourseCycle";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteCourse from "./DeleteCourseCycle";
import UpdateCourse from "./UpdateCourseCycle";
import AddCourseCycle from "./AddCourseCycle";
import UpdateCourseCycle from "./UpdateCourseCycle";
import DeleteCourseCycle from "./DeleteCourseCycle";

const data = [
  {
    label: "Add Course Cycle",
    value: "Add Course Cycle",
  },
  {
    label: "Show Course Cycles",
    value: "Show Course Cycles",
  },
  {
    label: "Delete Course Cycle",
    value: "Delete Course Cycle",
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
              {value === "Add Course Cycle" && <div className=" w-full md:w-[85%] mx-auto"><AddCourseCycle /></div>}
              {value === "Show Course Cycles" && <div className="min-h-[700px]  w-full md:w-[85%] mx-auto"><UpdateCourseCycle /></div> }
              {value === "Delete Course Cycle" && <div className="min-h-[700px]  w-full md:w-[85%] mx-auto"><DeleteCourseCycle /></div>}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
