import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
const API = process.env.NEXT_PUBLIC_BACKEND_API;

const QuizDetails = () => {
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const role = session?.user?.roles;
  const isInstructor = role?.includes("Instructor");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isInstructor ? 'Section/GetAllSectionsOfInstructor' : 'Course/GetAllCoursesOfProfessor';
        const response = await axiosAuth.get(
          `${API}${endpoint}`,
          {
            headers: {
              [isInstructor ? 'InstructorUserName' : 'ProfessorUserName']: userName,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userName) {
      fetchData();
    }
  }, [userName, isInstructor]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10 mx-7">
      {data.map((item) => (
        <Link
          key={isInstructor ? item.sectionId : item.courseCycleId}
          href={{
            pathname: isInstructor ? 'quizzes/quizzesOfSection' : 'quizzes/quizzesOfCourse',
            query: { id: isInstructor ? item.sectionId : item.courseCycleId },
          }}
        >
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 cursor-pointer flex flex-col gap-3 hover:scale-[1.03] transition-all duration-200">
            <h2 className="text-xl font-semibold dark:text-white">
              {isInstructor ? item.sectionName : item.courseName}
            </h2>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Course:</span> {item.courseName}
            </p>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Group:</span> {item.groupName}
            </p>
            <p className="dark:text-gray-100">
              <span className="text-[#66bfbf] font-semibold">Year:</span> {item.year}
            </p>
            {isInstructor && (
              <>
                <p className="dark:text-gray-100">
                  <span className="text-[#66bfbf] font-semibold">Professor:</span> {item.professorFirstName} {item.professorSecondName}
                </p>
                <p className="dark:text-gray-100">
                  <span className="text-[#66bfbf] font-semibold">Description:</span> {item.sectionDescreption}
                </p>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuizDetails;
