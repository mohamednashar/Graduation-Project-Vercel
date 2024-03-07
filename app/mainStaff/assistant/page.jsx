"use client";
import AddAssistant from "./AddAssistant";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteAssistant from "./DeleteAssistant";
import UpdateAssistant from "./UpdateAssistant";

const data = [
  {
    label: "Add Assistant",
    value: "Add Assistant",
  },
  {
    label: "Update Assistant",
    value: "Update Assistant",
  },
  {
    label: "Delete Assistant",
    value: "Delete Assistant",
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
              {value === "Add Assistant" && <AddAssistant />}
              {value === "Update Assistant" && <div className="h-[500px] shadow-md w-full md:w-[80%] mx-auto"><UpdateAssistant /></div> }
              {value === "Delete Assistant" && <DeleteAssistant />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
