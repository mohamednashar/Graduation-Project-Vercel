"use client";
import AddStudent from "./AddStudent";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";
import { useTheme } from "next-themes";

const data = [
  {
    label: "Add Student",
    value: "Add Student",
  },
  {
    label: "Show Students",
    value: "Show Students",
  },
  {
    label: "Delete Student",
    value: "Delete Student",
  },
];

const page = () => {
  const defaultTabValue = data[0].value;
  const { theme } = useTheme()

  console.log(theme)

  return (
    <div>
      <Tabs value={defaultTabValue}>
        <TabsHeader className="w-full md:w-[90%] mx-auto bg-gray-300 dark:bg-[#282828] tabsheader">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="dark:text-[#5e5e5e] font-['__Poppins_4a3e9c', '__Poppins_Fallback_4a3e9c']">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
        >
          {data.map(({ value }) => (
            <TabPanel  key={value} value={value}>
              {value === "Add Student" && <AddStudent />}
              {value === "Show Students" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateStudent /></div> }
              {value === "Delete Student" && <DeleteStudent />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
