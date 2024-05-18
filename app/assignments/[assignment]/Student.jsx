import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "animate.css"
 
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Student() {
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const sectionId = searchParams.get("sectionId");

  const [assignmentFiles, setAssignmentFiles] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [formData, setFormData] = useState(null); // FormData to hold the file data
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

  const mapMimeTypeToSimplifiedType = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return "PDF";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "DOCX";
      case "image/jpeg":
        return "JPG";
      case "image/png":
        return "PNG";
      // Add more cases as needed
      default:
        return "UNKNOWN"; // Or handle other MIME types accordingly
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Submitted file:", file);

    const newFormData = new FormData();
    newFormData.append("SectionId", sectionId);
    newFormData.append("AssignementId", assignmentId);
    newFormData.append("FormFile", file); // Append the file directly
    newFormData.append("Name", file.name); // Append the file name
    newFormData.append("FileType", mapMimeTypeToSimplifiedType(file.type)); // Convert file type

    setFormData(newFormData); // Update FormData state
  };

  const handleFormSubmit = async () => {
    if (formData) {
      console.log(formData);
      try {
        const response = await axios.post(
          `${API}FileProcessingOfAssignement/UploadFileToAssignement`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File upload response:", response.data);
        // You can handle the response here, such as updating state or showing a success message
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle errors, e.g., show an error message to the user
      }
    } else {
      console.error("No file selected");
      // Handle case where no file is selected
    }
  };

  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  return (
    <div className="my-5 p-5 flex flex-col md:flex-row justify-center gap-8">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg dark:bg-[#1e1e1e] animate__animated animate__backInLeft animate__fast">
        <div className="flex items-center gap-4 p-4 border-b-2">
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
            <span className="font-normal">{assignmentDetails.name}</span>
          </h1>

          <h1 className="text-md font-semibold">
            Full Marks:{" "}
            <span className="font-normal ">{assignmentDetails.fullMark}</span>
          </h1>
          <h1 className="text-md font-semibold">
            Assignment Details:{" "}
            <span className="font-normal ">{assignmentDetails.description}</span>
          </h1>
        </div>

        <div className="flex gap-8 mb-10 mx-3">
          {assignmentFiles.map((file, index) => (
            <div key={index}>
              {file.fileType === "PNG" && (
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-20 w-20 border-2 rounded-lg shadow-md object-cover dark:border-gray-700 cursor-pointer"
                  onClick={() => openModal(file.url)}
                />
              )}
              {file.fileType === "PDF" && (
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center rounded-lg shadow-md transition-all duration-300">
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    className="h-14 p-2 dark:border-gray-700 text-red-500 border-r-2"
                  />
                  <p className="px-4 text-md font-semibold">{file.name}</p>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg flex justify-center items-center animate__animated animate__backInRight animate__fast">
        <div>
          <div className="flex flex-col justify-center items-center p-4">
            <div className="max-w-md rounded-lg  flex items-center justify-center">
              <label htmlFor="file" className="cursor-pointer text-center p-4">

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
            {formData && (
              <button
                onClick={handleFormSubmit}
                className="bg-[#66bfbf] hover:bg-[#60b5b5] transition-all duration-200 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            )}
          </div>
          {formData && (
            <div className="flex items-center justify-center gap-4 p-4 border-t-2">
              {formData.get("FormFile").type.startsWith("image/") ? (
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-4xl text-blue-500"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="text-4xl text-red-500"
                />
              )}
              <p className="font-semibold text-lg">
                {formData.get("FormFile").name}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog Component for Image */}
      <Dialog open={isModalOpen} onClose={closeModal}>
  <div className="flex items-center justify-center fixed inset-0 z-50">
    <DialogHeader className="hidden">Image Preview</DialogHeader>
    <DialogBody>
      <div className="bg-white p-4 rounded-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={modalImageSrc} alt="Preview" className="max-w-full max-h-screen" />
      </div>
    </DialogBody>
  </div>
</Dialog>

    </div>
  );
}

export default Student;
