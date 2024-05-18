"use client"
import Link from "next/link";
import { useState } from "react";
import ThemeChanger from "../components/ThemeChanger";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const [isCheckedStudent, setIsCheckedStudent] = useState(true);
  const [isCheckedProf, setIsCheckedProf] = useState(false);
  const [isCheckedTeachingAssistant, setIsCheckedTeachingAssistant] = useState(false);
  const [isCheckedStaff, setIsCheckedStaff] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying error message
  const router = useRouter();
  
  const { data: session } = useSession();

  // if (session) {
  //   router.push('/main');
  //   return null; 
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform your form validation here if needed

    const signInResponse = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false, // We handle redirect manually
    });

    if (signInResponse?.error) {
      // Handle authentication error
      setError("Invalid username, password, or role");
      return;
    }

    let redirectUrl = "/main";

    switch (userType) {
      case "student":
        redirectUrl = "/main"; // Redirect students to main page
        break;
      case "prof":
        redirectUrl = "/main"; // Redirect professors to mainprof page
        break;
      case "staff":
        redirectUrl = "/mainstaff/faculty"; // Redirect staff to mainstaff page
        break;

      default:
        break;
    }

    // Redirect the user to the appropriate page
    router.push(redirectUrl);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "checkboxStudent":
        setIsCheckedStudent(true);
        setIsCheckedProf(false);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(false);
        setUserType("student");
        break;
      case "checkboxProf":
        setIsCheckedStudent(false);
        setIsCheckedProf(true);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(false);
        setUserType("prof");
        break;
      case "checkboxStaff":
        setIsCheckedStudent(false);
        setIsCheckedProf(false);
        setIsCheckedStaff(true);
        setIsCheckedTeachingAssistant(false);
        setUserType("staff");
        break;
      case "checkboxTeachingAssistant":
        setIsCheckedStudent(false);
        setIsCheckedProf(false);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(true);
        setUserType("TeachingAssistant");
        break;
      default:
        break;
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
            {" "}
            <ThemeChanger />{" "}
          </div>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Log in to your account
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-[#1e1e1e] p-5 rounded-b-2xl shadow-lg">
        <div className="space-y-6">
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222]  shadow-sm border ring-gray-300 placeholder:text-gray-400 p-3 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/forgotPassword"
                  className="font-semibold text-[#66bfbf] dark:text-gray-100 hover:text-[#4e9999] dark:hover:text-[#4e9999] transition-all duration-200 "
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md py-1.5 text-gray-900 dark:text-gray-100 dark:bg-[#222222]  shadow-sm border ring-gray-300 placeholder:text-gray-400 p-3 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#66bfbf] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4e9999] transition-all duration-200 "
            >
              Log in
            </button>
          </div>
        </div>
        <div
          id="x"
          className="mt-10 text-center text-sm mb-5 flex justify-center gap-4 items-center text-[#66bfbf]"
        >
          {/* Add labels for Prof, Student, and Staff */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxProf"
              id="prof"
              value="prof"
              checked={isCheckedProf}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" htmlFor="prof">
              Prof
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxTeachingAssistant"
              id="TeachingAssistant"
              value="TeachingAssistant"
              checked={isCheckedTeachingAssistant}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" htmlFor="TeachingAssistant">
              Assistant
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxStudent"
              id="student"
              value="student"
              checked={isCheckedStudent}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" htmlFor="student">
              Student
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="checkboxStaff"
              id="staff"
              value="staff"
              checked={isCheckedStaff}
              onChange={handleCheckboxChange}
            />
            <label className="font-bold" htmlFor="staff">
              Staff
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
