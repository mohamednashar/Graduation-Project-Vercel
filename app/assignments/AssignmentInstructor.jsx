import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AssignmentInstructor = () => {
  const axiosAuth=useAxiosAuth()
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axiosAuth.get(
          `${API}Section/GetAllSectionsOfInstructor`,
          {
            headers: {
              InstructorUserName: userName,
            },
          }
        );
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    if (userName) {
      fetchSections();
    }
  }, [userName]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10 mx-7">
      {sections.map((section) => (
        <Link
          key={section.sectionId}
          href={{
            pathname: `/assignments/${section.sectionName}`,
            query: { sectionId: section.sectionId },
          }}
        >
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 cursor-pointer flex flex-col gap-3 hover:scale-[1.03] transition-all duration-200">
            <h2 className="text-xl font-semibold dark:text-white">
              {section.sectionName}
            </h2>
            <p className="dark:text-gray-100">
            {section.sectionDescreption}
            </p>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Course:</span> {section.courseName}
            </p>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Group:</span> {section.groupName}
            </p>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Year:</span> {section.year}
            </p>
          
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AssignmentInstructor;
