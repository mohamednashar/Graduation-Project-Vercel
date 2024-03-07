"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,

} from "./icons";



const menuItems = [
  { id: 1, label: "Student", icon: Icon1, link: "/mainStaff/student" },
  { id: 2, label: "Prof", icon: Icon2, link: "/mainStaff/prof" },
  { id: 3, label: "Assistant", icon: Icon3, link: "/mainStaff/assistant" },
  {
    id: 4,
    label: "Course",
    icon: Icon4,
    link: "/mainStaff/course",
  },


  {
    id: 5,
    label: "Logout",
    icon: Icon8,
    link: "/mainStaff/searchTeachingAssistant",
  },

 
];


function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const wrapperClasses =
    "h-screen px-4 pb-4 bg-white flex justify-between flex-col  " +
    (toggleCollapse ? "w-24" : "w-80");


  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const path = usePathname();
  let activeLink = path.slice(0);

  const updateToggleCollapse = () => {
    const isSmallScreen = window.innerWidth <= 900; // You can adjust the breakpoint as needed
    setToggleCollapse(isSmallScreen);
  };

  useEffect(() => {
    updateToggleCollapse();
    window.addEventListener('resize', updateToggleCollapse);
    return () => {
      window.removeEventListener('resize', updateToggleCollapse);
    };
  }, []);


  return (
    <div
    className={wrapperClasses + ' rounded-r-2xl shadow-lg'}

      style={{ transition: "width 350ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
      <div className={`flex items-center text-center ${!toggleCollapse ? '' : 'justify-center'} border-b-2 mb-2 mt-2 pb-2`}>        <div className="flex items-center pl-1 gap-2  pb-2 mt-2">
            <button onClick={handleSidebarToggle}>
            <svg
                    className="w-8 h-8 "
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
            </button>

            {!toggleCollapse && (
              <p className="text-[#265E73] font-semibold text-sm">
                Education Platform
              </p>
            )}
          </div>
          
        </div>
        
        <div className="flex flex-col items-start">

          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            return (
              
               
              <Link
                key={index}
                href={menu.link}
                className={`flex items-center w-full h-12 px-3 text-[#265E73]   ${
                  activeLink === menu.link && !toggleCollapse
                    ? " bg-[#66bfbf] text-white"
                    : ""
                } mt-2 rounded-[15px] text-[#265E73 


                ${
                  !toggleCollapse
                    ? "transition-all  duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                    : "border-none"
                }

                `
              }
              >
                <div
                 
                  className={` p-2 rounded-[12px] mr-2
                 

                  ${!toggleCollapse&& activeLink === menu.link ? "bg-white" : "bg-[#66bfbf]"}`
                
                }
                >
                  <Icon fill={activeLink === menu.link ? '#66bfbf' : '#ffffff'} />
                </div>
                {!toggleCollapse && (
                  <span className={"text-sm font-medium text-text-light"}>
                    {menu.label}
                  </span>
                )}
              </Link>

      
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
