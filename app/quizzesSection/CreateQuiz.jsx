"use client"
import React, { useState } from 'react';
import 'animate.css/animate.min.css';

const CreateQuiz = () => {
  const [courseName, setCourseName] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [points, setPoints] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], correctAnswer: 0 }]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(value, 10);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setNumQuestions(numQuestions + 1);
    setQuestions([...questions, { question: '', options: ['', '', ''], correctAnswer: 0 }]);
  };

  const handleDeleteQuestion = (index) => {
    if (numQuestions > 1) {
      setNumQuestions(numQuestions - 1);
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = () => {
    // Implement the logic to submit the quiz data to your backend or handle it accordingly
    console.log({
      courseName,
      chapterName,
      points,
      date,
      time,
      duration,
      questions,
    });

    // Display success message
    setQuizSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow-md mb-5">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>

      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="w-full border rounded py-2 px-3 mb-4"
      />

      <div className="mt-4">
        {[...Array(numQuestions)].map((_, index) => (
          <div
            key={index}
            id={`question-${index}`}
            className={`mb-4 animate__animated animate__fadeInUp`}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-semibold">Question {index + 1}</h4>
              {numQuestions > 1 && (
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Enter your question"
              value={questions[index].question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full border rounded py-2 px-3 mb-2"
            />
            <ul>
              {[...Array(4)].map((_, optionIndex) => (
                <li key={optionIndex} className="mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={questions[index].options[optionIndex]}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    className="w-full border rounded py-2 px-3"
                  />
                </li>
              ))}
            </ul>
            <label className="block mt-2">
              Correct Answer:
              <select
                value={questions[index].correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                className="border rounded py-2 px-3 mt-1"
              >
                {[...Array(4)].map((_, i) => (
                  <option key={i} value={i}>
                    {String.fromCharCode(65 + i)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700"
      >
        Submit Quiz
      </button>

      {quizSubmitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border rounded">
          Quiz submitted successfully!
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
