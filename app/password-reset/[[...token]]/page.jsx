"use client"
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ThemeChanger from "@/app/components/ThemeChanger";
import { useSearchParams } from "next/navigation";
const API = process.env.NEXT_PUBLIC_BACKEND_API;

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send a POST request to the endpoint with the form data
      await axios.post(`${API}Authentication/ResetPassword`, {
        email: email,
        password: newPassword,
        passwordConfirm: confirmPassword,
        token: token,
      });

      // Clear the form fields after successful submission
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      // Set success message
      setSuccessMessage("Password updated successfully.");
      setError(""); // Clear any previous error messages
    } catch (error) {
      // Handle errors, such as displaying error messages to the user
      console.error("Password reset failed:", error);
      setError("Password reset failed.");
      setSuccessMessage(""); // Clear any previous success messages
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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Reset Your Password
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-[#1e1e1e] p-5 rounded-b-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-center">{error}</div>}
          {error ? null : (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222] shadow-sm border ring-gray-300 placeholder:text-gray-400 p-3 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222] shadow-sm border ring-gray-300 placeholder:text-gray-400 p-3 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222] shadow-sm border ring-gray-300 placeholder:text-gray-400 p-3 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#66bfbf] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4e9999] transition-all duration-200"
            >
              Reset Password
            </button>
          </div>
          <div className="text-center mt-2">
            <Link
              href="/"
              className="text-sm text-[#66bfbf] dark:text-gray-100 hover:text-[#4e9999] dark:hover:text-[#4e9999] transition-all duration-200"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
