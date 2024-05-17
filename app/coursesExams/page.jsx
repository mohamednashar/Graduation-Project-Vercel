"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const CoursesExams = () => {
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API}Course/GetAllCoursesOfStudent`,
          {
            headers: {
              StudentUserName: userName,
            },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (userName) {
      fetchCourses();
    }
  }, [userName]);

  const options = courses.map((course) => ({
    value: course.courseCycleId,
    label: course.courseName,
  }));

  const handleSelectChange = async (selectedOption) => {
    setSelectedCourse(selectedOption);
    try {
      const response = await axios.get(
        `${API}Exam/GetAllExamsOfCourseCycleToStudent`,
        {
          params: {
            courseCycleId: selectedOption.value,
            studentUserName: userName,
          },
        }
      );
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleStartQuiz = (examId) => {
    // Handle start quiz action here
    console.log(`Start quiz for exam ID: ${examId}`);
  };

  return (
    <div className=" rounded-lg  p-6 mb-6 w-full">
      <div className="flex justify-center flex-col text-center max-w-lg mx-auto">
        <label
          htmlFor="selectCourse"
          className="block text-xl font-bold mb-2 text-[#66bfbf]"
        >
          Select Course:
        </label>
        <Select
          id="selectCourse"
          value={selectedCourse}
          onChange={handleSelectChange}
          options={options}
          placeholder="Select a course"
          isSearchable
          className="mb-4"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#66bfbf" : "transparent",
              color: "black",
              cursor: "pointer",
            }),
          }}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div
            key={exam.examId}
            className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-2 text-[#66bfbf]">
              {exam.examName}
            </h3>
            <p className="text-gray-700 mb-2">{exam.examTitle}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-black">Type:</span>{" "}
              {exam.examType}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-black">Start Date:</span>{" "}
              {new Date(exam.startedDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-black">Start Time:</span>{" "}
              {new Date(exam.startedDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-black">Duration:</span>{" "}
            
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-black">Marks:</span>{" "}
              {exam.marksOfStudent}/{exam.fullMarksOfExam}
            </p>
            <Link
              href={{
                pathname: "/coursesExams/exam",
                query: { examid: exam.examId }, // Pass the examId as a query parameter
              }}
            >
              <button
                disabled={new Date(exam.startedDate) > new Date()}
                className="bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-md font-semibold hover:bg-[#529d9d] transition-all duration-200 w-full text-center disabled:bg-[#66bfbf8f]"
              >
                Start Quiz
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesExams;
