import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
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
                <Link key={course.courseCycleId} href={{ pathname: 'quizzes/quizzesOfCourse', query: { courseCycleId: course.courseCycleId } }}>         
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer">
                            <h2 className="text-xl font-semibold dark:text-white">{course.courseName}</h2>
                            <p className="text-gray-500 dark:text-gray-300 mb-2">Group: {course.groupName}</p>
                            <p className="text-gray-500 dark:text-gray-300 mb-2">Year: {course.year}</p>
                            <p className="text-gray-500 dark:text-gray-300 mb-2">Department: {course.departmentName}</p>
                            <p className="text-gray-500 dark:text-gray-300 mb-2">Faculty: {course.facultyName}</p>
                        </div>

                </Link>
            ))}
        </div>
    );
};

export default CourseCycleProf;
