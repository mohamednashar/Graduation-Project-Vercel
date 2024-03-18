"use client"
import React, { useState } from 'react'
import Pagination from './Pagination'
import TableAssignments from './TableAssignment'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';

function Prof({params}) {
  const [openAddAssignment, setOpenAddAssignment] = useState(false);
 
  const handleOpenAddAssignment = () => setOpenAddAssignment(!openAddAssignment);

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Do something with the selected file
    console.log('Selected file:', file);
  };
  return (
    <div className="">
      <TableAssignments/>

    <div className='flex items-center justify-center my-10'>
        <button onClick={handleOpenAddAssignment} className="bg-[#66bfbf] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#529d9d] transition-all duration-200">
          Add new Assignment
        </button>
    </div>
      <Dialog open={openAddAssignment}
        handler={handleOpenAddAssignment}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className='dark:bg-[#282828]'>

<DialogHeader className='dark:text-white'>Add new Assignment</DialogHeader>
<DialogBody>
  <div className="mx-auto w-full max-w-[550px] ">
    <form action="https://formbold.com/s/FORM_ID" method="POST">
      <div className="mb-5">
        <label
          for="subject"
          className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Subject Or chapter"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
        />
      </div>
      <div className="mb-5">
        <label
          for="name"
          className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
        >
          Assignment Details
        </label>
        <textarea
          rows="5"
          name="Assignment Details"
          id="Assignment Details"
          placeholder="Assignment Details"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
        />
      </div>
      <div className="mb-5">
        <label
          for="deadline"
          className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
        >
          Assignment deadline
        </label>
        <input
          type="date"
          name="deadline"
          id="deadline"
          placeholder="deadline"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
        />
      </div>

      <div className="mb-5">
        <label
          for="deadline"
          className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
        >
          Points Assignment
        </label>
        <input
          type="number"
          name="Points"
          id="Points"
          placeholder="Points"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-[#3f3f3f] dark:text-white"
        />
      </div>

      <label htmlFor="fileInput" className="relative cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Upload File
      <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
    </label>
      
      
    </form>
  </div>
  </DialogBody>

  <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenAddAssignment}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <div>
        <button
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Add new Assignment
        </button>
      </div>
        </DialogFooter>
  </Dialog>



</div>
  )
}

export default Prof