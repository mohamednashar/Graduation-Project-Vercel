import React, { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import getData from "@/app/API/CustomHooks/useGet";
import { deleteData } from "@/app/API/CustomHooks/useDelete";

function DeleteDepartment() {
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  console.log(departmentId)

  const handleOpenDeleteAssistant = async () => {
    try {
      // Fetch department data if needed
      const data = await getData("Departement/GetDepartements");
      console.log("Department Data:", data);
      setOpenDeleteAssistant(!openDeleteAssistant);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const headers={'Content-Type': 'application/json',Id:departmentId}
  
      const bodyData = {
        "name": "mohamed",
        "studentServiceNumber": "01063977292",
        "profHeadName": "fodasfados",
        "facultyId": 1
      };
  
      // Send delete request
      await deleteData("Departement/DeleteDepartement", headers, bodyData);
  
      // Close the dialog and perform any other necessary actions
      setOpenDeleteAssistant(false);
      // You might want to refresh department data after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
      // Handle error here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
      // Optionally, you can show an error message to the user
      // alert("An error occurred while deleting the department. Please try again later.");
    }
  };
  

  return (
    <div>
      {/* Input for department ID */}
      <div className="flex items-center justify-center gap-5 bg-white dark:bg-[#282828] w-full md:w-[90%] mx-auto my-4 p-4">
        <label htmlFor="DepartmentCode" className="dark:text-white">Department ID</label>
        <input
          type="text"
          id="DepartmentCode"
          className="rounded-lg p-1 border-2 dark:text-white dark:bg-[#282828] outline-none"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />
      </div>

      {/* Button to open delete confirmation dialog */}
      <div className=" w-full md:w-[90%] mx-auto flex items-center justify-center">
        <button
          onClick={handleOpenDeleteAssistant}
          className="p-2 rounded-md bg-red-600 hover:bg-red-800 mx-w-[500px] text-white"
        >
          Delete Department
        </button>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteAssistant}
        handler={handleOpenDeleteAssistant}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-white dark:bg-[#282828]"
      >
        <DialogHeader className="text-red-800 font-bold">Delete Department</DialogHeader>
        <DialogBody className="text-lg text-red-600 font-bold">
          This Department will be deleted from your system. Are you sure about that?
        </DialogBody>
        <DialogFooter>
          {/* Cancel button */}
          <Button variant="text" color="red" onClick={handleOpenDeleteAssistant} className="mr-1">
            <span>Cancel</span>
          </Button>
          {/* Delete button */}
          <button
            className="bg-red-600 py-2 px-4 mx-2 hover:bg-red-900 transition-all duration-500 rounded-lg text-white font-semibold"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeleteDepartment;
