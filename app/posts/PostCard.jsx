"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./Comment";
import Image from "next/image";

function PostCard() {
  const [color, setColor] = useState("gray-200");
  const [react, setReact] = useState(0);
  const [comments, setComments] = useState([]);

  const toggleColor = () => {
    if (color === "gray-200") {
      setColor("red-600");
      setReact(react + 1);
    } else {
      setColor("gray-200");
      setReact(react - 1);
    }
  };
  return (
    <div className="w-full  flex items-center justify-center dark:bg-[#121212]">
      <div className=" bg-white my-6 rounded-2xl p-4 dark:bg-[#282828]">
        <div className="flex items-center justify-between">
          <div className="gap-3.5 flex items-center">
            <img
              src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              className="object-cover bg-yellow-500 rounded-full w-10 h-10"
              alt="Profile"
            />
            <div className="flex flex-col">
              <span className="mb-2 capitalize">sofia müller</span>
              <span dateTime="2021-06-08" className="text-gray-400 text-xs">
                06 August at 09.15 PM
              </span>
            </div>
          </div>
        </div>
        <div className="whitespace-pre-wrap mt-7">Hello guys ?</div>
        <div className="mt-5 flex flex-col md:flex-row  gap-2 justify-center border-b pb-4 flex-wrap">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              className="bg-red-500 rounded-2xl  object-cover h-96 flex-auto"
              alt="photo"
              width={500}
              height={300}
            />
          </div>
          <div >
            <Image
              src="https://images.unsplash.com/photo-1614914135224-925593607248?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              className="bg-red-500 rounded-2xl  object-cover h-96 flex-auto"
              alt="photo"
              width={500}
              height={300}
            />
          </div>
        </div>
        <div className="h-16 border-b flex items-center justify-around w-full">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleColor}
          >
            <FontAwesomeIcon
              icon={faHeart}
              size="xl"
              className={`text-${color} ${color==="gray-200" ? 'hover:text-red-200' : ''} w-[30px]`}
              />
            <span className="text-sm">{react} love</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FontAwesomeIcon
              icon={faCommentDots}
              size="xl"
              className="text-blue-500 w-[30px]"
            />{" "}
            <div className="text-sm ">{comments.length} Comments</div>
          </div>
        </div>
        <CommentSection
          comments={comments}
          setComments={setComments}
          userPhoto="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          username="Usama Rabie"
        />{" "}
      </div>
    </div>
  );
}

export default PostCard;
