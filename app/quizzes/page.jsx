"use client"
import React, { useState, useEffect } from "react";
import QuizList from "./QuizList";
import { useSession } from "next-auth/react";
import CourseCycleProf from "./CourseCycleProf";

const Page = () => {
  const { data: session, status } = useSession();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.roles;
      const student = role?.includes("Student");
      setIsStudent(student);
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isStudent ? <QuizList /> : <CourseCycleProf />}
    </div>
  );
};

export default Page;
