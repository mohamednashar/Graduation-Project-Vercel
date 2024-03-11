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
  const tabAnimate = {
    initial: { y: -50, scale: 0.7 },
    mount: { y: 0, scale: 1 },
    unmount: { y: 50, scale: 0.7 },
  };
  return (
    <div>
      <Tabs value={defaultTabValue}>
        <TabsHeader className="w-full md:w-[90%] mx-auto bg-gray-300 dark:bg-[#1e1e1e] ">
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
            <TabPanel className="dark:text-gray-100" key={value} value={value}>
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
