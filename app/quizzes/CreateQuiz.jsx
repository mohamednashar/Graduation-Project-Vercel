  "use client";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Select from "react-select";
  import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  const CreateQuiz = () => {
    const router=useRouter()
    const [formData, setFormData] = useState({
      name: "",
      faullMarks: 0,
      title: "",
      sartedAt: new Date().toISOString().substr(0, 16),
      deadLine: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      examType: "Quiz",
      sectionId: 0,
      courseId: 0,
      courseCycleId: 0,
    });

    const [courses, setCourses] = useState([]);
    const { data: session } = useSession();
    const userName = session?.user?.userName;

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

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "hours" || name === "minutes" || name === "seconds") {
        setFormData({
          ...formData,
          deadLine: {
            ...formData.deadLine,
            [name]: parseInt(value),
          },
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    const handleTimeChange = (e) => {
      const value = e.target.value;
      const [hours, minutes] = value.split(":").map(Number);
      setFormData({
        ...formData,
        sartedAt: `${formData.sartedAt.substr(0, 11)}${value}:00.000Z`,
      });
    };

    const handleDateChange = (e) => {
      const date = new Date(e.target.value);
      const formattedDate = date.toISOString().substr(0, 16);
      setFormData({
        ...formData,
        sartedAt: formattedDate,
      });
    };

    const handleDeadlineChange = (e) => {
      const value = e.target.value;
      const [hours, minutes] = value.split(":").map(Number);
      setFormData({
        ...formData,
        deadLine: {
          hours,
          minutes,
          seconds: 0,
        },
      });
    };

    const handleSubmit = async (e) => {
      console.log(formData)
      e.preventDefault();
      try {
        const response = await axios.post(`${API}Exam/CreateExam`, formData);
        console.log("Exam created:", response.data);
        const examId = response.data.examId;
      router.push(`/createQuestions?examId=${examId}`);
      } catch (error) {
        console.error("Error creating exam:", error);
      }
    };

    return (
      <div className="flex justify-center items-center mb-10 mt-10">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl mb-4 text-center text-black font-semibold">Create Exam</h1>
        <div className="grid grid-cols-2 gap-8 mb-4">
          <div className="col-span-2">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Select Course:
            </label>
            <Select
              className="text-sm"
              id="course"
              options={courses.map((course) => ({
                value: course.courseCycleId,
                label: course.courseName,
              }))}
              onChange={(selectedOption) =>
                setFormData({ ...formData, courseCycleId: selectedOption.value })
              }
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
            />
          </div>
          <div>
            <label htmlFor="sartedAt" className="block text-sm font-medium text-gray-700 mb-1">
              Exam Start Date:
            </label>
            <input
              id="sartedAt"
              type="date"
              name="sartedAt"
              value={formData.sartedAt ? formData.sartedAt.substr(0, 10) : ""}
              onChange={handleDateChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time:
            </label>
            <input
              id="startTime"
              type="time"
              name="startTime"
              value={formData.sartedAt ? formData.sartedAt.substr(11, 5) : ""}
              onChange={handleTimeChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
            />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Exam Deadline:
            </label>
            <input
              id="deadline"
              type="time"
              name="deadline"
              value={`${formData.deadLine.hours
                .toString()
                .padStart(2, "0")}:${formData.deadLine.minutes
                .toString()
                .padStart(2, "0")}`}
              onChange={handleDeadlineChange}
              className="block w-full border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
            />
          </div>
          <div className="">
            <label htmlFor="examType" className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type:
            </label>
            <Select
              className="text-sm"
              id="examType"
              options={[
                { value: "Quiz", label: "Quiz" },
                { value: "Midterm", label: "Midterm" },
                { value: "Semester", label: "Semester" },
                { value: "Final", label: "Final" },
              ]}
              value={{ value: formData.examType, label: formData.examType }}
              onChange={(selectedOption) =>
                setFormData({ ...formData, examType: selectedOption.value })
              }
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-flex justify-center py-2 mt-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#66bfbf] hover:bg-[#57a6a6] transition-all duration-200"
          >
            Create Exam
          </button>
        </div>
      </div>
    </div>
    
    
    );
  };

  export default CreateQuiz;
