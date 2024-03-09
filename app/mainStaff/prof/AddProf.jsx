"use client";
import { Transition } from "@headlessui/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import Select from "react-select";

const labels = [
  "First Name",
  "Second Name",
  "Third Name",
  "Fourth Name",
  "Address",
  "Username",
  "Mail",
  "Password",
  "Date of Birth",
  "Phone",
  "College",
  "Department",
  "Gender",
];

const AddProf = () => {
  const [formData, setFormData] = useState({});

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const collegeOptions = [
    "College A",
    "College B",
    "College C",
    "College D",
  ].map((option) => ({
    value: option,
    label: option,
  }));

  const departmentOptions = [
    "Department X",
    "Department Y",
    "Department Z",
  ].map((option) => ({
    value: option,
    label: option,
  }));

  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setFormData({ ...formData, gender: name });
    switch (name) {
      case "checkboxMale":
        setIsMale(true);
        setIsFemale(false);
        break;
      case "checkboxFemale":
        setIsMale(false);
        setIsFemale(true);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const renderInput = (label, type, id, name = null) => (
    <div className="flex flex-col items-center pb-5" key={label}>
      <label
        htmlFor={id}
        className="mb-2 text-sm mr-5 w-[150px] md:w-[250px] text-center"
      >
        {label}
      </label>
      {type === "select" ? (
        <Select
          className="w-[150px] md:w-[250px]"
          id={id}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (selectedOption) => selectedOption.value
            );
            setFormData((prevFormData) => {
              return { ...prevFormData, [id]: selectedValues };
            });
          }}
          options={
            id === "college"
              ? collegeOptions
              : id === "department"
              ? departmentOptions
              : []
          }
          isMulti
          closeMenuOnSelect={false}
        />
      ) : type === "radio" ? (
        <div className="flex items-center">
          <input
            type="radio"
            id={id + "Male"}
            name={id}
            checked={isMale && name === "checkboxMale"}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor={id + "Male"} className="mr-5">
            Male
          </label>
          <input
            className="mr-2"
            type="radio"
            id={id + "Female"}
            name={id}
            checked={isFemale && name === "checkboxFemale"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={id + "Female"}>Female</label>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          value={formData[id]}
          onChange={handleInputChange}
          className="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-[90%] mx-auto ">
      <div className="bg-white p-5 rounded-lg shadow-md flex flex-wrap justify-center lg:justify-between">
        {labels.map((label, index) => (
          <div key={index} className="">
            {index === labels.length - 1 ? (
              <div className="flex flex-col items-center pb-5" key={label}>
                <label className="mb-2 text-sm mr-5 w-[150px] md:w-[250px] text-center">
                  Gender
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="checkboxMale"
                    name="checkboxMale"
                    checked={isMale}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor="checkboxMale" className="mr-5">
                    Male
                  </label>
                  <input
                    className="mr-2"
                    type="radio"
                    id="checkboxFemale"
                    name="checkboxFemale"
                    checked={isFemale}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="checkboxFemale">Female</label>
                </div>
              </div>
            ) : (
              renderInput(
                label,
                index === 8
                  ? "date"
                  : index === 13
                  ? "radio"
                  : index === 10 || index === 11
                  ? "select"
                  : "text",
                label.toLowerCase()
              )
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={handleOpen}
        type="submit"
        className="font-bold text-lg bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-[#f76b8a]"
        data-dialog-target="animated-dialog"
      >
        Submit
      </Button>

      <Dialog
        className="!w-96"
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
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Submitted Successfully
            </p>
            <button
              onClick={handleOpen}
              class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Continue
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </form>
  );
};

export default AddProf;
