import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AddCourseCycle = () => {
  const [formData, setFormData] = useState({
    acadimicYearId: "",
    departementId: "",
    facultyId: "",
    year: "", // New state for the academic year
    professorId: "", // New state for professor
    courseCategoryId: "", // New state for course category
    courseId: "", // New state for course
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);

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

  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const response = await axios.get(
          `${API}CourseCategory/GetAllCourseCategories`
        );
        setCourseCategories(response.data);
      } catch (error) {
        console.error("Error fetching course categories:", error);
      }
    };
    fetchCourseCategories();
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleGroupSelectChange = async (selectedOption) => {
    setSelectedGroup(selectedOption);
    setFormData({
      ...formData,
      groupId: selectedOption ? selectedOption.value : "",
    });
  };

  const handleFacultySelectChange = async (selectedOption) => {
    const facultyId = selectedOption ? selectedOption.value : "";
    setFormData({
      ...formData,
      facultyId: facultyId,
    });
    await fetchDepartmentsByFaculty(facultyId);
  };

  const handleDepartmentSelectChange = async (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setFormData({
      ...formData,
      departementId: selectedOption ? selectedOption.value : "",
    });

    await fetchAcademicYears(selectedOption.value);
    await fetchProfessorsByDepartment(selectedOption.value);
  };

  const handleAcademicYearSelectChange = async (selectedOption) => {
    setSelectedAcademicYear(selectedOption);
    setFormData({
      ...formData,
      acadimicYearId: selectedOption ? selectedOption.value : "",
    });
    await fetchGroups(selectedOption.value);
  };

  const handleCourseCategorySelectChange = async (selectedOption) => {
    setSelectedCourseCategory(selectedOption);
    setFormData({
      ...formData,
      courseCategoryId: selectedOption ? selectedOption.value : "",
    });
    await fetchCourses(formData?.acadimicYearId, selectedOption?.value);
  };

  const fetchDepartmentsByFaculty = async (facultyId) => {
    try {
      const response = await axios.get(
        `${API}Departement/GetDepartementsOfFaculty`,
        {
          headers: {
            FacultyId: facultyId,
          },
        }
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchAcademicYears = async (departementId) => {
    try {
      const response = await axios.get(`${API}AcadimicYear/GetAcadimicYears`, {
        headers: {
          DeptId: departementId,
        },
      });
      setAcademicYears(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfessorsByDepartment = async (departementId) => {
    try {
      const response = await axios.get(
        `${API}Professor/GetAllProfessorsLessInfoInDepartement`,
        {
          headers: {
            DepartementId: departementId,
          },
        }
      );
      // Update professors state by concatenating first name and second name
      const formattedProfessors = response.data.map((professor) => ({
        value: professor.id,
        label: professor.name,
      }));
      setProfessors(formattedProfessors);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  const fetchCourses = async (academicYearId, courseCategoryId) => {
    try {
      const response = await axios.get(
        `${API}Course/GetCoursesOfAcadimicYear`,
        {
          params: {
            CourseCategoryId: courseCategoryId,
          },
          headers: {
            AcadimicYearId: academicYearId,
          },
        }
      );
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchGroups = async (academicYearId) => {
    try {
      const response = await axios.get(`${API}Group/GetGroupsOfAcadimicYear`, {
        headers: {
          AcadimicYearId: academicYearId,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract relevant data from formData
    const { departementId, year, acadimicYearId } = formData;

    // Check if required fields are empty
    if (!departementId || !year || !acadimicYearId) {
      setErrorMessage("Please fill out all fields.");
      setSuccessMessage("");
      return;
    }

    // Prepare the data to be sent
    const data = {
      title: year,
      groupId: selectedGroup.value,
      courseId: formData.courseId,
      professorId: formData.professorId,
    };
    console.log(data);

    try {
      // Send a POST request with data in the body and academic year ID in the header
      const response = await axios.post(
        `${API}CourseCycle/CreateCourseCycle`,data);
      
    
      console.log(response.status)

      if (response.status === 200) {
        setSuccessMessage("Submitted Successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to submit. Please try again later.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setErrorMessage("Failed to submit. Please try again later.");
      setSuccessMessage("");
    }

    setOpen(true); // Open the dialog after form submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full  mx-auto">
      <div className="bg-white p-5 rounded-lg shadow-md dark:bg-[#282828]">
        <div className="flex flex-col gap-5">
          <div className="flex gap-8">
            <div className="flex flex-col text-sm items-center w-full md:mb-5">
              <label htmlFor="SelectFaculty" className="mb-2">
                Faculty
              </label>

              <Select
                className="w-full"
                options={faculties.map((faculty) => ({
                  value: faculty.facultyId,
                  label: faculty.name,
                }))}
                closeMenuOnSelect={true}
                onChange={handleFacultySelectChange}
              />
            </div>

            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectDepartment" className="mb-2">
                Department
              </label>

              <Select
                className="w-full"
                options={departments.map((department) => ({
                  value: department.departementId,
                  label: department.name,
                }))}
                closeMenuOnSelect={true}
                onChange={handleDepartmentSelectChange}
                value={selectedDepartment}
              />
            </div>
            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectProfessor" className="mb-2">
                Professor
              </label>
              <Select
                className="w-full"
                options={professors}
                closeMenuOnSelect={true}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    professorId: selectedOption.value,
                  });
                }}
              />
            </div>

            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectAcademicYear" className="mb-2">
                Academic Year
              </label>

              <Select
                className="w-full"
                options={academicYears.map((academicYear) => ({
                  value: academicYear.acadimicYearId,
                  label: academicYear.year,
                }))}
                closeMenuOnSelect={true}
                onChange={handleAcademicYearSelectChange}
                value={selectedAcademicYear}
              />
            </div>

            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectCourseCategory" className="mb-2">
                Course Category
              </label>
              <Select
                className="w-full"
                options={courseCategories.map((category) => ({
                  value: category.courseCategoryId,
                  label: category.courseCategoryName,
                }))}
                closeMenuOnSelect={true}
                onChange={handleCourseCategorySelectChange}
                value={selectedCourseCategory}
              />
            </div>

            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectCourse" className="mb-2">
                Course
              </label>
              <Select
                className="w-full"
                options={courses.map((course) => ({
                  value: course.courseId,
                  label: course.name,
                }))}
                closeMenuOnSelect={true}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    courseId: selectedOption ? selectedOption.value : "",
                  });
                }}
              />
            </div>

            <div className="flex flex-col text-sm items-center w-full">
              <label htmlFor="SelectGroup" className="mb-2">
                Group
              </label>
              <Select
                className="w-full"
                options={groups.map((group) => ({
                  value: group.id,
                  label: group.name,
                }))}
                closeMenuOnSelect={true}
                onChange={handleGroupSelectChange}
                value={selectedGroup}
              />
            </div>
          </div>

          <div className="flex flex-col text-sm items-center w-96 mx-auto">
            <label htmlFor="EditAcademicYear" className="mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg outline-none"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-[#5eb1b1]"
        data-dialog-target="animated-dialog"
      >
        Submit
      </Button>

      <Dialog
        className="!w-96 dark:bg-gray-800"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
          <div className="text-center bg-white rounded-lg p-5">
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
              <p className="mb-4 text-lg font-semibold text-gray-900">
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

export default AddCourseCycle;
