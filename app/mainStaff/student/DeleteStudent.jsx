import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";

function DeleteStudent() {
  const [openDeleteStudent, setOpenDeleteStudent] = useState(false);
  const handleOpenDeleteStudent = () => {
    setOpenDeleteStudent(!openDeleteStudent);
  };
  return (
    <div>
      <div className="flex items-center justify-center gap-5 bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
        <label htmlFor="nationalID" className="dark:text-white">National ID</label>
        <input
          type="number"
          id="nationalID"
          className="rounded-lg p-1 border-2 dark:text-white dark:bg-[#282828] outline-none"
        />
      </div>

      <div className=" w-full md:w-[90%] mx-auto flex items-center justify-center">
        <button
          onClick={handleOpenDeleteStudent}
          className="p-2 rounded-md bg-red-600 hover:bg-red-800 mx-w-[500px] text-white"
        >
          Delete Student
        </button>
      </div>

      <Dialog
        open={openDeleteStudent}
        handler={handleOpenDeleteStudent}
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
          This Student will be deleted from your system . Are you sure about that?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteStudent}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <button
            className="bg-red-600 py-2 px-4 mx-2 hover:bg-red-900 transition-all duration-500 rounded-lg text-white font-semibold"
            onClick={handleOpenDeleteStudent}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteStudent;
