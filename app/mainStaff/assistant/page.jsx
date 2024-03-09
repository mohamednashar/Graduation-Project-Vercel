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
    label: "Show Assistants",
    value: "Show Assistants",
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
              {value === "Add Assistant" && <AddAssistant />}
              {value === "Show Assistants" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateAssistant /></div> }
              {value === "Delete Assistant" && <DeleteAssistant />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
