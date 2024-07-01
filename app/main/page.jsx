"use client";
import React, { useEffect, useState } from "react";
import { CardDefault } from "../components/Card";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";


const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const Page = () => {
  const { data: session } = useSession();
  const [coursesStudent, setCoursesStudent] = useState([]);
  const [coursesProf, setCoursesProf] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseCycleId, setCourseCycleId] = useState(-1);
  const [sectionStudent, setSectionStudent] = useState([]);
  const [sectionsProf, setSectionsProf] = useState([]);
  const [sectionsInstructor, setSectionsInstructor] = useState([]);
  const userName = session?.user?.userName;
  const role = session?.user?.roles;

  const isInstructor = role?.includes("Instructor");
  const isStudent = role?.includes("Student");
  const isProfessor = role?.includes("Professor");
  const axiosAuth=useAxiosAuth()

 



  const handleOpen = (courseCycleId, index) => {
    setOpen(open === index ? -1 : index);
    setCourseCycleId(courseCycleId);
    console.log(courseCycleId);
  };
  useEffect(() => {
    async function fetchCoursesStudent() {
      try {
        const response = await axiosAuth.get(
          `${API}Course/GetAllCoursesOfStudent`,
          {
            headers: {
              StudentUserName: userName,
            },
          }
        );
        setCoursesStudent(response.data);

        response.status === 200
          ? console.log("get course done successfully")
          : console.log("Failed to get courses");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    async function fetchCoursesProf() {
      try {
        const response = await axiosAuth.get(
          `Course/GetAllCoursesOfProfessor`,
          {
            headers: {
              ProfessorUserName: userName,
            },
          }
        );
        setCoursesProf(response.data);

        response.status === 200
          ? console.log("get course done successfully")
          : console.log("Failed to get courses");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    async function fetchSectionsInstructor() {
      try {
        const response = await axiosAuth.get(
          `${API}Section/GetAllSectionsOfInstructor`,
          {
            headers: {
              InstructorUserName: userName,
            },
          }
        );
        setSectionsInstructor(response.data);

        response.status === 200
          ? console.log("get course done successfully")
          : console.log("Failed to get courses");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    if (isStudent) {
      fetchCoursesStudent();
    } else if (isProfessor) {
      fetchCoursesProf();
    } else if (isInstructor) {
      fetchSectionsInstructor();
    }
  }, [session]);

  useEffect(() => {
    async function fetchSectionOfCourse() {
      try {
        const response = await axiosAuth.get(
          `${API}Section/GetSectionOfCourseToStudent`,
          {
            headers: {
              StudentUserName: userName,
              CourseCylceId: courseCycleId,
            },
          }
        );
        setSectionStudent(response.data);
        console.log(response);
        response.status === 200
          ? console.log("get section done successfully")
          : console.log("Failed to get section");
        console.log(response.status);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    async function fetchSectionsOfCourseCycle() {
      try {
        const response = await axiosAuth.get(
          `${API}Section/GetAllSectionsOfCourseCycle`,
          {
            headers: {
              CourseCycleId: courseCycleId,
            },
          }
        );
        setSectionsProf(response.data);
        console.log(response.data);
        response.status === 200
          ? console.log("get section done successfully")
          : console.log("Failed to get section");
        console.log(response.status);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    if (isStudent) {
      fetchSectionOfCourse();
    } else if (isProfessor) {
      fetchSectionsOfCourseCycle();
    }
  }, [open]);

  return (
    <div className="mb-10 flex flex-col gap-8">
      <div className="text-center ">
        <h1 className="mt-5 text-2xl font-bold pb-2 border-b-4 inline-block border-solid border-[#66bfbf]">
          COURSES
        </h1>
        {isStudent &&
          coursesStudent.map((course, index) => (
            <div
              className="max-w-screen-lg mx-4 mt-6 overflow-hidden border dark:border-none rounded-t-xl  sm:mx-auto"
              key={course.courseId}
            >
              <CardDefault
                courseTitle={course.courseName}
                group={course.groupName}
                professor={`${course.professorFirstName} ${course.professorSecondName}`}
              />
              <div className="max-w-screen-lg mx-4  overflow-hidden rounded-b-xl sm:mx-auto">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-[#1e1e1e] dark:text-white sm:flex-row ">
                  <div className="w-full">
                    <Accordion
                      open={open === index}
                      animate={CUSTOM_ANIMATION}
                      className="bg-[white]  dark:bg-[#282828] rounded-b-xl"
                    >
                      <AccordionHeader
                        className="dark:text-white px-3 hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
                        onClick={() => handleOpen(course.courseCycleId, index)}
                      >
                        Get section
                      </AccordionHeader>
                      <AccordionBody className="dark:text-white mx-3">
                        <Link
                          href={`sections/${sectionStudent.sectionName}-${course.groupName}`}
                        >
                          <div className="flex items-center justify-between mx-5 font-semibold text-lg my-2">
                            <div>{sectionStudent.sectionName}</div>
                            <div>
                              {" "}
                              Instructor : {
                                sectionStudent.instructorNameFirst
                              }{" "}
                              {sectionStudent.instructorSecondName}{" "}
                            </div>
                          </div>
                          <div className="text-start font-light mx-5 text-md">
                            {sectionStudent.sectionDescreption}
                          </div>
                        </Link>
                      </AccordionBody>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isProfessor &&
          coursesProf.map((course, index) => (
            <div
              className="max-w-screen-lg mx-4 mt-6 overflow-hidden border dark:border-none rounded-t-xl  sm:mx-auto"
              key={course.courseId}
            >
              <CardDefault
                courseTitle={course.courseName}
                group={course.groupName}
                faculty={course.facultyName}
                department={course.departmentName}
              />

              <div className="max-w-screen-lg mx-4  overflow-hidden rounded-b-xl sm:mx-auto">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-[#1e1e1e] dark:text-white sm:flex-row ">
                  <div className="w-full">
                    <Accordion
                      open={open === index}
                      animate={CUSTOM_ANIMATION}
                      className="bg-[white]  dark:bg-[#282828] rounded-b-xl"
                    >
                      <AccordionHeader
                        className="dark:text-white px-3 hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
                        onClick={() => handleOpen(course.courseCycleId, index)}
                      >
                        Get section
                      </AccordionHeader>
                      {sectionsProf.map((section, index) => {
                        return (
                          <AccordionBody
                            key={index}
                            className="dark:text-white mx-3 border-b-2 mb-2 pb-2"
                          >
                            <Link
                              href={`sections/${section.sectionName}-${course.groupName}`}
                            >
                              <div className="flex items-center justify-between mx-5 font-semibold text-lg my-2">
                                <div>{section.sectionName}</div>
                                <div>
                                  {" "}
                                  Instructor : {
                                    section.instructorFirstName
                                  }{" "}
                                  {section.instructorSecondName}{" "}
                                </div>
                              </div>
                            </Link>
                          </AccordionBody>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isInstructor &&
          sectionsInstructor.map((section, index) => (
            <div
              className="max-w-screen-lg mx-4 mt-6 overflow-hidden border dark:border-none rounded-t-xl  sm:mx-auto"
              key={section.courseId}
            >
              <CardDefault
                courseTitle={section.sectionName}
                group={section.groupName}
                description={section.sectionDescreption}
                faculty={section.facultyName}
                department={section.departmentName}
              />
              <div className="max-w-screen-lg mx-4  overflow-hidden rounded-b-xl sm:mx-auto">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-[#1e1e1e] dark:text-white sm:flex-row ">
                  <div className="w-full">
                    <Accordion
                      open={open === index}
                      animate={CUSTOM_ANIMATION}
                      className="bg-[white]  dark:bg-[#282828] rounded-b-xl"
                    >
                      <AccordionHeader
                        className="dark:text-white px-3 hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
                        onClick={() => handleOpen(1, index)}
                      >
                        Get Course
                      </AccordionHeader>

                      <AccordionBody
                        key={index}
                        className="dark:text-white mx-3"
                      >
                        <Link
                          href={`courses/${section.courseName}-${section.groupName}`}
                        >
                          <div className="flex items-center justify-between mx-5 font-semibold text-lg my-2">
                            <div>{section.courseName}</div>
                            <div>
                              {" "}
                              Professor : {section.professorFirstName}{" "}
                              {section.professorSecondName}{" "}
                            </div>
                          </div>
                        </Link>
                      </AccordionBody>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
