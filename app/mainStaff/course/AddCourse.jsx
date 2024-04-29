import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from 'axios'; // Import Axios library
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { getCourseCategories } from "../../CustomHooks/useAllData";
import { postData } from "../../CustomHooks/usePost";

function AddCourse() {
  const [allCourseCategories, setAllCourseCategories] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [totalMark, setTotalMark] = useState(0);
  const [academicYears, setAcademicYears] = useState([]);
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const [message , setMessage] = useState("")
  const API=process.env.NEXT_PUBLIC_BACKEND_API

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

    const getAcademicYears = async (departementId) => {
      try {
          const response = await axios.get(`${API}AcadimicYear/GetAcadimicYears`, {
              headers: {
                  "DeptId": departementId
              }
          });
          console.log(response.data);
          const years = response.data.map(year => ({ value: year.acadimicYearId, label: year.year }));
          console.log("Years:", years); // Log transformed years
          setAcademicYears(response.data);
          return years; // Return the years
      } catch (err) {
          console.log(err);
          return [];
      }
  };
  

  const handleFacultyChange = (option) => {
    setSelectedFaculty(option);
    setSelectedDepartment(null);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
  };

  const handleDepartmentChange = async (option) => {
    setSelectedDepartment(option);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
    const years = await getAcademicYears(option.value);
    setAcademicYears(years);
  };

  const handleCourseCategoryChange = (option) => {
    setSelectedCourseCategory(option);
  };

  const handleAcademicYearChange = (option) => {
    setSelectedAcademicYear(option);
  };

  const handleOpenDeleteAssistant = () => setOpenDeleteAssistant(!openDeleteAssistant);

  const createCourse = async () => {
    const courseData = {
      name: courseName,
      description: courseDescription,
      totalMark: totalMark,
      acadimicYearId: selectedAcademicYear.value,
      courseCategoryId: selectedCourseCategory.value,
      departementId: selectedDepartment.value
    };
    console.log(courseData)
    const status = await postData("Course/CreateCourse", courseData);

    status === 200 ? setMessage("Course Added") : setMessage("Something went wrong can't add new course try again in another time")
    handleOpenDeleteAssistant()
  };

  return (
    <>

    <div className="flex flex-col ">
      <div className="flex items-center justify-between p-5 bg-white dark:bg-[#282828] gap-5">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectFaculty">Faculty</label>
          <Select
            id="selectFaculty"
            options={faculties}
            onChange={handleFacultyChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectDepartment">Department</label>
          <Select
            id="selectDepartment"
            options={departments}
            onChange={handleDepartmentChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectAcademicYear">Academic Year</label>
          <Select
            id="selectAcademicYear"
            options={academicYears}
            onChange={handleAcademicYearChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectCourseCategory">Course Category</label>
          <Select
            id="selectCourseCategory"
            options={courseCategories}
            onChange={handleCourseCategoryChange}
            className="w-full"
          />
        </div>

      
      </div>

      <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#282828] gap-5">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full md:mb-5 border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full md:mb-5 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Total Mark"
          value={totalMark}
          onChange={(e) => setTotalMark(e.target.value)}
          className="w-full md:mb-5 border border-gray-300 rounded-md p-2"
        />
      </div>

      <Button
        onClick={createCourse}
        disabled={!selectedAcademicYear || !selectedCourseCategory || !selectedDepartment || !courseName || !courseDescription || !totalMark}
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 "
      >
        Submit
      </Button>
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
        <DialogHeader className="text-[#282828] dark:text-white text-2xl">Add new course</DialogHeader>
        <DialogBody className="text-[#282828] dark:text-white text-lg text-center">
          {message}
        </DialogBody>
        <DialogFooter className="flex items-center gap-5">
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteAssistant}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>          
         
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddCourse;
