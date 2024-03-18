"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";




function Student({ params }) {
  const fileInputRef = useRef(null);

  const handleFileSubmit = () => {
    // Trigger click on file input when button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file submission here, for example, upload it to a server
    console.log("Submitted file:", file);
  };

  var fullLink =
    "https://drive.google.com/file/d/1r6mVeVs4uk0u6_Z2Ls8sF2Bk-2rCAstr/view";

  // Generate the thumbnail link
  var thumbnailLink = fullLink.replace(
    "https://drive.google.com/file/d/",
    "https://drive.google.com/thumbnail?id="
  );
  thumbnailLink = thumbnailLink.replace("/view", "");

  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="mx-auto my-5 p-5 flex flex-col md:flex-row justify-center gap-8">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-4  p-4 border-b-2">
          <img
            className="h-12 w-12 rounded-full hover:shadow-lg transition-all duration-300"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
          <h1 className="font-semibold text-xl">Mohamed Alaa</h1>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <h1 className="text-md font-semibold">
            Course: <span className="font-normal">Science</span>
          </h1>
          <h1 className="text-md font-semibold">
            Subject: <span className="font-normal ">Chapter 2</span>
          </h1>
          <h1 className="text-md font-semibold">
            Assignment Deadline:{" "}
            <span className="font-normal  ">30/7/2024</span>
          </h1>
          <h1 className="text-md font-semibold">Assignment Details:</h1>
          
          <p className={`text-gray-800 ${isTruncated ? 'truncate' : ''}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            voluptatibus ipsam vitae odit expedita est! Ducimus illum maxime
            veniam veritatis exercitationem totam delectus asperiores. Aliquam
            non ab obcaecati animi odit? Fugit culpa repudiandae voluptatem
            asperiores, quam necessitatibus vel, odio numquam aperiam ex velit
            incidunt facere recusandae! Nam nemo fugit placeat reprehenderit
            quo, excepturi ad quas consequuntur rerum, ipsum est. Nisi.
          </p>
          {!isTruncated&&  <Link
            href={fullLink}
            className="hover:text-[#66bfbf] transition-all duration-300 hover:scale-95 bordr-2 border-black"
          >
            <button className="border-2 border-gray-200 flex items-center justify-center rounded-lg shadow-md transition-all duration-300">
              <Image
                width={500}
                height={500}
                src={thumbnailLink}
                alt="PDF Thumbnail"
                className="h-20 w-24 object-cover rounded-l-md border-r-2"
              />
              <p className="px-4 text-md font-semibold">Control Task 11</p>
            </button>
          </Link>}
        
          <button onClick={toggleTruncate} className="text-[#66bfbf] hover:underline">
        {isTruncated ? 'Read more' : 'Show less'}
      </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5 p-4">
        

          <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
            <label
              htmlFor="file"
              className="cursor-pointer text-center p-4 md:p-8"
            >
              <svg
                className="w-10 h-10 mx-auto"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                  stroke="#66bfbf"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                Click to{" "}
                <span className="font-medium text-[##66bfbf]">
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
