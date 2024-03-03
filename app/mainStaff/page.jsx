"use client";
import { useState } from "react";

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
  "GPA",
  "Gender",
];

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    address: "",
    username: "",
    mail: "",
    password: "",
    dateOfBirth: "",
    phone: "",
    college: "",
    department: "",
    gpa: "",
    gender: "",
  });

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
    // Replace the following console log with your actual logic to send the data to the server
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
        <select
          name={name}
          id={id}
          value={formData[id]}
          onChange={handleInputChange}
          className="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        >
          {[1, 2, 3, 4].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="bg-white mx-5 md:mx-20 p-5 rounded-lg shadow-md flex flex-wrap justify-center lg:justify-between">
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
                index === 8 ? "date" : index === 13 ? "radio" : "text",
                label.toLowerCase()
              )
            )}
          </div>
        ))}
         
       
      </div>
      <button type="submit" className="bg-[#66bfbf] text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5">
          Submit
        </button>
      
    </form>
  );
};

export default Page;
