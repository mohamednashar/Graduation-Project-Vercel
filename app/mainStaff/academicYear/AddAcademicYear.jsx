import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { postData } from "@/app/API/CustomHooks/usePost";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AddAcademicYear = () => {
  const [formData, setFormData] = useState({
    year: "",
    departementId: "",
    facultyId: "",
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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
    setFormData({
      ...formData,
      facultyId: facultyId,
    });
    await fetchDepartmentsByFaculty(facultyId);
  };

  const handleDepartmentSelectChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setFormData({
      ...formData,
      departementId: selectedOption ? selectedOption.value : "",
    });
  };


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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.year.trim() === "") {
      setErrorMessage("Please fill in the required field.");
      setSuccessMessage("");
      return;
    }

    const data = {
      year: formData.year,
      departementId: formData.departementId,
    };

    const status = await postData("AcadimicYear/CreateAcadimicYear", data);
    console.log(data)

    status === 200
      ? (setSuccessMessage("Submitted Successfully"),
        setErrorMessage(""),
        setOpen(true))
      : (setErrorMessage("Failed to submit. Please try again later."),
        setSuccessMessage(""),
        setOpen(true));
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
      <div className="bg-white p-5 flex gap-14 rounded-lg shadow-md dark:bg-[#282828]">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
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

        <div className="flex flex-col text-sm items-center w-full">
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

        <div className="flex flex-col text-sm items-center w-full">
          <label htmlFor="year" className="mb-2">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
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

export default AddAcademicYear;
