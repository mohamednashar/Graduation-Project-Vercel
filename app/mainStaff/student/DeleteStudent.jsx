import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function DeleteStudent() {
  const [openDeleteProf, setOpenDeleteProf] = useState(false);
  const [email, setEmail] = useState("");
  
  const handleOpenDeleteProf = () => {
    setOpenDeleteProf(!openDeleteProf);
  };

  const handleDeleteProf = async () => {
    try {
      await axios.delete(`${API}Student/DeleteStudent`, {
        headers: {
          "Email": email
        }
        
      });
      // Handle success, maybe show a message to the user
      console.log("Student deleted successfully!");
    } catch (error) {
      // Handle error, maybe show an error message to the user
      console.error("Error deleting Student:", error);
    }
    // Close the dialog
    setOpenDeleteProf(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-5 bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
        <label htmlFor="email" className="dark:text-white">Student Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg p-1 border-2 border-gray-300 dark:text-white dark:bg-[#282828] outline-none"
        />
      </div>

      <div className=" w-full md:w-[90%] mx-auto flex items-center justify-center">
        <button
          onClick={handleOpenDeleteProf}
          className="p-2 rounded-md bg-red-600 hover:bg-red-800 mx-w-[500px] text-white"
        >
          Delete Student
        </button>
      </div>

      <Dialog
        open={openDeleteProf}
        handler={handleOpenDeleteProf}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-red-800 font-bold">
          Delete Student
        </DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Student will be deleted from your system. Are you sure about that?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteProf}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            className="bg-red-600 py-2 px-4 mx-2 hover:bg-red-900 transition-all duration-500 rounded-lg text-white font-semibold"
            onClick={handleDeleteProf}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteStudent;
