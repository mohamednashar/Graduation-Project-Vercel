import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AllAssignments = () => {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    description: "",
    fullMark: 0,
    endedAt: "",
    sectionId: sectionId,
  });

  const handleOpen = () => setOpen(!open);
  const { data: session } = useSession();
  const userName = session?.user?.userName;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the endedAt value
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
      console.log('Assignment created:', response.data);
      setAssignments(prevAssignments => [...prevAssignments, newAssignment]);
            handleOpen(); 
    } catch (error) {
      console.error('Error creating assignment:', error);
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

  useEffect(() => {
    if (sectionId) {
      fetchAssignments();
    }
  }, [sectionId]);

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
                  <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center">
                    <FontAwesomeIcon icon={faEye} className="mr-2" /> Show
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
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
          className="bg-[#66bfbf] px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#5aaeae] transition-all duration-200"
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
            className="mr-1"
          >
            <span>Add new Assignment</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AllAssignments;
