"use client";

import React from "react";
import Sidebar from "../components/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="flex flex-col w-full mt-5">{children}</div>
    </div>
  );
}

export default Layout;
