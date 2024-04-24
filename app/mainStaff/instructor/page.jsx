"use client";
import AddProf from "./AddInstructor";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteProf from "./DeleteInstructor";
import UpdateProf from "./UpdateInstructor";
import AddInstructor from "./AddInstructor";
import DeleteInstructor from "./DeleteInstructor";
import UpdateInstructor from "./UpdateInstructor";

const data = [
  {
    label: "Add Instructor",
    value: "Add Instructor",
  },
  {
    label: "Show Instructors",
    value: "Show Instructors",
  },
  {
    label: "Delete Instructor",
    value: "Delete Instructor",
  },
];

const page = () => {
  const defaultTabValue = data[0].value;

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
              {value === "Add Instructor" && <AddInstructor />}
              {value === "Show Instructors" && <div className="h-[700px] w-full md:w-[90%] mx-auto"><UpdateInstructor /></div> }
              {value === "Delete Instructor" && <DeleteInstructor />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
