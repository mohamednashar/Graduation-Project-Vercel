"use client";
import React, { useState } from "react";
import {
  faHeart,
  faPaperPlane,
  faPenToSquare,
  faReply,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal"; // Import the Modal component

function CommentSection({ comments, setComments, userPhoto, username }) {
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of the comment to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
  const [likeCounts, setLikeCounts] = useState(Array(comments.length).fill(0)); // State to store like counts for each comment
  const [replyInputs, setReplyInputs] = useState(Array(comments.length).fill(false)); // State to control reply inputs for each comment
  const [replyTexts, setReplyTexts] = useState(Array(comments.length).fill("")); // State to store reply texts for each comment

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { text: newComment, user: username, photo: userPhoto, replies: [], likes: 0, liked: false },
      ]);
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

  const handleLike = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      if (updatedComments[commentIndex].replies[replyIndex].liked) {
        updatedComments[commentIndex].replies[replyIndex].likes--;
        updatedComments[commentIndex].replies[replyIndex].liked = false;
      } else {
        updatedComments[commentIndex].replies[replyIndex].likes++;
        updatedComments[commentIndex].replies[replyIndex].liked = true;
      }
    } else {
      if (updatedComments[commentIndex].liked) {
        updatedComments[commentIndex].likes--;
        updatedComments[commentIndex].liked = false;
      } else {
        updatedComments[commentIndex].likes++;
        updatedComments[commentIndex].liked = true;
      }
    }
    setComments(updatedComments);
  };

  const handleReply = (index) => {
    const updatedReplyInputs = [...replyInputs];
    updatedReplyInputs[index] = true;
    setReplyInputs(updatedReplyInputs);
  };

  const handleAddReply = (commentIndex, replyText) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push({
      text: replyText,
      user: username,
      photo: userPhoto,
      likes: 0,
      liked: false,
    });
    setComments(updatedComments);
    const updatedReplyInputs = [...replyInputs];
    updatedReplyInputs[commentIndex] = false;
    setReplyInputs(updatedReplyInputs);
    const updatedReplyTexts = [...replyTexts];
    updatedReplyTexts[commentIndex] = "";
    setReplyTexts(updatedReplyTexts);
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
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex} className="mb-4">
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
                <span className="text-sm font-semibold">{likeCounts[commentIndex]} </span>
                <FontAwesomeIcon
                  icon={faHeart}
                  size="xl"
                  className={`text-${likeCounts[commentIndex] === 1 ? "red" : "gray"}-600 w-[30px]`}
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
            {replyInputs[commentIndex] && (
              <div className="flex items-center gap-2 ml-16">
                <input
                  type="text"
                  className="border px-2 py-1"
                  placeholder="Write your reply..."
                />
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAddReply(commentIndex, "Sample reply")}
                >
                  Reply
                </button>
              </div>
            )}
            {comment.replies.map((reply, replyIndex) => (
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
                <span className="text-sm font-semibold">{reply.likes} </span>
                <FontAwesomeIcon
                  icon={faHeart}
                  size="xl"
                  className={`text-${reply.liked ? "red" : "gray"}-600 w-[30px]`}
                />
              </div>
            </div>
          </div>
            ))}
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

