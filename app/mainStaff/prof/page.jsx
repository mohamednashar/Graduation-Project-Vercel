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
    label: "Show Profs",
    value: "Show Profs",
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
              {value === "Add Prof" && <AddProf />}
              {value === "Show Profs" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateProf /></div> }
              {value === "Delete Prof" && <DeleteProf />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
