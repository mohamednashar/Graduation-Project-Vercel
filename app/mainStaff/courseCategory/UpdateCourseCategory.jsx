"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";
import { updateData } from "@/app/API/CustomHooks/useUpdate";

export default function UpdateFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if any of the input fields are empty
    if (
      inputValues.name.trim() === "" ||
      inputValues.description.trim() === ""
    ) {
      // Handle the case where any of the input fields are empty
      console.error("Please fill in all the fields");
      return; // Exit early if any field is empty
    }
  
    // Construct the body object with form data
    const body = {
      name: inputValues.name,
      description: inputValues.description,
      departementId: inputValues.departementId,
    };
  
    try {
      // Call the updateData function with form data and optional facultyId
      const status = await updateData("CourseCategory/UpdateCourseCategory", body, courseCategoryId);
      console.log(body);
      console.log(courseCategoryId);
  
      // Update modal state based on success or failure
      if (status === "success") {
        setOpen(true); // Open the modal
      } else {
        setOpen(false); // Close the modal if it was open
        console.error("Update failed"); // Log the error
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Optionally handle the error
    }
  };
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberOfFaculties: 0, // Update numberOfFaculties with the new value
    }));
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([

    {
      field: "courseCategoryName",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },
    {
      field: "courseCategoryDescription",
      filterOptions: ["contains", "startsWith", "endsWith"],

      filterParams: {
        defaultOption: "startsWith",
      },
    },
    {
      field: "departementName",
      headerName: "Department Name",
      filterOptions: ["contains", "startsWith", "endsWith"],
      filterParams: {
        defaultOption: "startsWith",
      },
    },

    {
      field: "facultyName",
      filterOptions: ["contains", "startsWith", "endsWith"],
      filterParams: {
        defaultOption: "startsWith",
      },
    },
  
   
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    const API =process.env.NEXT_PUBLIC_BACKEND_API

    fetch(`${API}CourseCategory/GetAllCourseCategories`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  const gridRef = useRef();
  
  const [inputValues , setInputValues] = useState({
    name:"",
    description:"",
    departementId:"",

  })

  const [courseCategoryId, setCourseCategoryId] = useState(null); 

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 1) {
      const selectedRow = selectedRows[0];
      setInputValues({
        name: selectedRow.name,
        description: selectedRow.description,
        departementId: selectedRow.departementId,
      });
      setCourseCategoryId(selectedRow.courseCategoryId); 
      handleOpen();
    }
  }, []);
  console.log(courseCategoryId)

  

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          Selection:
          <span id="selectedRows"></span>
        </div>

        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            pagination={true}
            paginationPageSize={100}
            paginationPageSizeSelector={[20, 50, 100]}
          />
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-[#282828]"
      >
        <DialogHeader className="dark:text-white">
          Update Faculty Data
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center gap-5 ">
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="Name"
                value={inputValues.name}
              />
              <input
                type="text"
                name="description"
                onChange={handleInputChange}
                className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="Description"
                value={inputValues.description}
              />

            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={ handleSubmit }>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
