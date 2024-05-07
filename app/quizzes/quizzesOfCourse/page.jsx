"use client"
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const QuizzesOfCourse = () => {
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const searchParams = useSearchParams();
  const courseCycleId = searchParams.get('courseCycleId');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${API}Exam/GetExamsOfCourseCycleToProfessor`, {
          headers: {
            ProfessorUserName: userName,
            CourseCycleId: courseCycleId
          }
        });
        setExams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
        setLoading(false);
      }
    };

    fetchExams();
  }, [userName, courseCycleId]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} at ${time}`;
  };

  return (
    <div className="mx-16 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {exams.map((exam) => (
          <div key={exam.examId} className="bg-white p-4 shadow-md rounded-md w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">{exam.examName}</h2>
                <p className="text-gray-500">{exam.examTitle}</p>
                <p className="text-gray-500">Starts On: {formatDate(exam.startedAt)}</p>
                <p className="text-gray-500">Duration: {exam.deadLine}</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  <FontAwesomeIcon icon={faEdit} />
                  <Link href={{ pathname: '/quizzes/edit', query: { courseCycleId } }}>Edit</Link>
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span className="ml-2">Delete</span>
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded-md">
                  <FontAwesomeIcon icon={faEye} />
                  <span className="ml-2">Show</span>
                </button>
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
        <Link className="bg-blue-500 text-white px-4 py-2 rounded-md" href={{ pathname: 'quizzesOfCourse/createExam', query: { courseCycleId } }}>
Create Exam        
</Link>
      </div>
    </div>
  );
};

export default QuizzesOfCourse;
