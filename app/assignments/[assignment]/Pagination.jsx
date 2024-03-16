"use client"
import React, { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function Pagination() {
  const [active, setActive] = useState(1);
 
  const next = () => {
    if (active === 10) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 dark:text-[#66bfbf]" />
      </IconButton>
      <Typography  className="font-normal dark:text-[#66bfbf]">
        Page <strong className="text-gray-900 dark:text-[#66bfbf]">{active}</strong> of{" "}
        <strong className="text-gray-900 dark:text-[#66bfbf]">10</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4 dark:text-[#66bfbf]" />
      </IconButton>
    </div>
  );
}