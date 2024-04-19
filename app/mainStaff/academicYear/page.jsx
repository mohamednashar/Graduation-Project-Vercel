"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import AddAcademicYear from "./AddAcademicYear";
import DeleteAcademicYear from "./DeleteAcademicYear";
import UpdateAcademicYear from "./UpdateAcademicYear";

const data = [
  {
    label: "Add Academic Year",
    value: "Add Academic Year",
  },
  {
    label: "Show Academic Years",
    value: "Show Academic Years",
  },
  {
    label: "Delete Academic Year",
    value: "Delete Academic Year",
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
            <TabPanel key={value} value={value} className="h-[80vh]">
              {value === "Add Academic Year" && <AddAcademicYear />}
              {value === "Show Academic Years" && <UpdateAcademicYear />}
              {value === "Delete Academic Year" && <DeleteAcademicYear />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
