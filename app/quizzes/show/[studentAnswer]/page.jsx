"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const axiosAuth=useAxiosAuth()
  const params = useParams();
  const linkParam = params.studentAnswer;

  // Find the index of "studentNameValue"
  const nameIndex = linkParam.indexOf("student");
  // Find the index of "AndExamIdValue"
  const examIdIndex = linkParam.indexOf("ExamId");

  // Extract the student name value
  const studentNameStartIndex = nameIndex + "student".length;
  const studentNameEndIndex = examIdIndex;
  const studentName = linkParam.substring(
    studentNameStartIndex,
    studentNameEndIndex
  );

  // Extract the exam ID value
  const examIdStartIndex = examIdIndex + "ExamId".length;
  const examIdString = linkParam.substring(examIdStartIndex);
  const examId = parseInt(examIdString);
  const API = process.env.NEXT_PUBLIC_BACKEND_API;
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchStudentAnswers = async () => {
      try {
        const response = await axiosAuth.get(
          `${API}Exam/GetStudentanswerOfExamWithModelAnswer`,
          {
            params: {
              StudnetUserName: studentName,
              ExamId: examId,
            },
          }
        );

        setAnswers(response.data);
        console.log(response.data); // Log the fetched answers

        if (response.status === 200) {
          console.log("done fetching answers");
        } else {
          console.log("failed fetching answers: ", response.status);
        }
      } catch (err) {
        console.log("error getting student answers: ", err);
      }
    };

    fetchStudentAnswers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="bg-white p-8 rounded-lg shadow-md mx-2 md:mx-16 w-full">
        <div className="flex justify-center my-2">
          <img
            alt="student photo"
            src={
              answers.studentImageUrl ? answers.studentImageUrl : "/user.png"
            }
            className="rounded-full object-cover w-[150px] h-[150px]"
          />
        </div>
        <h2 className="text-xl font-bold text-center my-5">
          {answers.studentFullName}
        </h2>
        <h2 className="text-xl font-bold text-center my-5">
          Username: {answers.studentUserName}
        </h2>
        <h2 className="text-xl font-bold text-center my-5">
          Total Mark: {answers.studentTotalMarks}
        </h2>
        <div className="flex justify-center items-center my-5">
          <p className="text-xl font-bold text-center ">Submitted Date:</p>
          <p className="text-xl font-bold text-center ml-1">
            {formatDate(answers.studentSubmissionDate)}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-xl font-bold text-center">Submitted Time:</p>
          <p className="text-xl font-bold text-center ml-1">
            {formatTime(answers.studentSubmissionDate)}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Multiple Choice Questions</h3>
          {answers?.mcqInfoWithStudentAnswerDtos?.map((mcq, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
              <p>{mcq.text}</p>
              <p className="text-sm font-semibold mb-2">Degree: {mcq.degree}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Choice
                  choice={mcq.optionA}
                  isCorrect={mcq.correctAnswer === "OptionA"}
                  isSelected={mcq.studentAnswer === "OptionA"}
                />
                <Choice
                  choice={mcq.optionB}
                  isCorrect={mcq.correctAnswer === "OptionB"}
                  isSelected={mcq.studentAnswer === "OptionB"}
                />
                <Choice
                  choice={mcq.optionC}
                  isCorrect={mcq.correctAnswer === "OptionC"}
                  isSelected={mcq.studentAnswer === "OptionC"}
                />
                <Choice
                  choice={mcq.optionD}
                  isCorrect={mcq.correctAnswer === "OptionD"}
                  isSelected={mcq.studentAnswer === "OptionD"}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">True/False Questions</h3>
          {answers?.tfqInfoWithStudentAnswerDtos?.map((tfq, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
              <p>{tfq.text}</p>
              <p className="text-sm font-semibold mb-2">Degree: {tfq.degree}</p>
              <p
                className={
                  tfq.studetAnswer === tfq.corectAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Student Answer: {tfq.studetAnswer ? "True" : "False"}
                {tfq.studetAnswer === tfq.corectAnswer
                  ? " (Correct)"
                  : " (Incorrect)"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Choice = ({ choice, isCorrect, isSelected }) => {
  return (
    <div
      className={`${
        isSelected ? (isCorrect ? "bg-green-600" : "bg-red-600") : "bg-gray-200"
      } p-4 rounded-lg text-center`}
    >
      <span
        className={isCorrect && !isSelected ? "font-bold text-green-600" : ""}
      >
        {choice}
      </span>{" "}
    </div>
  );
};

export default Page;
