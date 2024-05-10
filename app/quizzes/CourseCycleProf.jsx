import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const API = process.env.NEXT_PUBLIC_BACKEND_API;

const CourseCycleProf = () => {
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API}Course/GetAllCoursesOfProfessor`,
          {
            headers: {
              ProfessorUserName: userName,
            },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [userName]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10 mx-7">
      {courses.map((course) => (
        <Link
          key={course.courseCycleId}
          href={{
            pathname: "quizzes/quizzesOfCourse",
            query: { courseCycleId: course.courseCycleId },
          }}
        >
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 cursor-pointer flex flex-col gap-3 hover:scale-[1.03] transition-all duration-200">
            <h2 className="text-xl font-semibold dark:text-white">
              {course.courseName}
            </h2>
            <p className="dark:text-gray-100">
             <span className="text-[#66bfbf] font-semibold">Group:</span>  {course.groupName}
            </p>
            <p className="dark:text-gray-100">
            <span className="text-[#66bfbf] font-semibold">Year:</span> {course.year}
            </p>
            <p className="dark:text-gray-100">
            <span className="text-[#66bfbf] font-semibold">Department:</span> {course.departmentName}
            </p>
            <p className="dark:text-gray-100">
            <span className="text-[#66bfbf] font-semibold">Faculty:</span> {course.facultyName}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseCycleProf;
