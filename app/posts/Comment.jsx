"use client";
import React, { useState } from "react";
import { faPaperPlane, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal"; // Import the Modal component

function CommentSection({comments ,setComments,  userPhoto, username }) {
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of the comment to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, user: username, photo: userPhoto }]);
      setNewComment("");
    }
  };

  const handleEditComment = (index, editedComment) => {
    const updatedComments = [...comments];
    updatedComments[index].text = editedComment;
    setComments(updatedComments);
    setEditingIndex(null);
    setEditingComment("");
  };

  const handleDeleteComment = () => {
    const updatedComments = comments.filter((_, i) => i !== deleteIndex);
    setComments(updatedComments);
    setIsModalOpen(false); // Close the modal after deleting the comment
    setDeleteIndex(null);
  };

  return (
    <div>
      <form action="submit" className="flex gap-3">
        <div className="flex items-center justify-between mt-4 w-full gap-2">
          <img
            src={userPhoto}
            className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"
            alt="Profile"
          />
          <div className="flex items-center w-full justify-between  h-11 border rounded-2xl overflow-hidden px-4 ">
            <input
              value={newComment}
              onChange={handleInputChange}
              type="text"
              className="h-full w-full bg-gray-50 outline-none text-black dark:text-white dark:bg-[#282828] "
              placeholder="Write your comment..."
              name="comment"
            />
          <button onClick={handleAddComment}>
            {" "}
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-blue-500 "
              size="xl"
            />
          </button>
          </div>
        </div>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="flex items-center justify-between gap-3 my-5">
            {editingIndex === index ? (
              <div className="flex w-full items-center justify-between gap-3">
                <input
                  type="text"
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                  className="w-full bg-yellow-100 dark:bg-yellow-500 outline-none text-black"
                />
                <button
                  onClick={() => handleEditComment(index, editingComment)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
              </div>
            ) : (
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
            )}
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setEditingIndex(index);
                  setEditingComment(comment.text);
                }}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-blue-500 mx-1"
                  size="xl"
                />
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true); // Open the modal
                  setDeleteIndex(index); // Set the index of the comment to delete
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 mx-1"
                  size="xl"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Close the modal on cancel
        onConfirm={handleDeleteComment} // Delete the comment on confirm
      />
    </div>
  );
}

export default CommentSection;