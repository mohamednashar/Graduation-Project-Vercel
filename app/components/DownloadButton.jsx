import { Button } from '@material-tailwind/react';
import React from 'react';

const DownloadButton = ({ fileUrl }) => {
  const handleDownload = () => {
    // Create an anchor element
    const link = document.createElement('a');
    // Set the href attribute to the file URL
    link.href = fileUrl;
    // Set the download attribute to the file name
    link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1); // Extract filename from URL
    // Append the anchor element to the body
    document.body.appendChild(link);
    // Trigger a click event on the anchor element
    link.click();
    // Remove the anchor element from the body
    document.body.removeChild(link);
  };

  return (
    <div className='text-center animate__animated animate__bounceIn'>
      <Button onClick={handleDownload} className="bg-[#66bfbf] hover:bg-[#f76b8a] text-white font-bold py-3 px-6 rounded my-10 transition-all duration-200">
        Download Slide
      </Button>
    </div>
  );
};

export default DownloadButton;