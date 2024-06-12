import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faFilePdf,
  faFileImage,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AllAssignments = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [fileIcon, setFileIcon] = useState(null);
  const [fileName, setFileName] = useState(""); // Add fileName state
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(null);
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    description: "",
    fullMark: 0,
    endedAt: "",
    sectionId: sectionId,
  });

  const [updatedAssignment, setUpdatedAssignment] = useState({
    name: "",
    description: "",
    fullMark: 0,
    endedAt: "",
    sectionId: sectionId,
  });
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [fileSelected, setFileSelected] = useState(false); // New state for file selected

  const handleOpen = () => setOpen(!open);
  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
    console.log(openUpdate);
  };
  const handleDeleteOpen = (assignment) => {
    setAssignmentToDelete(assignment);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => setDeleteOpen(false);

  const { data: session } = useSession();
  const userName = session?.user?.userName;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleInputUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAssignment({ ...updatedAssignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form submission starts
    try {
      const formattedEndedAt = newAssignment.endedAt + ":00.000Z";

      const response = await axios.post(
        `${API}Assignement/CreateAssignement`,
        {
          ...newAssignment,
          endedAt: formattedEndedAt,
        },
        {
          params: {
            InstructorUserName: userName,
          },
        }
      );

      const createdAssignment = response.data;
      console.log("Assignment created:", createdAssignment);
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        createdAssignment,
      ]);

      // Check if a file is selected and upload it
      if (formData) {
        formData.append("AssignementId", createdAssignment.assignmentId);
        await axios.post(
          `${API}FileProcessingOfAssignement/UploadFileToAssignement`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              InstructorUserName: userName,
            },
          }
        );
      }

      handleOpen();
      setFormData(null);
      setFileSelected(false); // Reset file selected state
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setLoading(false); // Set loading to false when the form submission finishes
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `${API}Assignement/GetAllAssignemntsOfSection`,
        {
          params: {
            SectionId: sectionId,
            UserName: userName,
            typesOfUsers: "Instructor",
          },
        }
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}Assignement/DeleteAssignement`, {
        headers: {
          Id: assignmentToDelete.assignmentId,
        },
        params: {
          InstructorUserName: userName,
        },
      });
      setAssignments((assignments) =>
        assignments.filter(
          (assignment) =>
            assignment.assignmentId !== assignmentToDelete.assignmentId
        )
      );
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  useEffect(() => {
    if (sectionId) {
      fetchAssignments();
    }
  }, [sectionId]);

  const mapMimeTypeToSimplifiedType = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return "PDF";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "DOCX";
      case "image/jpeg":
        return "JPG";
      case "image/png":
        return "PNG";
      default:
        return "UNKNOWN";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append("SectionId", sectionId);
      newFormData.append("FormFile", file);
      newFormData.append("Name", file.name);
      newFormData.append("FileType", mapMimeTypeToSimplifiedType(file.type));

      setFormData(newFormData);
      setFileIcon(getFileIcon(file.type));
      setFileName(file.name); // Set the file name
    } else {
      setFileIcon(null);
      setFileName(""); // Clear the file name
    }
  };

  const getFileIcon = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return (
          <FontAwesomeIcon
            icon={faFilePdf}
            className="ml-1 text-red-500 text-3xl"
          />
        );
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <FontAwesomeIcon
            icon={faFileWord}
            className="ml-1 text-blue-500 text-3xl"
          />
        );
      case "image/jpeg":
      case "image/png":
        return (
          <FontAwesomeIcon
            icon={faFileImage}
            className="ml-1 text-green-500 text-3xl"
          />
        );
      default:
        return null;
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form submission starts
    try {
      const formattedEndedAt = updatedAssignment.endedAt ;

      const response = await axios.put(
        `${API}Assignement/UpdateAssignement`,
        {
          ...updatedAssignment,
          endedAt: formattedEndedAt,
        },
        {
          params: {
            InstructorUserName: userName,
          },
          headers: {
            Id: id, 
          },
        }
      );

      handleOpenUpdate();
      fetchAssignments();
      setFormData(null);
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setLoading(false); // Set loading to false when the form submission finishes
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.assignmentId}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{assignment.name}</h2>
                  <p className="text-gray-600">{assignment.description}</p>
                  <p className="text-gray-600">
                    Full Mark: {assignment.fullMark}
                  </p>
                  <p className="text-gray-600">
                    Ends At: {new Date(assignment.endedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleOpenUpdate();
                      setId(assignment.assignmentId);

                      setUpdatedAssignment({
                        name: assignment.name,
                        description:assignment.description,
                        fullMark: assignment.fullMark,
                        endedAt: assignment.endedAt ,
                        sectionId: sectionId,
                      });
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                  </button>
                  
                  
                  <Link
                    href={{
                      pathname: "show",
                      query: {
                        name: assignment.name,
                        id: assignment.assignmentId,
                      },
                    }}
                  >
                    {" "}
                    <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center">
                      <FontAwesomeIcon icon={faEye} className="mr-2" /> Show
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                    onClick={() => handleDeleteOpen(assignment)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="mb-10 bg-[#66bfbf] px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#5aaeae] transition-all duration-200"
          onClick={handleOpen}
        >
          Create Assignment
        </button>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-[#282828]"
      >
        <DialogHeader className="dark:text-white">
          Add new Assignment
        </DialogHeader>
        <DialogBody>
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name Of Assignment"
                  value={newAssignment.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Assignment Details
                </label>
                <textarea
                  rows="5"
                  name="description"
                  id="description"
                  placeholder="Assignment Details"
                  value={newAssignment.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="endedAt"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Assignment Deadline
                </label>
                <input
                  type="datetime-local"
                  name="endedAt"
                  id="endedAt"
                  placeholder="deadline"
                  value={newAssignment.endedAt}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="fullMark"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Points Assignment
                </label>
                <input
                  type="number"
                  name="fullMark"
                  id="fullMark"
                  placeholder="Points"
                  value={newAssignment.fullMark}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="file"
                  className="cursor-pointer px-4 py-1.5 rounded-lg bg-[#66bfbf] hover:bg-[#5babab] transition-all duration-200 text-white flex items-center"
                >
                  Upload File
                </label>
                {fileIcon && (
                  <div className="flex items-center ml-2">
                    <span>{fileIcon}</span>
                    <span className="ml-2">{fileName}</span>{" "}
                    {/* Show the file name */}
                  </div>
                )}
                <input
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                />
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            color="green"
            onClick={handleSubmit}
            className="mr-1 flex items-center"
            disabled={loading} // Disable button when loading
          >
            <span>Add new Assignment</span>
            {loading && <Spinner className="ml-1 h-4 w-4" color="teal" />}
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={deleteOpen}
        handler={handleDeleteClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-[#282828]"
      >
        <DialogHeader className="dark:text-white">Confirm Delete</DialogHeader>
        <DialogBody>
          <p className="dark:text-white">
            Are you sure you want to delete this assignment?
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeleteClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            color="green"
            onClick={() => {
              handleDelete();
              handleDeleteClose();
            }}
            className="mr-1"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*  Update Assignment Details */}

      <Dialog
        open={openUpdate}
        handler={handleOpenUpdate}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-[#282828]"
      >
        <DialogHeader className="dark:text-white">Edit Assignment</DialogHeader>
        <DialogBody>
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name Of Assignment"
                  value={updatedAssignment.name}
                  onChange={handleInputUpdateChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Assignment Details
                </label>
                <textarea
                  rows="5"
                  name="description"
                  id="description"
                  placeholder="Assignment Details"
                  value={updatedAssignment.description}
                  onChange={handleInputUpdateChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="endedAt"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Assignment Deadline
                </label>
                <input
                  type="datetime-local"
                  name="endedAt"
                  id="endedAt"
                  placeholder="deadline"
                  value={updatedAssignment.endedAt}
                  onChange={handleInputUpdateChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="fullMark"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Points Assignment
                </label>
                <input
                  type="number"
                  name="fullMark"
                  id="fullMark"
                  placeholder="Points"
                  value={updatedAssignment.fullMark}
                  onChange={handleInputUpdateChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
                />
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenUpdate}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            color="green"
            onClick={handleSubmitUpdate}
            className="mr-1 flex items-center"
            disabled={loading} // Disable button when loading
          >
            <span>Edit Assignment</span>
            {loading && <Spinner className="ml-1 h-4 w-4" color="teal" />}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AllAssignments;
