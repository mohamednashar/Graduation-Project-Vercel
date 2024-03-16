"use client"

import { useRef } from "react";

function Student({ params }) {
  const fileInputRef = useRef(null);

  const handleFileSubmit = () => {
    // Trigger click on file input when button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file submission here, for example, upload it to a server
    console.log('Submitted file:', file);
  };

  return (
    <div className="w-full mx-auto my-10 md:w-[90%]">
      <div className="flex items-center gap-4 mb-5">
        <img
          className="h-10 w-10 hover:h-12 hover:w-12 transition-all duration-500 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <h1 className="font-semibold text-xl">Prof: Usama</h1>
      </div>
      <div className="flex flex-col gap-3">
        <h1>
          Course: <span className="font-semibold">Science</span>
        </h1>
        <h1>
          Subject: <span className="font-semibold">Chapter 2</span>
        </h1>
        <h1>
          Assignment Deadline:{" "}
          <span className="font-semibold">30/7/2024</span>
        </h1>
        <h1 className="font-semibold my-2">Assignment Details:</h1>
      </div>
      <main className="mx-2 mb-5 text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
        voluptatibus ipsam vitae odit expedita est! Ducimus illum maxime veniam
        veritatis exercitationem totam delectus asperiores. Aliquam non ab
        obcaecati animi odit? Fugit culpa repudiandae voluptatem asperiores,
        quam necessitatibus vel, odio numquam aperiam ex velit incidunt facere
        recusandae! Nam nemo fugit placeat reprehenderit quo, excepturi ad quas
        consequuntur rerum, ipsum est. Nisi.
      </main>
      {/* PDF viewer */}
      <div className="mb-10">
        <iframe
          title="PDF Viewer"
          src="https://drive.google.com/file/d/1uCNavikjGzmA9kZUUTJcQ_dTkbcVFkia/preview"
          width="100%"
          height="400px"
          frameBorder="0"
        ></iframe>
      </div>

      <div className="max-w-md h-40 rounded-lg mx-auto border-2 border-dashed flex items-center justify-center">
            <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className="mt-3 text-gray-700 max-w-xs mx-auto">Click to <span className="font-medium text-indigo-600">Upload your  file</span> or drag and drop your file here</p>
            </label>
            <input id="file" ref={fileInputRef}
          onChange={handleFileChange} type="file" className="hidden" />
        </div>

    
    </div>
  );
}

export default Student;
