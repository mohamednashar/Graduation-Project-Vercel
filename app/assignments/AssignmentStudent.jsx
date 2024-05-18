"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AssignmentStudent = () => {
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          `${API}Section/GetAllSectionsOfStudnet`,
          {
            params: {
              StudnetUserName: userName,
            },
          }
        );
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    if (userName) {
      fetchSections();
    }
  }, [userName]);

  const options = sections.map((section) => ({
    value: {
      sectionId: section.sectionId,
    },
    label: (
      <div className="flex justify-between items-center">
        <div className="text-center items-center">{section.sectionName}</div>
        <div className="text-sm text-gray-900 items-center font-semibold">
          {section.instructorFirstName} {section.instructorSecondName}
        </div>
      </div>
    ),
  }));

  const handleSelectChange = async (selectedOption) => {
    setSelectedSection(selectedOption);
    try {
      const response = await axios.get(
        `${API}Assignement/GetAllAssignemntsOfSection`,
        {
          params: {
            SectionId: selectedOption.value.sectionId,
            UserName: userName,
            typesOfUsers: "Student",
          },
        }
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  return (
    <div className="rounded-lg px-6 mb-6 w-full">
      <div className="flex justify-center flex-col text-center max-w-lg mx-auto">
        <label
          htmlFor="selectSection"
          className="block text-xl font-bold mb-2 text-[#66bfbf]"
        >
          Select Section:
        </label>
        <Select
          id="selectSection"
          value={selectedSection}
          onChange={handleSelectChange}
          options={options}
          placeholder="Select a section"
          isSearchable
          className="mb-4"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#66bfbf" : "transparent",
              color: "black",
              cursor: "pointer",
            }),
          }}
        />
      </div>

      {selectedSection && assignments.length > 0 && (
        <div className="mt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.assignmentId}
                className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-4 flex flex-col border-2 "
              >
                <h3 className="text-lg font-semibold mb-2 text-[#66bfbf]">
                  {assignment.name}
                </h3>
                <p className="text-gray-700 mb-2 line-clamp-1">{assignment.description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold text-black">Full Mark:</span>{" "}
                  {assignment.fullMark}
                </p>
                <div className="mb-2">
                  <span className="font-semibold text-black">End Date:</span>{" "}
                  {new Date(assignment.endedAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold text-black">
                    Deadline Time:
                  </span>{" "}
                  {new Date(assignment.endedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <Link
                  className="bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-md font-semibold hover:bg-[#529d9d] transition-all duration-200 w-full text-center disabled:bg-[#66bfbf8f]"
                  href={{
                    pathname: `/assignments/${assignment.name}`,
                    query: {
                      sectionId:assignment.sectionId,
                      assignmentId: assignment.assignmentId,
                    },
                  }}
                >
                  Assignment Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentStudent;
