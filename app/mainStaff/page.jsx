"use client";
import { useState } from "react";

const Page = () => {
  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
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

  return (
    <div className="bg-white w-[80%] mx-auto p-5 rounded-[10px] dark:bg-[#282828]">
      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="firstName" class="mb-2 text-sm mr-5  w-[150px] text-center ">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white "
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="secondName "
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
          Second Name
        </label>
        <input
          type="text"
          id="secondName"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="thirdName "
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
          Third Name
        </label>
        <input
          type="text"
          id="thirdName"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="fourthName"
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
          Fourth Name
        </label>
        <input
          type="text"
          id="fourthName"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="address" class="mb-2 text-sm mr-5  w-[150px] text-center">
          Address
        </label>
        <input
          type="text"
          id="address"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="userName" class="mb-2 text-sm mr-5  w-[150px] text-center">
          Username
        </label>
        <input
          type="text"
          id="userName"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>
      <div className="flex items-center  pb-5 border-b-2 mb-7">
        <label class="mb-2 text-sm mr-5  w-[150px] text-center" for="gender">
          Gender
        </label>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxMale"
              id="male"
              value="male"
              checked={isMale}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" for="male">
              Male
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxFemale"
              id="female"
              value="female"
              checked={isFemale}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" for="female">
              Female
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="mail" class="mb-2 text-sm mr-5  w-[150px] text-center">
          Mail
        </label>
        <input
          type="email"
          id="mail"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="dateOfBirth"
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
          Date of birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="password" class="mb-2 text-sm mr-5  w-[150px] text-center">
          Password
        </label>
        <input
          type="password"
          id="password"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="phone" class="mb-2 text-sm mr-5  w-[150px] text-center">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label for="college" class="mb-2 text-sm mr-5  w-[150px] text-center">
          college
        </label>
        <select
          name="college"
          id="college"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="department"
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
          Department
        </label>
        <select
          name="department"
          id="department"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="flex items-center pb-5 border-b-2 mb-7">
        <label
          for="gpa"
          class="mb-2 text-sm mr-5  w-[150px] text-center"
        >
        GPA
        </label>
        <input
          type="text"
          id="gpa"
          class="w-full block p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs dark:bg-[#3f3f3f] dark:text-white"
        ></input>
      </div>
    </div>
  );
};

export default Page;
