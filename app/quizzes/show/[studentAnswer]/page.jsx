"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  params = useParams();
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
        const response = await axios.get(
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

  return (
    <div className="bg-gray-100 dark:bg-[#282828] p-4 rounded-lg shadow-md">
      <div className="flex justify-center my-2 ">
      <img
        alt="student photo"
        src={answers.studentImageUrl ? answers.studentImageUrl : "/user.png"}
        className="rounded-full object-cover w-[150px] h-[150px]"
      />
      </div>
      <h2 className="text-xl font-bold text-center my-5">
        {answers.studentFullName}
      </h2>
      <h2 className="text-xl font-bold text-center my-5">
        {" "}
        username : {answers.studentUserName}
      </h2>
      <h2 className="text-xl font-bold text-center my-5">
        degree get {" : "} {answers.studentTotalMarks}
      </h2>
      <h2 className="text-xl font-bold text-center mt-5 mb-10">
        Submitted date {" : "} {answers.studentSubmissionDate}
      </h2>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Multiple Choice Questions</h3>
        {answers?.mcqInfoWithStudentAnswerDtos?.map((mcq, index) => (
          <div key={index} className="mb-2 font-semibold">
            <p>{mcq.text}</p>
            <ul className=" pl-4  text-lg shadow-md my-5">
              <li
                className={
                  "OptionA" === mcq.correctAnswer &&
                  mcq.studentAnswer === "OptionA"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : "OptionA" != mcq.correctAnswer &&
                      mcq.studentAnswer === "OptionA"
                    ? "text-red-500 border-2 border-red-800 rounded-md w-fit p-2"
                    : "OptionA" === mcq.correctAnswer &&
                      mcq.studentAnswer != "OptionA"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : ""
                }
              >
                {mcq.optionA}
              </li>
              <li
                className={
                  "OptionB" === mcq.correctAnswer &&
                  mcq.studentAnswer === "OptionB"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : "OptionB" != mcq.correctAnswer &&
                      mcq.studentAnswer === "OptionB"
                    ? "text-red-500 border-2 border-red-800 rounded-md w-fit p-2"
                    : "OptionB" === mcq.correctAnswer &&
                      mcq.studentAnswer != "OptionB"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : ""
                }
              >
                {mcq.optionB}
              </li>
              <li
                className={
                  "OptionC" === mcq.correctAnswer &&
                  mcq.studentAnswer === "OptionC"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : "OptionC" != mcq.correctAnswer &&
                      mcq.studentAnswer === "OptionC"
                    ? "text-red-500 border-2 border-red-800 rounded-md w-fit p-2"
                    : "OptionC" === mcq.correctAnswer &&
                      mcq.studentAnswer != "OptionC"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : ""
                }
              >
                {mcq.optionC}
              </li>
              <li
                className={
                  "OptionD" === mcq.correctAnswer &&
                  mcq.studentAnswer === "OptionD"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : "OptionD" != mcq.correctAnswer &&
                      mcq.studentAnswer === "OptionD"
                    ? "text-red-500 border-2 border-red-800 rounded-md w-fit p-2"
                    : "OptionD" === mcq.correctAnswer &&
                      mcq.studentAnswer != "OptionD"
                    ? "text-green-600 border-2 border-green-800 w-fit rounded-md p-2"
                    : ""
                }
              >
                {mcq.optionD}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">True/False Questions</h3>
        {answers?.tfqInfoWithStudentAnswerDtos?.map((tfq, index) => (
          <div key={index} className="mb-2 font-semibold shadow-md my-3 p-5">
            <p>{tfq.text}</p>
            <p
              className={
                tfq.studetAnswer === tfq.corectAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              Student Answer: {tfq.studetAnswer ? "True" : "False"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
