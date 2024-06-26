"use client";
import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "animate.css";
import Spin from "@/app/components/Spin";
import Notes from "@/app/components/Notes";
import CommentSection from "@/app/components/CommentSection";




const videos = [
  {
    id: 1,
    title: "Lecture 1",
    src: "https://www.youtube.com/embed/UdFOE_iPEMU",
    slideUrl:
      "https://drive.google.com/file/d/1r6mVeVs4uk0u6_Z2Ls8sF2Bk-2rCAstr/view?usp=sharing",
  },
  {
    id: 2,
    title: "Lecture 2",
    src: "https://www.youtube.com/embed/UQoLE0FHHCk",
    slideUrl:
      "https://drive.google.com/file/d/1uCNavikjGzmA9kZUUTJcQ_dTkbcVFkia/view?usp=drive_link",
  },
  {
    id: 3,
    title: "Lecture 3",
    src: "https://www.youtube.com/embed/UQoLE0FHHCk",
    slideUrl:
      "https://drive.google.com/file/d/1uCNavikjGzmA9kZUUTJcQ_dTkbcVFkia/view?usp=drive_link",
  },
  {
    id: 4,
    title: "Lecture 4",
    src: "https://www.youtube.com/embed/UQoLE0FHHCk",
    slideUrl:
      "https://drive.google.com/file/d/1uCNavikjGzmA9kZUUTJcQ_dTkbcVFkia/view?usp=drive_link",
  },
  {
    id: 5,
    title: "Lecture 5",
    src: "https://www.youtube.com/embed/UQoLE0FHHCk",
    slideUrl:
      "https://drive.google.com/file/d/1uCNavikjGzmA9kZUUTJcQ_dTkbcVFkia/view?usp=drive_link",
  },
];

const VideoSidebar = ({ onSelectVideo, isOpen, toggleSidebar }) => {
  const [currentVid, setCurrentVid] = useState(videos[0]);
  const [scroll, setIsScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDisappear = () => {
    isOpen === true ? setIsVisible(true) : setIsVisible(false);
  };

  const selectVidIndex = (video, toggleSidebar) => {
    setCurrentVid(video);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Set a threshold of 84px
      const threshold = 84;

      // Toggle the class based on scroll position
      setIsScroll(scrollY >= threshold);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [openDeleteLecture, setOpenDeleteLecture] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenDeleteLecture = () =>
    setOpenDeleteLecture(!openDeleteLecture);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-black dark:text-white">
          Add new lecture.
        </DialogHeader>
        <DialogBody>
          <div className="gap-6 flex flex-col">
            <Input
              variant="standard"
              label="Video URL"
              className="dark:bg-[#3f3f3f]"
            />

            <Input
              variant="standard"
              label="Slide URL"
              className="dark:bg-[#3f3f3f]"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>ADD</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        open={openDeleteLecture}
        handler={handleOpenDeleteLecture}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-red-800 font-bold">
          Delete lecture
        </DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This lecture will be deleted from all the students who are studying
          this course with you. Are you sure about that?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteLecture}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            className="bg-red-600 py-2 px-4 mx-2 hover:bg-red-900 transition-all duration-500 rounded-lg text-white font-semibold"
            onClick={handleOpenDeleteLecture}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>

      <div
        className={`rounded-xl md:w-1/4 bg-white dark:bg-[#1e1e1e] h-[100vh] overflow-y-auto dark:text-gray-300
      ${scroll ? "sticky top-0 right-0" : ""}
    ${
      isVisible
        ? "animate__animated animate__bounceInRight"
        : "animate__animated animate__fadeOutRight"
    }
    `}
      >
        <div className="p-4">
          <div className="flex mb-4 border-b-2 pb-2 items-center gap-4">
            <button
              className="bg-[#66bfbf] hover:bg-[#4e9999] text-white font-bold py-2 px-3 rounded-xl transition-all duration-500"
              onClick={handleOpen}
              variant="gradient"
            >
              Add Lecture
            </button>
            <button
              className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-3 rounded-xl  transition-all duration-500"
              onClick={handleOpenDeleteLecture}
              variant="gradient"
            >
              Delete Lecture
            </button>

            <button
              onClick={() => {
                handleDisappear();
                toggleSidebar();
              }}
              className="text-md text-white ml-auto hidden rounded-full md:flex justify-center items-center bg-[#66bfbf] dark:bg-[#66bfbf] dark:text-black  w-3 h-3 p-3.5 transition-all duration-200 hover:rotate-180"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="flex flex-col ">
            {videos.map((video) => (
              <Button
                key={video.id}
                className={`bg-gray-200 text-black  cursor-pointer p-2 dark:text-gray-300 rounded-xl last:border-none transition-all duration-200 mb-6 font-poppins font-semibold ${
                  currentVid.id === video.id
                    ? "bg-[#66bfbf] text-white dark:bg-[#66bfbf] dark:text-black "
                    : "dark:bg-[#353535]"
                }`}
                onClick={() => {
                  onSelectVideo(video);
                  selectVidIndex(video);
                }}
              >
                {video.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const VideoPlayer = ({ videoSrc, isOpen }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleIframeLoad = () => {
      setIframeLoaded(true);
    };
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      setIframeLoaded(true);
    }
    window.addEventListener("message", handleIframeLoad);

    return () => {
      window.removeEventListener("message", handleIframeLoad);
    };
  }, []);

  return (
    <div className="animate__animated animate__backInDown bg-gray-300 rounded-md flex justify-center items-center md:flex-1 md:min-h-[500px] md:h-[400px] dark:bg-[#282828]">
      {!iframeLoaded && <Spin />}

      <iframe
        className={` mx-auto min-w-[350px] h-[320px] md:h-full  animate__animated animate__fadeIn ${
          iframeLoaded ? "" : "hidden"
        }
        ${isOpen ? "md:w-3/4" : "md:w-1/2"}
        `}
        src={videoSrc}
        allowFullScreen="allowFullScreen"
      ></iframe>
    </div>
  );
};

const Lectures = () => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const selectVideo = (video) => {
    setCurrentVideo(video);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotes, setShowNotes] = useState(false); // State to manage the visibility of the Notes component
  const toggleShowNotes = () => {
    setShowNotes(!showNotes);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [courseContent, setCourseContent] = useState(false);

  const [isHovered, setIsHovered] = useState(true);

  const handleDownload = (fileUrl) => {
    // Create an anchor element
    const link = document.createElement("a");
    // Set the href attribute to the file URL
    link.href = fileUrl;
    // Set the download attribute to the file name
    link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1); // Extract filename from URL
    // Append the anchor element to the body
    document.body.appendChild(link);
    // Trigger a click event on the anchor element
    link.click();
    // Remove the anchor element from the body
    document.body.removeChild(link);
  };

  return (
    <div
      className={`md:flex pt-5 mx-5 overflow-x-hidden ${
        isSidebarOpen
          ? `pt-5 mx-5 transition-all duration-300`
          : `!pt-0 !mx-0 transition-all duration-300`
      }`}
    >
      <div
        className={`transition-all duration-200  ${
          isSidebarOpen ? `w-full md:w-3/4 md:mr-5` : `w-full`
        } `}
      >
        <VideoPlayer videoSrc={currentVideo.src} isOpen={isSidebarOpen} />
        <div className="flex items-center gap-8 flex-wrap justify-center mt-5 mb-5">
          <button
            onClick={() => {
              handleDownload(currentVideo.slideUrl);
            }}
            className="bg-[#66bfbf] hover:bg-[#4e9999] text-white font-bold py-2 px-3 rounded  transition-all duration-500"
          >
            Download Slide
          </button>

          <button
            onClick={toggleShowNotes}
            className="bg-[#66bfbf] hover:bg-[#4e9999] text-white font-bold py-2 px-3 rounded transition-all duration-500"
          >
            {showNotes ? "Remove Note" : "Add Note"}
          </button>
        

        </div>
        {showNotes &&  <Notes/>}
        <CommentSection/>

        <button
          onClick={toggleSidebar}
          onMouseEnter={() => {
            setIsHovered(true);
            setCourseContent(true);
          }}
          onMouseLeave={() => {
            setCourseContent(false);
          }}
          className={`${
            isSidebarOpen ? "hidden" : "hidden md:block"
          } absolute top-[200px] right-0 rounded-l-lg p-3 flex items-center  bg-[#66bfbf] dark:bg-[#3f3f3f] text-white ${
            isHovered ? "animate__animated animate__fadeInRight" : ""
          } `}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLeftLong} className="w-6 h-6" />
            <span
              className={`${courseContent ? "inline-block" : "hidden"} mx-3 ${
                isHovered
                  ? "animate__animated animate__fadeInRight"
                  : "animate__animated animate__fadeOutRight"
              } `}
            >
              Course content
            </span>
          </div>
        </button>
      </div>
      {isSidebarOpen && (
        <VideoSidebar
          onSelectVideo={selectVideo}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Lectures;
