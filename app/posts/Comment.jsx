"use client";

import React, { useState } from "react";
import { faHeart, faPen, faPenFancy, faReply, faTractor, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";

function Comment({comments , setComments ,  comment, commentIndex, handleLike, handleReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(comment.text);
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of the comment to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  const handleOpenModal = ()=>{
    setIsModalOpen(!isModalOpen)
  }
  const handleDeleteComment = () => {
    const updatedComments = [...comments];
    updatedComments.splice(commentIndex, 1); // Remove the comment
    setComments(updatedComments);
    setIsModalOpen(false); // Close the modal after deleting the comment
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].text = editedCommentText;
    setComments(updatedComments);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCommentText(comment.text); // Reset edited text
  };

  return (
    <div className="mb-4">
    <div className="flex items-center justify-between">
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
      
        <div>
            <button onClick={handleEdit}><FontAwesomeIcon icon={faPen} className="text-blue-500 mx-3" size="xl" /></button>
            <button onClick={handleOpenModal}><FontAwesomeIcon icon={faTrash} className="text-red-500 mx-3" size="xl" /></button>
          </div>
    </div>

      {isEditing && (
        <div>
          <input
            type="text"
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
            className="bg-gray-200 dark:bg-[#121212] h-10 w-[55%] md:w-[80%] mx-1"
          />
          <button onClick={handleSaveEdit} className="text-green-500 mx-1 font-semibold rounded-md p-1 border-2">Save</button>
          <button onClick={handleCancelEdit} className="text-red-500 mx-1 font-semibold rounded-md border-2 p-1">Cancel</button>
        </div>
      ) 
      
      }

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

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Close the modal on cancel
        onConfirm={handleDeleteComment} // Delete the comment on confirm
      />
    </div>
  );
}

export default Comment;
