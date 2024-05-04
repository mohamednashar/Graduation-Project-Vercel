// QuizList.js
import React from 'react';
import QuizCard from './QuizCard';

const QuizList = () => {
  const quizzes = [
    {
      subject: 'Math',
      chapter: 'Algebra',
      professor: 'Dr. Smith',
      points: 20,
      date: '2024-03-15',
      time: '10:00 AM',
      code:"CS1"
     
    },
    {
      subject: 'Science',
      chapter: 'Biology',
      professor: 'Dr. Johnson',
      points: 15,
      date: '2024-03-16',
      time: '2:30 PM',
      code:"CS2"

  
    },

   {
      subject: 'Science',
      chapter: 'Biology',
      professor: 'Dr. Johnson',
      points: 15,
      date: '2024-03-16',
      time: '2:30 PM',
      code:"CS3"
  
    },
    {
        subject: 'Science',
        chapter: 'Biology',
        professor: 'Dr. Johnson',
        points: 15,
        date: '2024-03-16',
        time: '2:30 PM',
        code:"CS4"
    
      },
      {
        subject: 'Science',
        chapter: 'Biology',
        professor: 'Dr. Johnson',
        points: 15,
        date: '2024-03-16',
        time: '2:30 PM',
        code:"CS5"
    
      },
      {
        subject: 'Science',
        chapter: 'Biology',
        professor: 'Dr. Johnson',
        points: 15,
        date: '2024-03-16',
        time: '2:30 PM',
        code:"CS6"
    
      },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {quizzes.map((quiz, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
          <QuizCard {...quiz} />
        </div>
      ))}
    </div>
  );
};

export default QuizList;
