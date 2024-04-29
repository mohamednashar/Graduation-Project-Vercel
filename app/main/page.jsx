"use client"
import React, { useEffect, useState } from 'react';
import { CardDefault } from '../components/Card';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const Page = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const userName=session?.user?.userName


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API}Course/GetAllCoursesOfStudent`, {
          headers: {
            "StudentUserName": userName,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className='mb-10 flex flex-col gap-8'>
      <div className="text-center ">
        <h1 className="mt-5 text-2xl font-bold pb-2 border-b-4 inline-block border-solid border-[#66bfbf]">
          COURSES
        </h1>
        {courses.map((course) => (
          <CardDefault
            key={course.courseId}
            courseTitle={course.courseName}
            group={course.groupName}
            description={"This is Test Description"}
            professor={`${course.professorFirstName} ${course.professorSecondName}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
