import React, { useState } from 'react';
import { Avatar } from '@material-tailwind/react';

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
      content: 'This is the first comment.',
      replies: [],
    },
    // Add more comments as needed
  ]);

  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const comment = {
        id: comments.length + 1,
        author: { name: 'You', avatar: 'https://via.placeholder.com/150' },
        content: newComment,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentIndex) => {
    if (newReply.trim() !== '') {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push({ content: newReply, author: 'You' });
      setComments(updatedComments);
      setNewReply('');
    }
  };
  

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  return (
    <div className="space-y-4 ">
      <div className="flex items-center space-x-4">
        <Avatar src="https://via.placeholder.com/150" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded-lg py-2 px-3 w-full outline-none focus:border-blue-500"
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
          <div className="flex-1  rounded-lg p-4 bg-white mb-16 ">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">{comment.author.name}</p>
              <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-500">
              Delete
              </button>
            </div>
            <p>{comment.content}</p>
            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className="bg-gray-50 rounded-lg p-2 mt-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">{reply.author}</p>
                  <button
                    onClick={() => handleDeleteReply(commentIndex, replyIndex)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
                <p>{reply.content}</p>
              </div>
            ))}
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="text"
                placeholder="Reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="border rounded-lg py-2 px-3 w-full outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleAddReply(commentIndex)}
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
