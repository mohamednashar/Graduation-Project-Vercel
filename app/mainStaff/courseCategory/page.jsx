"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AddCourseCategory from "./AddCourseCategory";
import UpdateCourseCategory from "./UpdateCourseCategory";
import DeleteCourseCategory from "./DeleteCourseCategory";

const data = [
  {
    label: "Add Course Category",
    value: "Add Course Category",
  },
  {
    label: "Show Course Categories",
    value: "Show Course Categories",
  },
  {
    label: "Delete Course Category",
    value: "Delete Course Category",
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
              {value === "Add Course Category" && <AddCourseCategory />}
              {value === "Show Course Categories" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateCourseCategory /></div> }
              {value === "Delete Course Category" && <DeleteCourseCategory />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
