"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link
import ThemeChanger from "@/app/components/ThemeChanger";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}Authentication/ForgetPassword`,
        JSON.stringify(email),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        setSuccess("Email sent successfully");
        setError("");
      } else {
        setError("Invalid email");
        setSuccess("");
      }
    } catch (error) {
      setError("Invalid email");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-[#1e1e1e] p-5 rounded-t-2xl shadow-lg">
        <div className="flex justify-center items-center">
          <div className="bg-white w-10 h-10 dark:bg-[#1e1e1e]"></div>
          <svg
            className="w-10 h-10 mx-auto"
            viewBox="0 0 16 16"
            fill="#66bfbf"
            height="1em"
            width="1em"
          >
            <path
              fill="#66bfbf"
              d="M14 2v13H3.5a1.5 1.5 0 110-3H13V0H3C1.9 0 1 .9 1 2v12c0 1.1.9 2 2 2h12V2h-1z"
            />
            <path
              fill="#66bfbf"
              d="M3.501 13H3.5a.5.5 0 000 1H12.999v-1H3.501z"
            />
          </svg>
          <div className="bg-gray-200 px-2 py-2 rounded-xl dark:bg-gray-800">
            <ThemeChanger />
          </div>
        </div>
        <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Forgot Password
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-[#1e1e1e] p-5 rounded-b-2xl shadow-lg">
          <div className="space-y-6">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && (
              <div className="text-green-500 text-center">{success}</div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222]  shadow-sm border ring-gray-300 p-3 outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#66bfbf] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4e9999] transition-all duration-200"
              >
                Reset Password
              </button>
            </div>
            {/* Link to navigate to login page */}
            <div className="text-center">
              <Link
                href="/"
                className="text-sm hover:text-[#66bfbf] dark:text-gray-300 transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
