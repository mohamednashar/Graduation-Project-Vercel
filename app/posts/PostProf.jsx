"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardCourses from "../components/CardCourses";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

function PostProf() {
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const API = process.env.NEXT_PUBLIC_BACKEND_API;
  const [courses, setCourses] = useState([]);
  const axiosAuth=useAxiosAuth()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosAuth.get(`${API}Course/GetAllCoursesOfProfessor`, {
          headers: {
            ProfessorUserName: userName,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (userName) {
      fetchCourses();
    }
  }, [userName, API]);

  return (
    <div className="">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 p-4 gap-5">
        {courses.map((course) => (
          <CardCourses
            key={course.courseCycleId}
            link={"posts"}
            courseName={course.courseName}
            facultyName={course.facultyName}
            department={course.departmentName}
            group={course.groupName}
            Year={`Year ${course.year}`}
            courseCycleId={`/posts/${course.courseCycleId}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PostProf;
