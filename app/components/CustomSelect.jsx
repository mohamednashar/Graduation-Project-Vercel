import React, { useState } from "react";

const CustomSelect = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative  text-left w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedOption}
            <svg
              className="-mr-1 ml-2 h-5 w-5 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.707 12.293a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 1.414 1.414L10 10.414l.707.707z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:bg-[#3f3f3f] dark:text-white"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
