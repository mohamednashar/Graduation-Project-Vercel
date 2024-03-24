"use client"
import { faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Append new files to the existing files array
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

  return (
    <div className="rounded-lg overflow-hidden w-full my-3 mx-auto md:w-[60%]">
      <div className="p-4 flex items-center">
        <img
          src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          className="object-cover bg-yellow-500 rounded-full w-10 h-10"
          alt="Profile"
        />
        <h2 className="text-xl font-semibold mx-2">Add New Post</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full resize-none p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="5"
            placeholder="What's on your mind?"
            value={text}
            onChange={handleTextChange}
          />
          {/* Render selected files inside the text area */}
          <div className="mt-2 flex flex-wrap">
            {files.map((file, index) => (
              <div key={index} className="flex items-center mr-2 mb-2">
                {file.type === "application/pdf" ? (
                  <FontAwesomeIcon icon={faFilePdf} className="w-16 h-16 object-cover rounded-md mr-2 mb-2" />
                ) : file.type === "text/plain" ? (
                  <FontAwesomeIcon icon={faFileLines} className="w-16 h-16 object-cover rounded-md mr-2 mb-2" />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected File ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md mr-2 mb-2"
                  />
                )}
              </div>
            ))}
          </div>
          {/* Custom file input button */}
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-[#66bfbf] text-white font-semibold py-2 px-4 rounded-md inline-block mt-4"
          >
            Choose File
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-[#66bfbf] text-white font-semibold py-2 px-4 rounded-md inline-block mt-4 ml-2"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPost;