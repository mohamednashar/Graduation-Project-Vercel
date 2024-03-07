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
    label: "Update Student",
    value: "Update Student",
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
        <TabsHeader className="mx-40 bg-gray-300 border-2">
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
              {value === "Add Student" && <AddStudent />}
              {value === "Update Student" && <div className="h-[500px] shadow-md w-[1000px] mx-auto"><UpdateStudent /></div> }
              {value === "Delete Student" && <DeleteStudent />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
