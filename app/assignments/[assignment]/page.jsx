"use client"
import React from 'react'
import Student from './Student'
import Prof from './Prof'
import { useSession } from 'next-auth/react';
import AllAssignments from '../AllAssignments';
import { Spinner } from '@material-tailwind/react';

function page({params}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-[91vh] flex text-center justify-center items-center"><Spinner className="h-20 w-20" color='teal'/></div>;
  }

  const roles = session?.user.roles || [];
  return (
    <div className="mt-5">
      {roles.includes("Instructor") ? (
        <AllAssignments />
      ) : (
        <Student />
      )}
    </div>
  );
}

export default page