"use client";
  import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const Exam = () => {
  const searchParams = useSearchParams();
  const examId = searchParams?.get("examid");
  const { data: session } = useSession();
  const userName = session?.user?.userName;

  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds

  useEffect(() => {
    if (!examId || !userName) return;

    const fetchExamQuestions = async () => {
      try {
        const response = await axios.get(`${API}Exam/GetAllExamWorkNowToStudent`, {
          params: {
            ExamId: examId,
            StudnetUserName: userName,
          },
        });
        const { mCQTextOptionsDtos, tFQTextOptionsDtos, examDateTime, examDeadLine } = response.data;
        
        // Calculate remaining time based on exam start time and duration
        const examStartTime = new Date(examDateTime).getTime();
        const examDurationHours = parseInt(examDeadLine.split(':')[0]);
        const examEndTime = examStartTime + (examDurationHours * 60 * 60 * 1000);
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(0, examEndTime - currentTime) / 1000; // Convert milliseconds to seconds
        setTimer(remainingTime);

        // Combine multiple types of questions into one array
        const combinedQuestions = [...mCQTextOptionsDtos, ...tFQTextOptionsDtos];
        setQuizData(combinedQuestions.map(question => ({
          questionId:question.questionId,
          question: question.text,
          options: question.optionA ? [question.optionA, question.optionB, question.optionC, question.optionD] : ["True", "False"],
          correctAnswer: question.optionA ? null : question.text === "Is true true?", // For True/False questions
          degree: question.degree
        })));
      } catch (error) {
        console.error("Error fetching exam questions:", error);
      }
    };

    fetchExamQuestions();

    // Set interval to update timer every second
    const intervalId = setInterval(() => {
      setTimer(prevTimer => Math.max(0, prevTimer - 1));
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [examId, userName]);

  const handleAnswer = (index, answer) => {
    setUserAnswers([
      ...userAnswers.slice(0, index),
      answer,
      ...userAnswers.slice(index + 1),
    ]);
  };

  const handleSubmit = async () => {
    try {
      const studentMCQAnswers = [];
      const studentTFQAnswers = [];
      
      // Prepare MCQ answers
      quizData.forEach((question, index) => {
   
        if (question.options.length > 2) { // Check if it's an MCQ question
          const answerIndex = question.options.findIndex(option => option === userAnswers[index]);
          const studentAnswer = `Option${String.fromCharCode(65 + answerIndex)}`; // Convert index to option letter (A, B, C, ...)
          studentMCQAnswers.push({
            questionId: question.questionId,
            studentAnswer: studentAnswer
          });
        } else { // It's a True/False question
          studentTFQAnswers.push({
            questionId: question.questionId,
            isTrue: userAnswers[index] === "True"
          });
        }
      });
  
      const requestBody = {
        examId: examId,
        studentUserName: userName,
        studentMCQAnswers: studentMCQAnswers,
        studentTFQAnswers: studentTFQAnswers
      };
      console.log(requestBody)
  
      const response = await axios.post(`${API}Exam/SubmitExamToStudent`, requestBody);
      console.log("Submitted data:", response.data);
      setShowResult(true); // Show result after submitting
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };
  

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="mt-5 flex items-center justify-center bg-gray-100 dark:bg-[#121212]">
      <div className="w-full max-w-xl md:w-3/4">
        {showResult ? (
          <div className="flex items-center justify-center flex-col">
            <h3 className="text-xl font-semibold mb-2 text-center">Result</h3>
            <p className="text-center text-2xl font-bold text-green-500">
              Your score:{" "}
              {
                userAnswers.filter(
                  (answer, index) => answer === quizData[index].correctAnswer
                ).reduce((total, correctAnswer, index) => total + (correctAnswer ? quizData[index].degree : 0), 0)
              }{" "}
              out of {quizData.length * 5} (Total Marks: {quizData.reduce((total, question) => total + question.degree, 0)})
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">
                Time Remaining: {formatTime(timer)}
              </p>
            </div>
            {quizData.map((question, index) => (
              <div key={index} className="mb-8 p-4 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md">
                <div className="mb-4">
                  <p className="text-lg break-words">
                    {index + 1}. {question.question}
                  </p>
                </div>
                <ul className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      htmlFor={`option_${index}_${optionIndex}`}
                      className="cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 block"
                    >
                      <li className="flex items-center">
                        <input
                          type="radio"
                          id={`option_${index}_${optionIndex}`}
                          name={`option_${index}`} // Add a name attribute to group radio buttons for each question
                          value={option}
                          checked={userAnswers[index] === option}
                          onChange={() => handleAnswer(index, option)}
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </li>
                    </label>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex justify-center mt-6 mb-6">
              <Button
                ripple={true}
                onClick={handleSubmit}
                className="bg-[#66bfbf] hover:bg-[#4e9999] text-white px-6 py-2 rounded-md text-md capitalize  transition-all duration-200"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;

