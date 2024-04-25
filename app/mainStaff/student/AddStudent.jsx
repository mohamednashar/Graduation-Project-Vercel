import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { postData } from "@/app/API/CustomHooks/usePost";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AddStudent = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    address: "",
    userName: "",
    gender: "male",
    email: "",
    birthDay: "",
    password: "",
    phoneNumber: "",
    gpa: "",
    departementId: "", // Moved to the end as it's last in the POST request body
    acadimicYearId: "",
    groupId: "",
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [groups, setGroups] = useState([]);

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

  const handleOpen = () => setOpen(!open);

  const handleFacultySelectChange = async (selectedOption) => {
    const facultyId = selectedOption ? selectedOption.value : "";

    await fetchDepartmentsByFaculty(facultyId);
  };

  const handleDepartmentSelectChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setFormData({
      ...formData,
      departementId: selectedOption ? selectedOption.value : "",
    });
    getAcademicYears(selectedOption?.value);
  };

  const handleGroupSelectChange = (selectedOption) => {
    setSelectedGroup(selectedOption);
    setFormData({
      ...formData,
      groupId: selectedOption ? selectedOption.value : "",
    });
    console.log(formData);
    getGroups(selectedOption?.value)

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
  const getAcademicYears = async (departementId) => {
    try {
      const response = await axios.get(`${API}AcadimicYear/GetAcadimicYears`, {
        headers: {
          DeptId: departementId,
        },
      });
      console.log(response.data);
      const years = response.data.map((year) => ({
        value: year.acadimicYearId,
        label: year.year,
      }));
      console.log("Years:", years); // Log transformed years
      setAcademicYears(response.data);

      return years; // Return the years
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getGroups = async (acadimicYearId) => {
    try {
      const response = await axios.get(`${API}Group/GetGroupsOfAcadimicYear`, {
        headers: {
          AcadimicYearId: acadimicYearId,
        },
      });
      console.log(response.data);
      const groups = response.data.map((group) => ({
        value: group.id,
        group: group.name,
      }));
      console.log("groups:", groups); // Log transformed groups
      setGroups(response.data);
      return groups; // Return the groups
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { departementId, gender, acadimicYearId, groupId, ...studentData } =
      formData;

    const isMale = gender === "male";

    const data = {
      id: studentData.id,
      firstName: studentData.firstName,
      secondName: studentData.secondName,
      thirdName: studentData.thirdName,
      fourthName: studentData.fourthName,
      address: studentData.address,
      userName: studentData.userName,
      gender: isMale,
      email: studentData.email,
      birthDay: new Date(studentData.birthDay).toISOString(),
      password: studentData.password,
      phoneNumber: studentData.phoneNumber,
      gpa: studentData.gpa,
      departementId: parseInt(departementId), // Ensure departementId is parsed to integer
      acadimicYearId: parseInt(acadimicYearId),
      groupId: parseInt(groupId),
    };
    console.log(data);

    try {
      const response = await axios.post(`${API}Student/CreateStudent`, data);
      console.log(response);
      setSuccessMessage("student created successfully.");
      setErrorMessage("");
      setOpen(true);
    } catch (error) {
      console.error("Error creating student:", error);
      setErrorMessage("Failed to create student. Please try again later.");
      setSuccessMessage("");
      setOpen(true);
    }
  };

  const handleAcademicYearSelectChange = (selectedOption) => {
    setSelectedAcademicYear(selectedOption);
    setFormData({
      ...formData,
      acadimicYearId: selectedOption ? selectedOption?.value : "",
    });
    console.log(formData);
    
    
    selectedOption ? getGroups(selectedOption.value):""
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-[90%] mx-auto"
    >

      <div className="bg-white p-5 flex flex-wrap justify-center gap-10 items-center rounded-lg shadow-md dark:bg-[#282828]">
  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="SelectFaculty" className="mb-2">
      Select Faculty
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

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="SelectDepartment" className="mb-2">
      Select Department
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

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="selectAcademicYear" className="mb-2">Academic Year</label>
    <Select
      id="selectAcademicYear"
      options={academicYears.map((academicYear) => ({
        value: academicYear.acadimicYearId,
        label: academicYear.year,
      }))}
      onChange={handleAcademicYearSelectChange}
      className="w-full"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="selectGroup" className="mb-2">Group</label>
    <Select
      id="selectGroup"
      options={groups.map((group) => ({
        value: group.id,
        label: group.name,
      }))}
      onChange={handleGroupSelectChange}
      className="w-full"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="id" className="mb-2">
      ID
    </label>
    <input
      type="text"
      name="id"
      value={formData.id}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="firstName" className="mb-2">
      First Name
    </label>
    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="secondName" className="mb-2">
      Second Name
    </label>
    <input
      type="text"
      name="secondName"
      value={formData.secondName}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="thirdName" className="mb-2">
      Third Name
    </label>
    <input
      type="text"
      name="thirdName"
      value={formData.thirdName}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="fourthName" className="mb-2">
      Fourth Name
    </label>
    <input
      type="text"
      name="fourthName"
      value={formData.fourthName}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="address" className="mb-2">
      Address
    </label>
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="userName" className="mb-2">
      Username
    </label>
    <input
      type="text"
      name="userName"
      value={formData.userName}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="gender" className="mb-2">
      Gender
    </label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="email" className="mb-2">
      Email
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="birthDay" className="mb-2">
      Date of Birth
    </label>
    <input
      type="date"
      name="birthDay"
      value={formData.birthDay}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="password" className="mb-2">
      Password
    </label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="phoneNumber" className="mb-2">
      Phone Number
    </label>
    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>

  <div className="flex flex-col text-sm items-center md:w-1/4">
    <label htmlFor="gpa" className="mb-2">
      GPA
    </label>
    <input
      type="text"
      name="gpa"
      value={formData.gpa}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
    />
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

export default AddStudent;