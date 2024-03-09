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
        <TabsHeader className="w-full md:w-[90%] mx-auto bg-gray-300 border-2">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={tabAnimate}
        >
          {data.map(({ value }) => (
            <TabPanel key={value} value={value}>
              {value === "Add Course" && <AddCourse />}
              {value === "Show Courses" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateCourse /></div> }
              {value === "Delete Course" && <DeleteCourse />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
