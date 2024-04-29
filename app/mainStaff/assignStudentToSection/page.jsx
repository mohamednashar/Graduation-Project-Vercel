"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteStudentsFromSection from "./DeleteStudentsFromSection";
import AddStudentToSection from "./AddStudentsToSection";

const data = [
  {
    label: "Add Students To Section",
    value: "Add Students To Section",
  },
  
  {
    label: "Delete Students From Section",
    value: "Delete Students From Section",
  },
];

const page = () => {
  const defaultTabValue = data[0].value;

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
              {value === "Add Students To Section" && <div className="h-[820px]  w-full md:w-[90%] mx-auto"><AddStudentToSection /></div> }
              {value === "Delete Students From Section" && <div className="h-[820px]  w-full md:w-[90%] mx-auto"><DeleteStudentsFromSection /></div> }
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
