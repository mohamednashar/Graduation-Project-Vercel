import Link from 'next/link';
import React from 'react';

const QuizCard = ({ subject, chapter, professor, points, date, time,code }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto transition-transform duration-300 transform hover:scale-105">
      <div className="text-2xl font-bold mb-2 text-[#66bfbf]">{subject}</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600">
          <span className="font-bold">Chapter:</span> {chapter}
        </div>
        <div className="text-gray-600">
          <span className="font-bold">Prof:</span> {professor}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-700">
          <span className="font-bold">Points:</span> {points}
        </div>
        <div className="text-gray-700">
          <span className="font-bold">Date:</span> {date}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-700">
          <span className="font-bold">Time:</span> {time}
        </div>
     
      </div>

      <Link href={`/quizzes/${code}`}>
      <button  className="bg-[#66bfbf] text-white px-4 py-2 rounded-md hover:bg-[#529d9d] transition-all duration-200 w-full">
        Start Quiz
      </button>

      </Link>
   
    
    </div>
  );
};

export default QuizCard;
