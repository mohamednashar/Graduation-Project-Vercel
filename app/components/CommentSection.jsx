import React, { useState } from "react";
import { Avatar, Input } from "@material-tailwind/react";
import {
  faPenToSquare,
  faTrash,
  faTrashCan,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { name: "John Doe", avatar: "https://via.placeholder.com/150" },
      content: "This is the first comment.",
      replies: [],
      liked: false,
      likeCount: 5,
    },
    {
      id: 2,
      author: {
        name: "Alice Smith",
        avatar: "https://via.placeholder.com/150",
      },
      content: "Nice post!",
      replies: [],
      liked: false,
      likeCount: 10,
    },
    // Add more comments as needed
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [editComment, setEditComment] = useState({
    commentId: null,
    replyIndex: null,
  });
  const [editedContent, setEditedContent] = useState("");
  const { theme, setTheme } = useTheme();

  const toggleLikeComment = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const liked = !comment.liked;
        const likeCount = liked ? comment.likeCount + 1 : comment.likeCount - 1;
        return { ...comment, liked, likeCount };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const toggleLikeReply = (commentId, replyIndex) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply, index) => {
          if (index === replyIndex) {
            const liked = !reply.liked;
            const likeCount = liked ? reply.likeCount + 1 : reply.likeCount - 1;
            return { ...reply, liked, likeCount };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        author: { name: "You", avatar: "https://via.placeholder.com/150" },
        content: newComment,
        replies: [],
        liked: false,
        likeCount: 0,
      };
      // Prepend the new comment to the comments array
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleEditComment = (commentId, replyIndex) => {
    setEditComment({ commentId, replyIndex });
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    const replyToEdit = commentToEdit.replies[replyIndex];
    setEditedContent(replyToEdit.content);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === editComment.commentId) {
        const updatedReplies = comment.replies.map((reply, index) => {
          if (index === editComment.replyIndex) {
            return { ...reply, content: editedContent };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditComment({ commentId: null, replyIndex: null });
    setEditedContent("");
  };

  const handleAddReply = (commentId) => {
    if (replyInputs[commentId] && replyInputs[commentId].trim() !== "") {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                content: replyInputs[commentId],
                author: "You",
                liked: false,
                likeCount: 0,
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyInputs({ ...replyInputs, [commentId]: "" });
    }
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyIndex) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter((_, index) => index !== replyIndex),
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="space-y-8 mb-10">
      <div className="flex items-center space-x-4 ">
        <Avatar src="https://via.placeholder.com/150" />
        <Input
          variant="standard"
          color={theme === "dark" ? "white" : ""}
          type="text"
          label="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className=" border-gray-300 py-2 px-3 w-full outline-none focus:border-blue-500 bg-gray-100 "
        />
        <button
          onClick={handleAddComment}
          className="bg-[#66bfbf] text-white py-2 px-4 rounded-lg hover:bg-[#4e9999] transition-all duration-200 hover:scale-95"
        >
          Comment
        </button>
      </div>
      {comments.map((comment, commentIndex) => (
        <div key={comment.id} className="flex space-x-4">
          <Avatar src={comment.author.avatar} />
          <div className="flex-1 rounded-lg p-4 bg-white dark:bg-[#1e1e1e]">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold bg-gray-100 dark:bg-[#353535] dark:text-gray-100 p-2 rounded-xl border-b-2 dark:border-gray-700">
                @{comment.author.name}
              </p>
              <div className="flex items-center">
                <button
                  onClick={() => toggleLikeComment(comment.id)}
                  className="text-gray-500 hover:text-red-600 transition-all duration-300 hover:scale-105"
                >
                  <FontAwesomeIcon
                    className="mr-1"
                    icon={comment.liked ? faHeartSolid : faHeart}
                  />
                  {comment.likeCount}
                </button>

                {comment.author.name === "You" && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-500 hover:text-red-600 transition
                  -all duration-200 hover:scale-105 ml-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
            <p>{comment.content}</p>
            {comment.replies.map((reply, replyIndex) => (
              <div
                key={replyIndex}
                className="bg-gray-200 dark:bg-[#353535] rounded-lg p-2 mt-2 flex items-start justify-between"
              >
                <div className="flex">
                  <div>
                    <Avatar src="https://via.placeholder.com/150" />
                  </div>
                  <div className="flex flex-col ml-2">
                    <p className="font-semibold">{reply.author}</p>
                    {reply.author === "You" &&
                    editComment.commentId === comment.id &&
                    editComment.replyIndex === replyIndex ? (
                      <>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="border rounded-lg py-2 px-3 outline-none focus:border-[#66bfbf] dark:bg-gray-700"
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="text-[#66bfbf] hover:text-[#4e9999] transition-all duration-200 font-semibold"
                        >
                          Submit
                        </button>
                        </div>
                      </>
                    ) : (
                      <p>{reply.content}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {reply.author === "You" && (
                    <>
                      <button
                        onClick={() =>
                          handleEditComment(comment.id, replyIndex)
                        }
                        className="bg-white dark:bg-gray-700 w-3 h-3 rounded-full p-4 flex items-center justify-center text-[#66bfbf] hover:text-[#4e9999] hover:scale-105 transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteReply(comment.id, replyIndex)
                        }
                        className="bg-white dark:bg-gray-700 w-3 h-3 rounded-full p-4 flex items-center justify-center text-[#66bfbf] hover:text-red-600 hover:scale-105 transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                      <button
                        onClick={() => toggleLikeReply(comment.id, replyIndex)}
                        className="text-gray-500 hover:text-red-600 transition-all duration-200 hover:scale-105"
                      >
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={reply.liked ? faHeartSolid : faHeart}
                        />
                        {reply.likeCount}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center space-x-4 mt-2">
              <Input
                color={theme === "dark" ? "teal" : ""}
                type="text"
                variant="standard"
                placeholder="Reply..."
                value={replyInputs[comment.id] || ""}
                onChange={(e) =>
                  setReplyInputs({
                    ...replyInputs,
                    [comment.id]: e.target.value,
                  })
                }
                className="py-2 px-3 w-full outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleAddReply(comment.id)}
                className="bg-[#66bfbf] text-white py-2 px-4 rounded-lg hover:bg-[#4e9999] transition-all duration-200"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
