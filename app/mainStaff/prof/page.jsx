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
    label: "Add Prof",
    value: "Add Prof",
  },
  {
    label: "Update Prof",
    value: "Update Prof",
  },
  {
    label: "Delete Prof",
    value: "Delete Prof",
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
              {value === "Add Prof" && <AddProf />}
              {value === "Update Prof" && <div className="h-[500px] shadow-md w-full md:w-[80%] mx-auto"><UpdateProf /></div> }
              {value === "Delete Prof" && <DeleteProf />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
