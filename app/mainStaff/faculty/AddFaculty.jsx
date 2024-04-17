"use client";
import { postData } from "@/app/API/CustomHooks/usePost";
import { useState } from "react";

const labels = ["Name", "Student service number", "Num of years", "Prof head Name"];
const keys = ["name", "studentServiceNumber", "numOfYears", "profHeadName"];

const initialFormData = keys.reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {});

const AddFaculty = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [formError, setFormError] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = keys.filter(key => key !== "profHeadName");
    const allFieldsFilled = requiredFields.every(key => formData[key]);
    if (allFieldsFilled) {
      try {
        console.log(formData)
        await postData( "Faculty/CreateFaculty" , formData);
        setSavedData([...savedData, formData]);
        setFormData(initialFormData);
        setFormError(false);
        console.log("Form Data:", formData);
      } catch (error) {
        console.error("Failed to post data:", error.message);
        setFormError(true);
      }
    } else {
      setFormError(true);
    }
  };

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
        required={key !== "profHeadName"}
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
            {index === 1 || index === 2
              ? renderInput(label, "number", keys[index])
              : renderInput(label, "text", keys[index])}
          </div>
        ))}
      </div>

      {formError && (
        <p className="text-red-500 text-center mt-2">All fields are required except Prof head Name.</p>
      )}

      <button
        onClick={handleOpen}
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-[#f76b8a]"
        data-dialog-target="animated-dialog"
      >
        Submit
      </button>

      <div>
        {savedData.map((data, index) => (
          <div key={index}>{JSON.stringify(data)}</div>
        ))}
      </div>
    </form>
  );
};

export default AddFaculty;
