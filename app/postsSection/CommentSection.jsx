"use client";
import React, { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import Reply from "./Reply";

function CommentSection({ comments, setComments, userPhoto, username }) {
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  const handleInputChange = (e) => setNewComment(e.target.value);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          text: newComment,
          user: username,
          photo: userPhoto,
          replies: [],
          likes: 0,
          liked: false,
        },
      ]);
      setNewComment("");
    }
  };

  const handleReply = (index) => {
    setReplyIndex(index);
  };

  const handleAddReply = () => {
    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push({
        text: replyText,
        user: username,
        photo: userPhoto,
        likes: 0,
        liked: false,
      });
      setComments(updatedComments);
      setReplyText("");
      setReplyIndex(null);
    }
  };

  const handleLike = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      const targetReply = updatedComments[commentIndex].replies[replyIndex];
      targetReply.liked ? targetReply.likes-- : targetReply.likes++;
      targetReply.liked = !targetReply.liked;
    } else {
      const targetComment = updatedComments[commentIndex];
      targetComment.liked ? targetComment.likes-- : targetComment.likes++;
      targetComment.liked = !targetComment.liked;
    }
    setComments(updatedComments);
  };

  return (
    <div>
      <form onSubmit={handleAddComment} className="flex gap-3 mb-5">
        <div className="flex items-center justify-between mt-4 w-full gap-2">
          <img
            src={userPhoto}
            className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"
            alt="Profile"
          />
          <div className="flex items-center w-full justify-between h-11 border rounded-2xl overflow-hidden px-4">
            <input
              value={newComment}
              onChange={handleInputChange}
              type="text"
              className="h-full w-full outline-none text-black dark:text-white dark:bg-[#1e1e1e] bg-white"
              placeholder="Write your comment..."
              name="comment"
            />
            <button>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-[#66bfbf]"
                size="xl"
              />
            </button>
          </div>
        </div>
      </form>
      <div>
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex} className="mb-4">
            <Comment
              comment={comment}
              commentIndex={commentIndex}
              handleLike={handleLike}
              handleReply={() => handleReply(commentIndex)}
              userPhoto={userPhoto}
              username={username}
              comments={comments}
              setComments={setComments}
            />
            {comment.replies.map((reply, replyIndex) => (
              <Reply
                key={replyIndex}
                reply={reply}
                commentIndex={commentIndex}
                replyIndex={replyIndex}
                handleLike={handleLike}
                comments={comments}
                setComments={setComments}
              />
            ))}
            {replyIndex === commentIndex && (
              <div className="ml-16 mt-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="bg-gray-200 dark:bg-[#121212] outline-none h-10 w-[80%] p-2 rounded-lg"
                />
                <button onClick={handleAddReply}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-[#66bfbf] mx-5"
                    size="xl"
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;