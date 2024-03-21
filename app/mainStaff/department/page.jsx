"use client";
import AddDepartment from "./AddDepartment";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteDepartment from "./DeleteDepartment";
import UpdateDepartment from "./UpdateDepartment";

const data = [
  {
    label: "Add Department",
    value: "Add Department",
  },
  {
    label: "Show Departments",
    value: "Show Departments",
  },
  {
    label: "Delete Department",
    value: "Delete Department",
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
              {value === "Add Department" && <AddDepartment />}
              {value === "Show Departments" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateDepartment /></div> }
              {value === "Delete Department" && <DeleteDepartment />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
