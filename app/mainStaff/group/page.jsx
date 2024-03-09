"use client";
import AddGroup from "./AddGroup";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteGroup from "./DeleteGroup";
import UpdateGroup from "./UpdateGroup";

const data = [
  {
    label: "Add Group",
    value: "Add Group",
  },
  {
    label: "Show Groups",
    value: "Show Groups",
  },
  {
    label: "Delete Group",
    value: "Delete Group",
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
              {value === "Add Group" && <AddGroup />}
              {value === "Show Groups" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateGroup /></div> }
              {value === "Delete Group" && <DeleteGroup />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
