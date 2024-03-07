"use client"
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [userType , setUserType]=useState("student")
  const [isCheckedStudent, setIsCheckedStudent] = useState(true);
  const [isCheckedProf, setIsCheckedProf] = useState(false);
  const [isCheckedTeachingAssistant, setIsCheckedTeachingAssistant] = useState(false);
  const [isCheckedStaff, setIsCheckedStaff] = useState(false);


  const handleCheckboxChange = (event) => {
    const { name , checked} = event.target;
    switch (name) {
      case 'checkboxStudent':
        setIsCheckedStudent(true);
        setIsCheckedProf(false);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(false)
        setUserType("student")
        break;
      case 'checkboxProf':
        setIsCheckedStudent(false);
        setIsCheckedProf(true);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(false)
        setUserType("prof")
        break;
      case 'checkboxStaff':
        setIsCheckedStudent(false);
        setIsCheckedProf(false);
        setIsCheckedStaff(true);
        setIsCheckedTeachingAssistant(false)
        setUserType("staff")
        break;
      case 'checkboxTeachingAssistant':
        setIsCheckedStudent(false);
        setIsCheckedProf(false);
        setIsCheckedStaff(false);
        setIsCheckedTeachingAssistant(true)
        setUserType("TeachingAssistant")
        break;
      default:
        break;
    }
  };
  const routerPage = ()=>{
    if(isCheckedStudent) return "main"
    if(isCheckedProf) return "main"
    if(isCheckedStaff) return "mainStaff/student"
    if(isCheckedTeachingAssistant) return "main"

  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-5 rounded-t-2xl shadow-lg">
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

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-5 rounded-b-2xl shadow-lg">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-0 ring-gray-300 placeholder:text-gray-400 p-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-[#66bfbf] hover:text-[#f76b8a] transition-all duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 focus:ring-0 p-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Link href={routerPage()}>
              
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#66bfbf] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#f76b8a] transition-all duration-200 "
              >
                Log in
              </button>
            </Link>
          </div>
        </form>

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
            <label className="font-bold" for="prof">Prof</label>
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
            <label className="font-bold" for="TeachingAssistant">Assistant</label>
          </div>


          <div className="flex items-center gap-2">
            <input 
            type="radio" 
            name="checkboxStudent" 
            id="student" 
            value="student"   
            checked={isCheckedStudent}
            onChange={handleCheckboxChange} />
            <label className="font-bold" for="student">Student</label>
          </div>

          
          <div className="flex items-center gap-2">
            <input 
            type="radio" 
            name="checkboxStaff" 
            id="staff" 
            value="staff"  
            checked={isCheckedStaff}
            onChange={handleCheckboxChange} />
            <label className="font-bold" for="staff">Staff</label>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
