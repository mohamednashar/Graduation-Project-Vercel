"use client"
import { faFileLines, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

const AddNewPost = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    // Handle file upload
    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter(file => {
      return (
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.type.startsWith("image/")
      );
    });
    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]); // Append new files to the existing files array
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission here, including text and file data
    const formData = new FormData();
    formData.append("text", text);
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    // Example: send formData to server
    console.log("Form data:", formData);
  };

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <div className="p-4 flex flex-col md:flex-row justify-center gap-3 bg-white w-full md:w-[750px] mx-auto mt-5 rounded-md shadow-sm dark:bg-[#1e1e1e]">
      <div>
        <img
          src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          className="object-cover bg-yellow-500 rounded-full w-10 h-10"
          alt="Profile"
        />
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full resize-none p-3 border dark:border-gray-700 rounded-md text-sm focus:outline-none border-b-2 dark:bg-[#1e1e1e]"
            rows="5"
            placeholder="What's on your mind?"
            value={text}
            onChange={handleTextChange}
          />
          {/* Render selected files inside the text area */}
          <div className="mt-2 flex flex-wrap border-b dark:border-gray-700  pt-3 border-gray-300">
            {files.map((file, index) => (
              <div key={index} className="relative">
                {/* Render file preview */}
                {file.type === "application/pdf" ? (
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    className="w-10 h-10 object-cover rounded-md mr-2 mb-2 text-[#66bfbf]"
                  />
                ) : file.type === "text/plain" ? (
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="w-10 h-10 object-cover rounded-md mr-2 mb-2 text-[#66bfbf]"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected File ${index + 1}`}
                    className="w-10 h-10 object-cover rounded-md mr-2 mb-2"
                  />
                )}

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="absolute bottom-10 right-0 w-3 h-3 p-2.5 flex items-center justify-center  bg-gray-300  rounded-full text-red-500 hover:bg-red-100 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
          {/* Custom file input button */}
          <label htmlFor="fileInput">
            <Button
              onClick={() => document.getElementById("fileInput").click()}
              className="cursor-pointer bg-[#66bfbf] hover:bg-[#57a3a3] transition-all duration-200 text-white font-semibold py-2 px-4 rounded-md inline-block mt-4 capitalize text-sm"
            >
              Choose File
            </Button>
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            multiple
            accept=".pdf,.txt,image/*"
            onChange={handleFileChange}
          />
          <Button
            type="submit"
            className="bg-[#66bfbf] text-white font-semibold py-2 px-4 rounded-md inline-block mt-4 ml-2 hover:bg-[#57a3a3] transition-all duration-200 capitalize text-sm"
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPost;
