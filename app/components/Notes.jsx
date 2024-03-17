import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const Notes = () => {
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-lg shadow-md mb-5">
      <ReactQuill
        value={note}
        onChange={setNote}
        readOnly={!isEditing}
        theme="snow"
      />
      <div className="mt-2 flex justify-end">
        {isEditing ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Notes;
