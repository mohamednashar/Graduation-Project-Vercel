import { deleteData } from "@/app/API/CustomHooks/useDelete";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";

function DeleteFaculty() {
  const [facultyID, setFacultyID] = useState('');

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setFacultyID(event.target.value);
  };
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const handleOpenDeleteAssistant = () => {
    setOpenDeleteAssistant(!openDeleteAssistant);
  };
  return (
    <div>
      <div className="flex items-center justify-center gap-5 bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
        <label htmlFor="FacultyCode" className="dark:text-white">Faculty ID</label>
        <input
          type="number"
          id="FacultyCode"
          className="rounded-lg p-1 border-2 dark:text-white dark:bg-[#282828]"
          value={facultyID} // Bind the input value to the state
          onChange={handleInputChange} // Handle input changes
        />
      </div>

      <div className=" w-full md:w-[90%] mx-auto flex items-center justify-center">
        <button
          onClick={handleOpenDeleteAssistant}
          className="p-2 rounded-md bg-red-600 hover:bg-red-800 mx-w-[500px] text-white"
        >
          Delete Faculty
        </button>
      </div>

      <Dialog
        open={openDeleteAssistant}
        handler={handleOpenDeleteAssistant}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-red-800 font-bold">
          Delete Faculty
        </DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Faculty will be deleted from your system . Are you sure about that?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteAssistant}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            className="bg-red-600 py-2 px-4 mx-2 hover:bg-red-900 transition-all duration-500 rounded-lg text-white font-semibold"
            onClick={ ()=>{ handleOpenDeleteAssistant ; deleteData("Faculty/DeleteFaculty" , facultyID);          }}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteFaculty;