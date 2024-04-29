"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getCourseCategories } from "../../CustomHooks/useAllData";
import { deleteData } from "../../CustomHooks/useDelete";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

function DeleteCourseCategory() {
  const [allCourseCategories, setAllCourseCategories] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [courseCategoryId, setCourseCategoryId] = useState(null);
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCourseCategories();
        setAllCourseCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const faculties = allCourseCategories.reduce((acc, item) => {
    const facultyOption = { value: item.facultyId, label: item.facultyName };
    if (!acc.some(fac => fac.value === facultyOption.value)) {
      acc.push(facultyOption);
    }
    return acc;
  }, []);

  const departments = selectedFaculty
    ? allCourseCategories
        .filter(item => item.facultyId === selectedFaculty.value)
        .reduce((acc, item) => {
          const departmentOption = { value: item.departementId, label: item.departementName };
          if (!acc.some(dep => dep.value === departmentOption.value)) {
            acc.push(departmentOption);
          }
          return acc;
        }, [])
    : [];

  const courseCategories = selectedDepartment
    ? allCourseCategories
        .filter(item => item.departementId === selectedDepartment.value)
        .map(item => ({
          value: item.courseCategoryId,
          label: item.courseCategoryName,
        }))
    : [];

  const handleFacultyChange = (option) => {
    setSelectedFaculty(option);
    setSelectedDepartment(null);
    setSelectedCourseCategory(null);
    setCourseCategoryId(null);
  };

  const handleDepartmentChange = (option) => {
    setSelectedDepartment(option);
    setSelectedCourseCategory(null);
    setCourseCategoryId(null);
  };

  const handleCourseCategoryChange = (option) => {
    setSelectedCourseCategory(option);
    setCourseCategoryId(option.value);
  };

  const handleOpenDeleteAssistant = () => setOpenDeleteAssistant(!openDeleteAssistant);

  const deleteCourseCategory = async () => {
    console.log(courseCategoryId)
    const headers = {
      Id: courseCategoryId,
    };
    await deleteData("CourseCategory/DeleteCourseCategory", headers);
    setOpenDeleteAssistant(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 bg-white dark:bg-[#282828] gap-5">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <Select
            id="selectFaculty"
            options={faculties}
            onChange={handleFacultyChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <Select
            id="selectDepartment"
            options={departments}
            onChange={handleDepartmentChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <Select
            id="selectCourseCategory"
            options={courseCategories}
            onChange={handleCourseCategoryChange}
            className="w-full"
          />
        </div>
      </div>
<div className="text-center my-5">
  
        <button
          onClick={handleOpenDeleteAssistant}
          disabled={!selectedCourseCategory}
          className="p-2 rounded-md bg-red-600 hover:bg-red-800 mx-w-[500px] text-white"
        >
          Delete Course Category
        </button>
</div>

      <Dialog 
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      open={openDeleteAssistant} 
      handler={handleOpenDeleteAssistant}         
      className="bg-white dark:bg-[#282828]"
>
        <DialogHeader className="text-red-800 font-bold">Delete Course Category</DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Course Category will be deleted from your system. Are you sure?
        </DialogBody>
        <DialogFooter className="flex items-center gap-5">
        <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteAssistant}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>          <Button onClick={deleteCourseCategory} color="red">
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteCourseCategory;
