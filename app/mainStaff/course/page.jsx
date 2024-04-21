"use client";
import AddCourse from "./AddCourse";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";

const data = [
  {
    label: "Add Course",
    value: "Add Course",
  },
  {
    label: "Show Courses",
    value: "Show Courses",
  },
  {
    label: "Delete Course",
    value: "Delete Course",
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
              {value === "Add Course" && <div className=" w-full md:w-[85%] mx-auto"><AddCourse /></div>}
              {value === "Show Courses" && <div className="min-h-[700px]  w-full md:w-[85%] mx-auto"><UpdateCourse /></div> }
              {value === "Delete Course" && <DeleteCourse />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
