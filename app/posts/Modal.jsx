import React from "react";

function Modal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#282828] p-8 rounded shadow-md">
        <p>Are you sure you want to delete this comment?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2 px-4 py-2 border-2 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
