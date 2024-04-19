"use client"
import { getFaculties } from "@/app/API/CustomHooks/useAllData";
import { deleteData } from "@/app/API/CustomHooks/useDelete";
import getData from "@/app/API/CustomHooks/useGet";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function DeleteFaculty() {
  const [allFaculties, setAllFaculties] = useState([]);
  const [facultyID, setFacultyID] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFaculties();
        setAllFaculties(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };
    fetchData();
  }, []); 

  const handleSelectChange = (selectedOption) => {
    setFacultyID(selectedOption ? selectedOption.value : "");
    console.log(facultyID)
  };

  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const handleOpenDeleteAssistant = () => {
    setOpenDeleteAssistant(!openDeleteAssistant);
  };
  const headers={'Content-Type': 'application/json',Id:facultyID}
  const DeleteFaculty = async()=>{
    await deleteData("Faculty/DeleteFaculty" , headers )

  }

  return (
    <div>
      {allFaculties && (
        <div className="flex justify-center min-h-[250px] bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
          <div>
          <Select
            className="w-full md:w-80"
            options={allFaculties.map((faculty) => ({
              value: faculty?.facultyId,
              label: faculty?.name
            }))}
            closeMenuOnSelect={true}
            onChange={handleSelectChange} // Pass the handleSelectChange function here
          />
          </div>
        </div>
      )}

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
          unmount: { scale: 0.9, y: -100 }
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-red-800 font-bold">
          Delete Faculty
        </DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Faculty will be deleted from your system. Are you sure about that?
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
            onClick={() => {
              handleOpenDeleteAssistant();
              DeleteFaculty;
            }}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteFaculty;
