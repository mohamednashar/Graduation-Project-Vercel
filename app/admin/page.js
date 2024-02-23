"use client";
import React, { useState } from "react";
import ThemeChanger from "../components/ThemeChanger";
import { useRouter } from "next/navigation";
const page = () => {


  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Uncheck the other checkbox when one is checked
    if (name === 'admin' && checked) {
      setIsUser(false);
    } else if (name === 'user' && checked) {
      setIsAdmin(false);
    }

    // Update the state of the clicked checkbox
    if (name === 'admin') {
      setIsAdmin(checked);
    } else if (name === 'user') {
      setIsUser(checked);
    }
  };

  const handleRoute = () => {
    if (isAdmin) {
      router.push('/admin');
    } else if (isUser) {
      router.push('/user');
    } else {
      // Handle default case or show an error
    }
  };


  return (
    <section className="bg-neutral-200 dark:bg-slate-900 flex justify-center  h-screen">
      <div className="container h-full p-24">
        <ThemeChanger />
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full ">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-slate-800">
              <div className="g-0 lg:flex lg:flex-wrap ">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-14">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <h4 className="mb-3 mt-1 pb-1 text-2xl font-bold text-[indigo-500] dark:text-slate-100">
                        Login To Your Account
                      </h4>
                    </div>
                    <div className="text-center">
                      <div className="border-2 border-[indigo-500] w-14 inline-block mb-10 text-center dark:border-slate-100"></div>
                    </div>

                    <form>
                      {/* <!--Username input--> */}
                      <div class="relative h-10 w-full mb-4">
                        <input
                          class="peer h-full w-full rounded-[7px]   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[indigo-500] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=""
                        />
                        <label class="text-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[indigo-500] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[indigo-500] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[indigo-500] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Email
                        </label>
                      </div>

                      {/* <!--Password input--> */}
                      <div class="relative h-10 w-full mb-4">
                        <input
                          class="peer h-full w-full rounded-[7px]   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[indigo-500] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=""
                        />
                        <label class="text-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[indigo-500] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[indigo-500] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[indigo-500] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Password
                        </label>
                      </div>

                      {/* <!--Checkboxes--> */}

                      <div className="flex flex-col gap-2 mb-3">


                        <div className="flex items-center">
                        <input className="mr-2 "  type="checkbox" name="admin" checked={isAdmin} onChange={handleCheckboxChange} />
                        <p className="text-[indigo-500] font-bold dark:text-slate-100">Admin</p>
                        </div>

                        <div className="flex items-center">
                        <input className="mr-2"   type="checkbox" name="user" checked={isUser} onChange={handleCheckboxChange} />
                        <p className="text-[indigo-500] font-bold dark:text-slate-100">User</p>
                        </div>

                      </div>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="bg-[indigo-500] dark:!bg-slate-500 mb-3 inline-block w-full rounded-lg px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="button"
                          onClick={handleRoute}
                        >
                          Log in
                        </button>

                        {/* <!--Forgot password link--> */}
                        <a
                          href="#!"
                          className="    hover:text-[indigo-500] text-gray-500 "
                        >
                          Forgot password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-[indigo-500] dark:bg-slate-500">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
