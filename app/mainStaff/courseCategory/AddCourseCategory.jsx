"use client";
import { postData } from "@/app/API/CustomHooks/usePost";
import { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

const labels = [
  "Course Category Name",
  "Course Category Description",
  "Department ID",
];
const keys = ["name", "description", "departementId"];

const initialFormData = keys.reduce((acc, key) => {
  acc[key] = key === 'departementId' ? null : ""; // Initialize departmentId as null
  return acc;
}, {});

const AddCourseCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.description.trim() === "" ||
      formData.departementId.trim() === ""
    ) {
      setErrorMessage("Please fill in all the required fields.");
      setSuccessMessage("");
      return; // Exit the function early if any field is empty
    }

    const status = await postData("CourseCategory/CreateCourseCategory", formData);
    if (status === 200) {
      setSuccessMessage("Submitted Successfully");
      setErrorMessage("");
      setOpen(true); // Open the success dialog
    } else {
      setErrorMessage("Failed to submit. Please try again later.");
      setSuccessMessage("");
      setOpen(true); // Open the error dialog
    }
  };

  console.log(formData)

  const renderInput = (label, type, key) => (
    <div className="flex flex-col items-center pb-5" key={label}>
      <label
        htmlFor={key}
        className="mb-2 text-sm mr-5 w-[150px] md:w-[250px] text-center dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={key}
        value={formData[key]}
        onChange={(event) => handleInputChange(event, key)}
        className="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#282828] dark:text-white"
        required={key !== "departementId"}
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-[90%] mx-auto"
    >
      <div className="bg-white dark:bg-[#282828] p-5 rounded-lg shadow-md flex flex-wrap justify-center lg:justify-between">
        {labels.map((label, index) => (
          <div key={index} className="">
            {renderInput(label, "text", keys[index])}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-[#f76b8a]"
      >
        Submit
      </button>

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
          {/* Modal content */}
          <div className=" text-center bg-white rounded-lg dark:bg-gray-800 p-5">
            <button
              onClick={handleOpen}
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Continue
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </form>
  );
};

export default AddCourseCategory;
