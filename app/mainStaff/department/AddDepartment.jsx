import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { postData } from "@/app/API/CustomHooks/usePost";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    studentServiceNumber: "",
    professorHeadName: ""
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [faculties, setFaculties] = useState([]);

  
  useEffect(() => {
    // Fetch faculties when component mounts
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(`${API}Faculty/GetFaculties`);
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []); // Empty dependency array ensures this effect runs only once


  const handleOpen = () => setOpen(!open);

const handleSubmit = async (event) => {
  event.preventDefault();

  // Check if any of the required fields are empty
  if (
    formData.departmentName.trim() === "" ||
    formData.studentServiceNumber.trim() === "" ||
    formData.professorHeadName.trim() === ""
  ) {
    setErrorMessage("Please fill in all the required fields.");
    setSuccessMessage("");
    return; // Exit the function early if any field is empty
  }



  const status=await postData("Departement/CreateDepartement", {
    name: formData.departmentName,
    studentServiceNumber: formData.studentServiceNumber,
    profHeadName: formData.professorHeadName,
    facultyId: formData.facultyId
  })

  {status === 200
  ? (
      setSuccessMessage("Submitted Successfully"),
      setErrorMessage(""),
      setOpen(true) // Open the success dialog
    )
  : (
      setErrorMessage("Failed to submit. Please try again later."),
      setSuccessMessage(""),
      setOpen(true) // Open the error dialog
    );}


 
};


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSelectChange = (selectedOption) => {
  // Extract facultyId from the selected option
  const facultyId = selectedOption ? selectedOption.value : ""; // Use selectedOption.value if selectedOption exists, otherwise set it to an empty string
  setFormData({
    ...formData,
    facultyId: facultyId
  });
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[90%] mx-auto">
      <div className="bg-white p-5 rounded-lg shadow-md">

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="SelectFaculty" className="mb-2">Select Faculty</label>

          <Select
            className="w-full md:w-80"
            options={faculties.map(faculty => ({
              value: faculty.facultyId,
              label: faculty.name
            }))}
            closeMenuOnSelect={true} 
            onChange={handleSelectChange}
          />


        </div>


        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex flex-col text-sm items-center w-full">
            <label htmlFor="departmentName" className="mb-2">
              Department Name{" "}
              {formData.departmentName.trim() === "" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-col text-sm items-center w-full">
            <label htmlFor="studentServiceNumber" className="mb-2">
              Student Service Number{" "}
              {formData.studentServiceNumber.trim() === "" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <input
              type="text"
              name="studentServiceNumber"
              value={formData.studentServiceNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-col text-sm items-center w-full">
            <label htmlFor="professorHeadName" className="mb-2">
              Professor Head Name{" "}
              {formData.professorHeadName.trim() === "" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <input
              type="text"
              name="professorHeadName"
              value={formData.professorHeadName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
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
            {successMessage && <p className="mb-4 text-lg font-semibold text-gray-900">{successMessage}</p>}
            {errorMessage && <p className="mb-4 text-lg font-semibold text-red-600">{errorMessage}</p>}
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

export default AddDepartment;
