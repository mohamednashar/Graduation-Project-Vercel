"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen,   faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

function Reply({comments , setComments , reply, handleLike, commentIndex, replyIndex }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReplyText, setEditedReplyText] = useState(reply.text);
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of the comment to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  const handleOpenModal = ()=>{
    setIsModalOpen(!isModalOpen)
  }
  const handleDeleteReply = () => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1); // Remove the reply
    setComments(updatedComments);
    setIsModalOpen(false); // Close the modal after deleting the reply
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].text = editedReplyText;
    setComments(updatedComments);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedReplyText(reply.text); // Reset edited text
  };

  return (
    <div key={replyIndex} className="ml-16 mt-2">
    <div className="flex items-center justify-between">
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
        <div>
              <button onClick={handleEdit}><FontAwesomeIcon icon={faPen} className="text-blue-500 mx-3" size="xl" /></button>
              <button onClick={handleOpenModal}><FontAwesomeIcon icon={faTrash} className="text-red-500 mx-3" size="xl" /></button>
            </div>
      </div>

      {isEditing && (
        <div>
          <input
            type="text"
            value={editedReplyText}
            onChange={(e) => setEditedReplyText(e.target.value)}
            className="bg-gray-200 dark:bg-[#121212] h-10 w-[50%] md:w-[75%] mx-1"
          />
          <button onClick={handleSaveEdit} className="text-green-500 mx-1 font-semibold rounded-md p-1 border-2">Save</button>
          <button onClick={handleCancelEdit} className="text-red-500 mx-1 font-semibold rounded-md border-2 p-1">Cancel</button>
        </div>
      ) 
      
      }

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

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Close the modal on cancel
        onConfirm={handleDeleteReply} // Delete the comment on confirm
      />
    </div>
  );
}

export default Reply;