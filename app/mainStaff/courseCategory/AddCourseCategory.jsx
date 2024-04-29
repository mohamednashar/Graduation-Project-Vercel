"use client"
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { deleteData } from "../../CustomHooks/useDelete";
import { postData } from "../../CustomHooks/usePost";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const DeleteDepartment = () => {
  const [facultyId, setFacultyId] = useState(null);
  const [departmentId, setDepartmentId] = useState();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleCourseDescriptionChange = (event) => {
    setCourseDescription(event.target.value);
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(`${API}Faculty/GetFaculties`);
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const fetchDepartmentsByFaculty = async (facultyId) => {
    try {
      const response = await axios.get(`${API}Departement/GetDepartementsOfFaculty`, {
        headers: {
          FacultyId: facultyId,
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = {
      name:courseName,
      description:courseDescription,
      departementId:departmentId
    };
    console.log(courseData);
    // Here you could also send courseData to a server or another state management area


    const status = await postData(`CourseCategory/CreateCourseCategory` , courseData);
    console.log(status)

    status === 200
      ? (setSuccessMessage("Added Successfully"),
        setErrorMessage(""),
        setOpen(true))
      : (setErrorMessage("Failed to Add. Please try again later."),
        setSuccessMessage(""),
        setOpen(true));
  };
 
  const handleSelectChange = (selectedOption, selector) => {
    const ID = selectedOption ? selectedOption.value : null;
    if (selector === "facultyId") {
      setFacultyId(ID);
      console.log("facultyId : " + facultyId )
      fetchDepartmentsByFaculty(ID);
    } else if (selector === "departmentId") {
      setDepartmentId(ID);
      console.log("departmentId : " + departmentId)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-[90%] mx-auto"
    >
      <div className="bg-white p-5 flex gap-14 rounded-lg shadow-md dark:bg-[#282828]">
      <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="courseName" className="mb-2 text-[#282828] dark:text-white"> 
            Course Name
          </label>
          <input
            id="courseName"
            className="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#282828] dark:text-white"
            onChange={handleCourseNameChange}
            value={courseName}
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="courseDescription" className="mb-2 text-[#282828] dark:text-white"> 
             Course description
          </label>
          <input
            id="courseDescription"
            className="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#282828] dark:text-white"
            value={courseDescription}
          onChange={handleCourseDescriptionChange}
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectFaculty" className="mb-2 text-[#282828] dark:text-white"> 
            Select Faculty
          </label>
          <Select
            id="selectFaculty"
            className="w-full"
            options={faculties.map((faculty) => ({
              value: faculty.facultyId,
              label: faculty.name,
            }))}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "facultyId")
            }
          />
        </div>
        
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectDepartment" className="mb-2 text-[#282828] dark:text-white"> 
            Select Department
          </label>
          <Select
            id="selectDepartment"
            className="w-full"
            options={departments.map((department) => ({
              value: department.departementId,
              label: department.name,
            }))}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "departmentId")
            }
          />
        </div>
      </div>

      <Button
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 "
        data-dialog-target="animated-dialog"
        onClick={ ()=>{ handleOpen ; handleSubmit; }}
      >
        Submit
      </Button>

      <Dialog
        className="!w-96 bg-white dark:bg-gray-800"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
          <div className="text-center  rounded-lg p-5">
            <button
              onClick={handleOpen}
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {successMessage && (
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="mb-4 text-lg font-semibold text-red-600">
                {errorMessage}
              </p>
            )}
            <button
              onClick={handleOpen}
              className="bg-green-600 text-white py-3 px-6 font-bold rounded-lg uppercase shadow-md transition-all hover:bg-green-500 hover:shadow-lg active:opacity-75"
            >
              Continue
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </form>
  );
};

export default DeleteDepartment;

