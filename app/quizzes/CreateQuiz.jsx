"use client";
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useSearchParams } from "next/navigation";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const CreateQuiz = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const searchParams = useSearchParams();
  const courseCycleId = searchParams.get("courseCycleId");

  const { data: session } = useSession();
  const userName = session?.user?.userName;

  const [formData, setFormData] = useState({
    name: "",
    fullMarks: 0,
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
    courseCycleId: parseInt(courseCycleId),
    professorUserName: userName,
    instructorUserName: "",
    stuffUserName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deadlineHours" || name === "deadlineMinutes") {
      setFormData({
        ...formData,
        deadLine: {
          ...formData.deadLine,
          [name === "deadlineHours" ? "hours" : "minutes"]: parseInt(value),
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const [hours, minutes] = value.split(":").map(Number);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sartedAt: `${prevFormData.sartedAt.substr(0, 11)}${value}:00.000Z`,
    }));
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().substr(0, 16);
    setFormData({ ...formData, sartedAt: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}Exam/CreateExam`, formData);
      console.log("Exam created:", response.data);
      handleOpen(); // Open dialog
    } catch (error) {
      console.error("Error creating exam:", error);
      // Optionally, handle error state
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mb-10 mt-10">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl mb-4 text-center text-black font-semibold">
            Create Exam
          </h1>
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="sartedAt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="deadlineHours"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Exam Duration:
              </label>
              <div className="flex items-center">
                <input
                  id="deadlineHours"
                  type="number"
                  name="deadlineHours"
                  value={formData.deadLine.hours}
                  onChange={handleChange}
                  className="w-1/2 mr-1 block border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
                />
                <span className="text-sm">Hours</span>
                <input
                  id="deadlineMinutes"
                  type="number"
                  name="deadlineMinutes"
                  value={formData.deadLine.minutes}
                  onChange={handleChange}
                  className="w-1/2 ml-1 block border-gray-300 rounded-lg shadow-sm border outline-none sm:text-sm px-2 py-1 h-9"
                />
                <span className="text-sm">Minutes</span>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="examType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          {formData.name ? "Exam Created Successfully" : "Error Creating Exam"}
        </DialogHeader>
        <DialogBody>
          {formData.name ? (
            <p>The exam "{formData.name}" has been successfully created.</p>
          ) : (
            <p>There was an error creating the exam. Please try again.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CreateQuiz;
