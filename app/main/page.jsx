"use client"
import React, { useEffect, useState } from 'react';
import { CardDefault } from '../components/Card';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from 'next/link';
 
const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};
 

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const Page = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseCycleId , setCourseCycleId] = useState(-1)
  const [section , setSection] = useState([])
  const userName=session?.user?.userName

  const handleOpen = (courseCycleId , index) => {setOpen(open === index ? -1 : index) ; setCourseCycleId(courseCycleId); console.log(courseCycleId) };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API}Course/GetAllCoursesOfStudent`, {
          headers: {
            "StudentUserName": userName,
          },
        });
        setCourses(response.data);

        response.status === 200? console.log("get course done successfully") : console.log("Failed to get courses")
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  
    if (session) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API}Section/GetSectionOfCourseToStudent`, {
          headers: {
            "StudentUserName":userName,
            "CourseCylceId": courseCycleId
          },
        });
        setSection(response.data);
        console.log(response)
        response.status === 200? console.log("get section done successfully") : console.log("Failed to get section")
          console.log(response.status)
      } catch (error) {
        console.error('Error fetching courses:', error);
      } 
    }
    fetchData();
  }, [open]);

  return (
    <div className='mb-10 flex flex-col gap-8'>
      <div className="text-center ">
        <h1 className="mt-5 text-2xl font-bold pb-2 border-b-4 inline-block border-solid border-[#66bfbf]">
          COURSES
        </h1>
        {console.log(courses)}
        {courses.map((course , index) => (
          
          <div className='max-w-screen-lg mx-4 mt-6 overflow-hidden border dark:border-none rounded-t-xl  sm:mx-auto'  key={course.courseId}>
          <CardDefault
            courseTitle={course.courseName}
            group={course.groupName}
            description={"This is Test Description"}
            professor={`${course.professorFirstName} ${course.professorSecondName}`}
          />
          <Accordion open={open === index} animate={CUSTOM_ANIMATION} className='bg-[white]  dark:bg-[#282828] rounded-b-xl'>
        <AccordionHeader className='dark:text-white px-3 hover:bg-[#F5F5F5] dark:hover:bg-[#242424]' onClick={()=>handleOpen(course.courseCycleId , index)}>Get section</AccordionHeader>
        <AccordionBody className='dark:text-white mx-3'>
        <Link href={`sections/${section.sectionName}-${course.groupName}`}>
        <div className='flex items-center justify-between mx-5 font-semibold text-lg my-2'>
            <div>{section.sectionName}</div>
            <div> Instructor :  {section.instructorNameFirst} {" "} {section.instructorSecondName} </div>
        </div>
          <div className='text-start font-light mx-5 text-md'>{section.sectionDescreption}</div>
        </Link>
        </AccordionBody>
      </Accordion>
      </div>

        ))}
      </div>
    </div>
  );
};

export default Page;