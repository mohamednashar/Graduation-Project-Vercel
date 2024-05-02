"use client";
import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

const QuizComponent = () => {
  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which programming language is React written in?",
      options: ["Java", "JavaScript", "C#", "Python"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "In which year did World War I begin?",
      options: ["1914", "1916", "1918", "1920"],
      correctAnswer: "1914",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "George Orwell"],
      correctAnswer: "Harper Lee",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    // Add more questions as needed
  ];

  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(300); // Set the timer duration in seconds (300 seconds = 5 minutes)

  const handleAnswer = (index, answer) => {
    setUserAnswers([
      ...userAnswers.slice(0, index),
      answer,
      ...userAnswers.slice(index + 1),
    ]);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Timer has reached zero, show the results
      setShowResult(true);
    }
  }, [timer, showResult]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
                ).length
              }{" "}
              out of {quizData.length}
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

export default QuizComponent;
