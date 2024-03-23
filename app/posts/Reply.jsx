"use client"
import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Reply({ reply, handleLike, commentIndex, replyIndex }) {
  return (
    <div key={replyIndex} className="ml-16 mt-2">
      <div className="flex items-center gap-2">
        <img
          src={reply.photo}
          className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"
          alt="Profile"
        />
        <div>
          <span className="font-bold">{reply.user}</span>
          <p>{reply.text}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mx-12">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleLike(commentIndex, replyIndex)}
        >
          <span className="text-sm font-semibold">{reply.likes}</span>
          <FontAwesomeIcon
            icon={faHeart}
            size="xl"
            className={`text-${reply.liked ? "red" : "gray"}-600 w-[30px]`}
          />
        </div>
      </div>
    </div>
  );
}

export default Reply;