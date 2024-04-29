import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import getData from "../../CustomHooks/useGet";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const UpdateSection = () => {
  const [formData, setFormData] = useState({
    acadimicYearId: "",
    departementId: "",
    facultyId: "",
    name: "", // New state for the academic year
    instructorId: "", // New state for instructor
    courseCategoryId: "", // New state for course category
    courseId: "", // New state for course
    description:"",
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedCourse , setSelectedCourse] = useState(null)
  const [courseCycleId , setCourseCycleId] = useState(null)
  const [sections , setSections] = useState([])
  const [selectedSection , setSelectedSection] = useState(null)

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
    const groupId = selectedOption ? selectedOption.value : "";
    setSelectedGroup(selectedOption);
  
    // Update formData state with new groupId
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, groupId };
  
      // Asynchronously fetch course cycles after updating formData
      fetchCourseCycles(updatedFormData);
  
      // Return updated formData to update state
      return updatedFormData;
    });
  };
  
  const fetchCourseCycles = async (formData) => {
    console.log(formData); // Logs the current state after update
  
    try {
      const responseCourseCycle = await axios.get(`${API}CourseCycle/GetCourseCyclesLessInfo`, {
        headers: {
          'CourseId': formData.courseId,
          'GroupId': formData.groupId,
        }
      });
  
      const courseCycles = responseCourseCycle.data;
      console.log(courseCycles);
      
      if (courseCycles && courseCycles.length > 0) {
        setCourseCycleId(courseCycles[0].id);
        fetchSections(courseCycles[0].id);
      } else {
        setCourseCycleId(null); // Clear the course cycle ID if no cycles are found
      }
  
    } catch (error) {
      console.error("Failed to fetch course cycles:", error);
      // Handle error appropriately here
    }
  };
  
  const fetchSections = async (courseCycleId) => {
    if (!courseCycleId) {
      console.log("No courseCycleId provided for fetching sections.");
      return;
    }
  
    try {
      const responseSections = await axios.get(`${API}Section/GetAllSectionsOfCourseCycle`, {
        headers: {
          'CourseCycleId': courseCycleId,
        }
      });
  
      console.log(responseSections.data);
      // Set the sections data in state or handle it accordingly
     setSections(responseSections.data)
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      // Handle error appropriately here
    }
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
    await fetchInstructorsByDepartment(selectedOption.value);
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

  const handleSectionSelectChange = async (selectedOption) => {
    const newSectionId = selectedOption ? selectedOption.value : "";

    // Update the selected section
    setSelectedSection(selectedOption);
    // Update form data with the new sectionId
    setFormData((prevFormData) => {
        const updatedFormData = {
            ...prevFormData,
            sectionId: newSectionId,
        };

        // Log the updated form data to check the new state
        console.log(updatedFormData);

        return updatedFormData;
    });

    // Log the selected section to check the new state
    console.log(selectedOption);
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

  const fetchInstructorsByDepartment = async (departementId) => {
    try {
      const response = await axios.get(
        `${API}Instructor/GetAllInstructorsLessInfoInDepartement`,
        {
          headers: {
            DepartementId: departementId,
          },
        }
      );
      console.log(departementId)
      // Update instructors state by concatenating first name and second name
      const formattedinstructors = response.data.map((instructor) => ({
        value: instructor.id,
        label: instructor.name,
      }));
      setInstructors(formattedinstructors);
      console.log(instructors)
    } catch (error) {
      console.error("Error fetching instructors:", error);
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
    console.log(formData);
    
    // Prepare the data to be sent
    const data = {
      name: formData.name,
      description: formData.description,
      courseCycleId: courseCycleId,
      instructorId: formData.instructorId,
    };
    console.log(data);
    console.log(formData.sectionId)

    // Prepare the headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Id': formData.sectionId, // Assuming sectionId is stored in formData
        }
    };

    try {
      // Send a PUT request with data in the body and sectionId in the header
      const response = await axios.put(`${API}Section/UpdateSection`, data, config);
      console.log(response.status);

      // Check for successful response
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
        <div className="">
          <div className=""> 

          <div className=" flex items-center gap-5 mb-10">
              <div className="flex min-w[550px]  flex-col text-sm items-center w-full ">
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
            
              <div className="flex min-w[550px] flex-col text-sm items-center w-full">
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
              <div className="flex min-w[550px] flex-col text-sm items-center w-full">
                <label htmlFor="Selectinstructor" className="mb-2">
                  instructor
                </label>
                <Select
                  className="w-full"
                  options={instructors}
                  closeMenuOnSelect={true}
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      instructorId: selectedOption.value,
                    });
                  }}
                />
              </div>
          </div>

          <div className="flex items-center gap-5 my-10">
              <div className="flex min-w[550px] flex-col text-sm items-center w-full">
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
            
              <div className="flex min-w[550px] flex-col text-sm items-center w-full">
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
            
              <div className="flex min-w[550px] flex-col text-sm items-center w-full">
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
                    selectedOption ? setSelectedCourse(selectedOption.value):""}}
                />
              </div>
          </div>
          <div className="flex gap-5 items-center my-10">
            <div className="flex min-w[550px] flex-col text-sm items-center w-full">
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

            <div className="flex min-w[550px] flex-col text-sm items-center w-full">
              <label htmlFor="SelectGroup" className="mb-2">
                Section
              </label>
              <Select
                className="w-full"
                options={sections.map((section) => ({
                  value: section.sectionId,
                  label: section.sectionName,
                }))}
                closeMenuOnSelect={true}
                onChange={handleSectionSelectChange}
                value={selectedSection}
              />
            </div>

            <div className="flex min-w[550px] flex-col text-sm items-center w-full">
              <label htmlFor="EditAcademicYear" className="mb-2">
                Section Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
  
            <div className="flex min-w[550px] flex-col text-sm items-center w-full">
              <label htmlFor="EditAcademicYear" className="mb-2">
                Section Description
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg outline-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            </div>

          </div>

  
          

        </div>
      </div>

      <Button
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-[#5eb1b1]"
        data-dialog-target="animated-dialog"
      >
        Update selected Section Data
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

export default UpdateSection;
