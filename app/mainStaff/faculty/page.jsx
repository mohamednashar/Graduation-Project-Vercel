"use client";
import AddFaculty from "./AddFaculty";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DeleteFaculty from "./DeleteFaculty";
import UpdateFaculty from "./UpdateFaculty";
import setAuthorizationToken from "@/app/components/setAuthorizationToken";
import { useSession } from "next-auth/react";

const data = [
  {
    label: "Add Faculty",
    value: "Add Faculty",
  },
  {
    label: "Show Faculties",
    value: "Show Faculties",
  },
  {
    label: "Delete Faculty",
    value: "Delete Faculty",
  },
];




const page = () => {
  const defaultTabValue = data[0].value;
  const tabAnimate = {
    initial: { y: -50, scale: 0.7 },
    mount: { y: 0, scale: 1 },
    unmount: { y: 50, scale: 0.7 },
  };
  const { data: session } = useSession();
  const token = session?.user?.jwtToken;
setAuthorizationToken(token)

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
              {value === "Add Faculty" && <AddFaculty />}
              {value === "Show Faculties" && <div className="h-[700px] shadow-md w-full md:w-[90%] mx-auto"><UpdateFaculty /></div> }
              {value === "Delete Faculty" && <DeleteFaculty />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default page;
