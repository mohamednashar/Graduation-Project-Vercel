"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import 'tailwindcss/tailwind.css';

const Notes = () => {
  const [note, setNote] = useState('');
  const [pictures, setPictures] = useState([]);

  const handleNoteChange = (value) => {
    setNote(value);
  };

  const handlePictureDrop = (acceptedFiles) => {
    const pictureFiles = acceptedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setPictures(pictures.concat(pictureFiles));
  };

  const insertImage = (picture) => {
    const range = quillRef.current.getEditor().getSelection(true);
    const index = range.index + range.length;

    quillRef.current.getEditor().insertEmbed(index, 'image', picture.preview, 'user');
  };

  const quillRef = React.useRef();

  return (
    <div className="container mx-auto my-8 p-8 bg-white dark:bg-[#1e1e1e] max-w-3xl rounded-lg shadow-md">
      <ReactQuill className="ql-editor !text-white" ref={quillRef} value={note} onChange={handleNoteChange} modules={quillModules} />

      <div className="mt-8">
        <Dropzone onDrop={handlePictureDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer rounded">
              <input  {...getInputProps()} />
              <p>Drag or drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>

        {pictures.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap justify-center">
              {pictures.map((file, index) => (
                <div key={index} className="m-2">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-[300px] h-[300px] cursor-pointer border border-gray-300 rounded"
                    onClick={() => insertImage(file)}
                  />
                  <p className="text-sm mt-2">{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const quillModules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link','image'],

    ],
  },
};

export default Notes;