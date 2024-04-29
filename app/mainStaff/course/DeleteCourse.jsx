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
import { deleteData } from "../../CustomHooks/useDelete";

function DeleteCourse() {
  const [allCourseCategories, setAllCourseCategories] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
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
  
  const getCoursesOfAcademicYear = async (academicYearId, courseCategoryId) => {
    const apiUrl = `${API}Course/GetCoursesOfAcadimicYear`;
    const params = { CourseCategoryId: courseCategoryId };
    const headers = { AcadimicYearId: academicYearId };
  
    try {
      const response = await axios.get(apiUrl, { headers,params  });
      console.log(response.status)
      console.log(
        "Fetched data with:",
        academicYearId,
        courseCategoryId
      );
      const coursesData = response.data.map((course) => ({
        value: course.courseId, label: course.name
      
      }));
      setCourses(coursesData);
      
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
    
 
  

  const handleFacultyChange = (option) => {
    setSelectedFaculty(option);
    setSelectedDepartment(null);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
    setSelectedCourse(null);
  };

  const handleDepartmentChange = async (option) => {
    setSelectedDepartment(option);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
    setSelectedCourse(null);
    const years = await getAcademicYears(option.value);
    setAcademicYears(years);
  };

const handleCourseCategoryChange = async (option) => {
  setSelectedCourseCategory(option);
  setSelectedCourse(null);
  
  if (selectedAcademicYear && option) {
    console.log(selectedAcademicYear.value)
    console.log(option.value)
    await getCoursesOfAcademicYear(selectedAcademicYear.value, option.value);
  }
};


  const handleAcademicYearChange = async (option) => {
    setSelectedAcademicYear(option);
    if (selectedCourseCategory && option) {
      await getCoursesOfAcademicYear(option.value, selectedCourseCategory.value);
    }
    setSelectedCourse(null);
  };

  const handleCourseChange = (option) => {
    setSelectedCourse(option);
  };

  const handleOpenDeleteAssistant = () => setOpenDeleteAssistant(!openDeleteAssistant);

  const deleteCourse = async () => {
    console.log(selectedCourse.value)
    const headers={ Id: selectedCourse.value }
 
      await axios.delete(`${API}Course/DeleteCourse`, {
        headers: headers
      });

  };

  return (
    <>
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-5 bg-white dark:bg-[#282828] gap-5 ">
        <div className="flex flex-col text-sm items-center w-full md:mb-5  ">
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
     

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectCourse">Select Course</label>
          <Select
            id="selectCourse"
            options={courses}
            onChange={handleCourseChange}
            className="w-full"
          />
        </div>

      

        
      </div>

      <Button
      disabled={!selectedCourse}
        onClick={deleteCourse}
        
        className=" font-bold text-lg bg-red-500 text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto  mb-5 transition-all duration-200 "
      >
        Delete Course
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
        <DialogHeader className="text-red-800 font-bold">Delete Course</DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This course will be deleted from your system. Are you sure?
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
          <Button onClick={deleteCourse} color="red">Delete</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteCourse;
