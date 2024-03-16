import Link from 'next/link';
import React from 'react';

const AssignmentCardProf = ({ subject, college, department ,  group, code }) => {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-6 mb-6 w-full max-w-3xl mx-auto transition-transform duration-300 transform hover:scale-105">
      <div className="text-2xl font-bold mb-2 text-[#66bfbf]">{subject}</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-600 dark:text-gray-100">
          <span className="font-bold">college:</span> {college}
        </div>
        <div className="text-gray-600 dark:text-gray-100">
            <span className="font-bold">department: {department}</span> 
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-gray-700 dark:text-gray-200">
          <span className="font-bold">Group:</span> {group}
        </div>
        <div className="text-gray-700 dark:text-gray-200">
          <span className="font-bold">Course code</span> {code}
        </div>
      </div>
    

      <Link href={`/assignments/${code}-${group}`}>
      <button  className="bg-[#66bfbf] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#529d9d] transition-all duration-200 w-full">
        Assignment details
      </button>

      </Link>
   
    
    </div>
  );
};

export default AssignmentCardProf;
