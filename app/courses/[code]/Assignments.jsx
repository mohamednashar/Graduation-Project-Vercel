"use client"
import React from 'react'
import AssignmentIcon from '../Icons/AssignmentIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function Assignments() {
  const pathname = usePathname()
  let modifiedLink = pathname.replace("courses", "assignments");
  return (
    <div className='mx-auto md:w-[90%] p-5 my-5'>
      <Link className='flex items-center justify-between gap-3 shadow-lg text-lg bg-white dark:bg-[#282828] p-5 my-1  dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#242424]' href={`${modifiedLink}`}>      
      <div className='flex items-center gap-5'>
        <AssignmentIcon/>
          <span>Assignment lecture 1 C#</span>
      </div>
        <div>
          <span>10 points</span>
        </div>
    </Link>

  
    
      
    </div>
  )
}

export default Assignments