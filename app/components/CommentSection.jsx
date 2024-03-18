import React, { useState } from 'react';
import { Avatar, Input } from '@material-tailwind/react';

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
      content: 'This is the first comment.',
      replies: [],
    },
    {
      id: 2,
      author: { name: 'Alice Smith', avatar: 'https://via.placeholder.com/150' },
      content: 'Nice post!',
      replies: [],
    },
    // Add more comments as needed
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyInputs, setReplyInputs] = useState({});
  const [editComment, setEditComment] = useState({ commentId: null, replyIndex: null });
  const [editedContent, setEditedContent] = useState('');

const handleAddComment = () => {
  if (newComment.trim() !== '') {
    const comment = {
      id: comments.length + 1,
      author: { name: 'You', avatar: 'https://via.placeholder.com/150' },
      content: newComment,
      replies: [],
    };
    // Prepend the new comment to the comments array
    setComments([comment, ...comments]);
    setNewComment('');
  }
};

  

  const handleEditComment = (commentId, replyIndex) => {
    setEditComment({ commentId, replyIndex });
    const commentToEdit = comments.find(comment => comment.id === commentId);
    const replyToEdit = commentToEdit.replies[replyIndex];
    setEditedContent(replyToEdit.content);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map(comment => {
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
    setEditedContent('');
  };

  const handleAddReply = (commentId) => {
    if (replyInputs[commentId] && replyInputs[commentId].trim() !== '') {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { content: replyInputs[commentId], author: 'You' }
            ]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyInputs({ ...replyInputs, [commentId]: '' });
    }
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyIndex) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter((_, index) => index !== replyIndex)
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
          type="text"
          label='Write a comment'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className=" border-gray-300 py-2 px-3 w-full outline-none focus:border-blue-500 bg-gray-100"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Comment
        </button>
      </div>
      {comments.map((comment, commentIndex) => (
        <div key={comment.id} className="flex space-x-4">
          <Avatar src={comment.author.avatar} />
          <div className="flex-1 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold bg-gray-100 p-2 rounded-xl border-b-2">@{comment.author.name}</p>
              <div>
                {comment.author.name === 'You' && (
                  <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-500">
                    Delete
                  </button>
                )}
              </div>
            </div>
            <p>{comment.content}</p>
            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className="bg-gray-200 rounded-lg p-2 mt-2 flex items-start justify-between">
                <div>
                  <p className="font-semibold">{reply.author}</p>
                  {reply.author === 'You' && editComment.commentId === comment.id && editComment.replyIndex === replyIndex ? (
                    <>
                      <input
                        type="text"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="border rounded-lg py-2 px-3 outline-none focus:border-blue-500"
                      />
                      <button onClick={handleSaveEdit} className="text-blue-500 hover:text-blue-700 ml-2">
                        Save
                      </button>
                    </>
                  ) : (
                    <p>{reply.content}</p>
                  )}
                </div>
                {reply.author === 'You' && (
                  <div className="flex items-center">
                    <button onClick={() => handleEditComment(comment.id, replyIndex)} className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteReply(comment.id, replyIndex)} className="text-gray-500 hover:text-red-500">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center space-x-4 mt-2">
              <Input
                type="text"
                variant='standard'
                placeholder="Reply..."
                value={replyInputs[comment.id] || ''}
                onChange={(e) => setReplyInputs({ ...replyInputs, [comment.id]: e.target.value })}
                className=" py-2 px-3 w-full outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleAddReply(comment.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
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
