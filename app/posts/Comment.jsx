"use client"

import React from "react";
import { faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Comment({ comment, commentIndex, handleLike, handleReply }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <img
          src={comment.photo}
          className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"
          alt="Profile"
        />
        <div>
          <span className="font-bold">{comment.user}</span>
          <p>{comment.text}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mx-12">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleLike(commentIndex)}
        >
          <span className="text-sm font-semibold">{comment.likes}</span>
          <FontAwesomeIcon
            icon={faHeart}
            size="xl"
            className={`text-${comment.liked ? "red" : "gray"}-600 w-[30px]`}
          />
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleReply(commentIndex)}
        >
          <FontAwesomeIcon
            icon={faReply}
            size="xl"
            className={`text-blue-500`}
          />
        </div>
      </div>
    </div>
  );
}

export default Comment;
