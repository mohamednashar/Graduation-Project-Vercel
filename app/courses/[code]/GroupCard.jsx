"use client";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const GroupCard = ({ group }) => {
  const path = usePathname();

  return (
    <div className="flex flex-col bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md m-6 overflow-hidden w-80 lg:w-52">
      <div className="my-3 flex justify-center items-center mx-auto bg-gray-100 dark:bg-gray-800 w-11 h-11 rounded-full">
        <FontAwesomeIcon
          className="text-2xl"
          icon={faPeopleGroup}
          color="#66bfbf"
        />
      </div>
      <h2 className="text-center px-2 pb-5 dark:text-gray-100">
        Group {group}
      </h2>
      <Link
        href={`${path}/${group}`}
        className="font-semibold bg-[#66bfbf] text-white p-3 text-center hover:bg-[#57a3a3] transition-all duration-300"
      >
        Enter
      </Link>
    </div>
  );
};

export default GroupCard;
