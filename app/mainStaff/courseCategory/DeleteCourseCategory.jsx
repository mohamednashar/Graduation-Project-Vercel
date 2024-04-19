"use client";
import { getCourseCategories } from "@/app/API/CustomHooks/useAllData";
import { deleteData } from "@/app/API/CustomHooks/useDelete";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function DeleteCourseCategory() {
  const [allCourseCategories, setAllCourseCategories] = useState([]);
  const [courseCategoryId, setCourseCategoryId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCourseCategories();
        setAllCourseCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };
    fetchData();
  }, []);
  console.log(allCourseCategories);

  const handleSelectChange = (selectedOption) => {
    const ID = selectedOption ? selectedOption.value : "";
    setCourseCategoryId(ID);
    console.log(ID); // Log the selected ID directly after setting the state
  };

  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const handleOpenDeleteAssistant = () => {
    setOpenDeleteAssistant(!openDeleteAssistant);
  };
  const headers = { "Content-Type": "application/json", Id: courseCategoryId };
  const deleteCourseCategory = async () => {
    await deleteData("CourseCategory/DeleteCourseCategory", headers);
  };

  return (
    <div>
      {allCourseCategories && (
        <div className="flex justify-center min-h-[250px] bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
          <div>
            <Select
              className="w-full md:w-80"
              options={allCourseCategories.map((category) => ({
                value: category?.courseCategoryId,
                label: category?.name,
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
          Delete Course Category
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
          Delete Course Category
        </DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Course Category will be deleted from your system. Are you sure about
          that?
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
              deleteCourseCategory();
            }}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteCourseCategory;
