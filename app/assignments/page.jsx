"use client";
import React from "react";
import AssignmentStudent from "./AssignmentStudent";
import AssignmentInstructor from "./AssignmentInstructor";

import { useSession } from "next-auth/react";
import { Spinner } from "@material-tailwind/react";

const Page = () => {
  const { data: session, status } = useSession();

  // Show nothing or a loading component while session data is being fetched
  if (status === "loading") {
    return <div className="h-[91vh] flex text-center justify-center items-center"><Spinner className="h-14 w-14" color='teal'/></div>;
  }

  const roles = session?.user.roles || [];

  return (
    <div className="mt-5">
      {roles.includes("Instructor") ? (
        <AssignmentInstructor />
      ) : (
        <AssignmentStudent />
      )}
    </div>
  );
};

export default Page;
