"use client";
import "animate.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Student() {
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");

  const [assignmentFiles, setAssignmentFiles] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const { data: session } = useSession();
  const userName = session?.user.userName;

  useEffect(() => {
    const fetchAssignmentFiles = async () => {
      try {
        const response = await axios.get(
          `${API}Assignement/GetAllFilesForAssignemnt`,
          {
            params: {
              AssignmentId: assignmentId,
              UserName: userName,
              typesOfUsers: "Student",
            },
          }
        );
        console.log("Response:", response.data);
        setAssignmentFiles(response.data.resourcesOfAssigenments);
        const { name, description, fullMark, endedAt } = response.data;
        setAssignmentDetails({
          name,
          description,
          fullMark,
          endedAt,
        });
      } catch (error) {
        console.error("Error fetching assignment files:", error);
      }
    };

    if (assignmentId && userName) {
      fetchAssignmentFiles();
    }
  }, [assignmentId, userName]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Submitted file:", file);
  };

  return (
    <div className="my-5 p-5 flex flex-col md:flex-row justify-center gap-8">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg dark:bg-[#1e1e1e] animate__animated animate__backInLeft animate__fast">
        <div className="flex items-center gap-4  p-4 border-b-2">
          <img
            className="h-12 w-12 rounded-full hover:shadow-lg transition-all duration-300"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
          <h1 className="font-semibold text-xl">{assignmentDetails.name}</h1>
        </div>
        
        <div className="p-4 flex flex-col gap-3">
       
          <h1 className="text-md font-semibold">
            Assignment Name:{" "}
            <span className="font-normal">
              {assignmentDetails.name}
            </span>
          </h1>
      
          <h1 className="text-md font-semibold">
            Full Marks:{" "}
            <span className="font-normal ">
              {assignmentDetails.fullMark}
            </span>
          </h1>
          <h1 className="text-md font-semibold">
            Assignment Details:{" "}
            <span className="font-normal ">
              {assignmentDetails.description}
            </span>
          </h1>
        </div>

        <div className="flex gap-8 mb-10">
        
        {assignmentFiles.map((file, index) => (
            <div key={index} className=" ">
              {file.fileType === "PNG" && (
                <Image
                  width={500}
                  height={500}
                  src={file.url}
                  alt={file.name}
                  className="h-20 w-24 object-cover rounded-l-md border-r-2 dark:border-gray-700"
                />
              )}
              {file.fileType === "PDF" && (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center rounded-lg shadow-md transition-all duration-300">
                    <Image
                      width={500}
                      height={500}
                      src={file.thumbnailLink}
                      alt="PDF Thumbnail"
                      className="h-20 w-24 object-cover rounded-l-md border-r-2 dark:border-gray-700"
                    />
                    <p className="px-4 text-md font-semibold">{file.name}</p>
                  </button>
                </a>
              )}
            </div>
          ))}
          </div>
      </div>
      

      <div className="w-full md:w-1/2 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg flex justify-center items-center animate__animated animate__backInRight animate__fast">
        <div className="flex flex-col justify-center items-center gap-5 p-4">
          <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
            <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
              <p className="mt-3 text-gray-700 dark:text-gray-100 max-w-xs mx-auto">
                Click to{" "}
                <span className="font-medium text-[#66bfbf]">
                  Upload your file
                </span>{" "}
                or drag and drop your file here
              </p>
            </label>
            <input
              id="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
