"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
  Icon11,

} from "./icons";



const menuItems = [
  { id: 1, label: "Add student", icon: Icon1, link: "/mainStaff" },
  { id: 2, label: "Add prof", icon: Icon2, link: "/mainStaff/addProf" },
  { id: 3, label: "Add teaching assistant", icon: Icon4, link: "/mainStaff/addTeachingAssistant" },
  {
    id: 5,
    label: "addCourse",
    icon: Icon3,
    link: "/mainStaff/addCourse",
  },


  { id: 5, label: "Search for a student", icon: Icon4, link: "/mainStaff/searchStudent" },
  {
    id: 6,
    label: "Search for a prof",
    icon: Icon5,
    link: "/mainStaff/searchProf",
  },
  {
    id: 6,
    label: "Search for a teaching assistant",
    icon: Icon5,
    link: "/mainStaff/searchTeachingAssistant",
  },

 
];


function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () =>
      menuItems.find((menu) => menu.link === router.pathname) || menuItems[0], // Use the first item as a default
    [router.pathname]
  );
  const wrapperClasses =
    "h-screen px-2 pb-4 bg-light flex justify-between flex-col " +
    (toggleCollapse ? "w-24" : "w-[21rem]");

  const collapseIconClasses =
  !toggleCollapse?"p-4 rounded absolute right-0 mt-12 " 
    :"rotate-180 "

  const getNavItemClasses = (menu) =>
    "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap " +
    (activeMenu.id === menu.id ? "bg-light-lighter" : "");

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const path = usePathname();
  let activeLink = path.slice(0);


  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-between relative ">
        <div className="flex items-center pl-1 gap-4 border-b-2 pb-2 mt-2">
          

            {!toggleCollapse && (
              <p className="text-[#156585] font-semibold text-sm">
                MR Finconsulting GmbH
              </p>
            )}
          </div>
          
        </div>
        
        <div className="flex flex-col items-start">

        <div className="flex justify-center m-3 items-center gap-4 ">
        
              <img
                src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded-full w-12 h-12 object-cover"
              />
            
              {!toggleCollapse&&<p className="font-bold text-[#265E73]">Mohamed Alaa</p>}

              
            </div>
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu);
            return (
              
               
              <Link
                key={index}
                href={menu.link}
                className={`flex items-center w-full h-14 px-3 text-[#265E73]   ${
                  activeLink === menu.link && !toggleCollapse
                    ? "border-2 border-[#3AB3B3]"
                    : ""
                } mt-2 rounded-[15px] text-[#265E73 

                ${toggleCollapse&&"border-none"}

                ${
                  menu.link==="/Neukunde/Allgemeine-Angaben"&&activeLink.startsWith("/Neukunde")
                  ? "border-2 border-[#3AB3B3]"
                  : ""
                }
                ${
                  !toggleCollapse
                    ? "transition-all  duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                    : "border-none"
                }

                ${
                  menu.link==="/Auftragsubersicht/Wiederkehrende-Leistungen" &&activeLink.startsWith("/Auftragsubersicht")
                  ? "border-2 border-[#3AB3B3]"
                  : ""
                }

                ${
                  menu.link==="/ClientChecklisten/Finanzbuchhaltung" &&activeLink.startsWith("/ClientChecklisten")
                  ? "border-2 border-[#3AB3B3]"
                  : ""
                }

                ${
                  menu.link==="/Nachricht-schreiben/Finanzbuchhaltung" &&activeLink.startsWith("/Nachricht-schreiben")
                  ? "border-2 border-[#3AB3B3]"
                  : ""
                }

                `
              }
              >
                <div
                  id="x"
                  className={` p-2 rounded-[12px] mr-2  ${
                    
                    index === 0
                      ? "first:bg-[#4FD1C5] p-2 rounded-[12px]"
                      : " p-2 rounded-[12px]  "
                  }

                  ${toggleCollapse&& activeLink === menu.link ? "border-2 border-[#4FD1C5]" : ""  }`
                
                }
                >
                  <Icon/>
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
