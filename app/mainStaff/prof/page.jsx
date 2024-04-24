"use client";
import AddProf from "./AddProf";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteProf from "./DeleteProf";
import UpdateProf from "./UpdateProf";

const data = [
  {
    label: "Add Professor",
    value: "Add Professor",
  },
  {
    label: "Show Professors",
    value: "Show Professors",
  },
  {
    label: "Delete Professor",
    value: "Delete Professor",
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
              {value === "Add Professor" && <AddProf />}
              {value === "Show Professors" && <div className="h-[700px] w-full md:w-[90%] mx-auto"><UpdateProf /></div> }
              {value === "Delete Professor" && <DeleteProf />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
