"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const QuizzesOfCourse = () => {
  const axiosAuth=useAxiosAuth()
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const searchParams = useSearchParams();
  const courseCycleId = searchParams?.get("courseCycleId");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const todayDate = new Date(); // Get today's date and time

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosAuth.get(
          `${API}Exam/GetExamsOfCourseCycleToProfessor`,
          {
            headers: {
              ProfessorUserName: userName,
              CourseCycleId: courseCycleId,
            },
          }
        );
        console.log(response.status);
        setExams(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setLoading(false);
      }
    };

    if (courseCycleId) {
      fetchExams();
    }
  }, [courseCycleId, userName]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = formatDate(dateTimeString);
    return { date, time };
  };

  const handleDeleteClick = (exam) => {
    setSelectedExam(exam);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const headers = {
      "Content-Type": "application/json",
      ExamId: selectedExam.examId,
    };
    const data = JSON.stringify(userName);

    try {
      const response = await axiosAuth.delete(`${API}Exam/DeleteExam`, {
        headers: headers,
        data: data,
      });

      if (response.status === 200) {
        console.log("Exam deleted successfully");
        setExams(exams.filter((exam) => exam.examId !== selectedExam.examId));
        setDialogOpen(false);
      } else {
        console.error("Failed to delete exam:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedExam(null);
    setDialogOpen(false);
  };

  const isEditEnabled = (exam) => {
    const startDate = new Date(exam.startedAt);
    return startDate >= todayDate;
  };

  const isShowEnabled = (exam) => {
    const startDate = new Date(exam.startedAt);
    return startDate > todayDate;
  };

  return (
    <>
      <div className="mx-16 p-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 mb-10">
          {exams.map((exam) => (
            <div
              key={exam.examId}
              className="bg-white p-4 shadow-md rounded-2xl w-full dark:bg-[#1e1e1e]"
            >
              <div className="flex justify-between items-center mb-4 ">
                <div className=" gap-4 flex flex-col">
                  <h2 className="text-xl font-bold">{exam.examName}</h2>

                  <p>{exam.examTitle}</p>
                  <p className="font-semibold">
                    <span className="font-bold text-[#66bfbf]">
                      Exam Type:{" "}
                    </span>
                    {exam.examType}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-[#66bfbf]">
                      Start Date:{" "}
                    </span>
                    {formatDateTime(exam.startedAt).date}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-[#66bfbf]">
                      Start Time:{" "}
                    </span>
                    {formatDateTime(exam.startedAt).time}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-[#66bfbf]">Duration: </span>
                    {exam.deadLine.split(":").slice(0, 2).join(":")}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-[#66bfbf]">
                      Full Marks:{" "}
                    </span>
                    {exam.examFullMarks}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {isEditEnabled(exam) ? (
                    <Link
                      href={{
                        pathname: "/quizzes/edit",
                        query: { courseCycleId, examId: exam.examId },
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <button>Edit</button>
                    </Link>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDeleteClick(exam)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className="ml-2">Delete</span>
                  </button>
                  {isShowEnabled(exam) ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span className="ml-2">Show</span>
                    </button>
                  ) : (
                    <Link
                    href={{
                      pathname: "/quizzes/show",
                      query: { examId: exam.examId },
                    }}
                      className="bg-green-500 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <button>Show</button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-2">
                {/* Other exam details if needed */}
              </div>
            </div>
          ))}
        </div>
        {/* Button for creating exam */}
        <div className="mt-4 flex justify-center">
          <Link
            className="bg-[#66bfbf] font-semibold hover:bg-[#5bacac] transition-all duration-200 text-white px-4 py-2 rounded-md"
            href={{
              pathname: "quizzesOfCourse/createExam",
              query: { courseCycleId },
            }}
          >
            Create Exam
          </Link>
        </div>
      </div>
      <Dialog open={dialogOpen} handler={handleCloseDialog}>
        <DialogHeader>Delete Exam</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the exam 
          {selectedExam && selectedExam.examName}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default QuizzesOfCourse;
