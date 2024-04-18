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

var filterParams = {
  maxNumConditions: 1,
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

export default function UpdateFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    studentServiceNumber: "",
    numOfYears: 0,
    profHeadName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    setFormData({ ...formData, [name]: value });
  };

  const handleFacultyNamesChange = (event) => {
    const { name, value } = event.target;
    const FacultyNames = [...formData.FacultyNames];
    FacultyNames[parseInt(name)] = value;
    setFormData({ ...formData, FacultyNames });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if any of the input fields are empty
    if (
      inputValues.name.trim() === "" ||
      inputValues.studentServiceNumber.trim() === "" ||
      isNaN(inputValues.numOfYears) ||
      inputValues.profHeadName.trim() === ""
    ) {
      // Handle the case where any of the input fields are empty
      console.error("Please fill in all the fields");
      return; // Exit early if any field is empty
    }
  
    // Construct the body object with form data
    const body = {
      name: inputValues.name,
      studentServiceNumber: inputValues.studentServiceNumber,
      numOfYears: inputValues.numOfYears,
      profHeadName: inputValues.profHeadName,
    };
  
    try {
      // Call the updateData function with form data and optional facultyId
    const status =   await updateData("Faculty/UpdateFaculty", body, inputValues.id);
      console.log(status);
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
      field: "name",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },
    {
      field: "studentServiceNumber",
      filterParams: {
        maxNumConditions: 10,
      },
    },
    {
      field: "numOfYears",
      filter: "agNumberColumnFilter",
      filterParams: {
        numAlwaysVisibleConditions: 2,
        defaultJoinOperator: "OR",
      },
    
    },
    {
      field: "profHeadName",
      filterParams: filterParams,
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

    fetch(`${API}Faculty/GetFaculties`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  const gridRef = useRef();
  
  const [inputValues , setInputValues] = useState({
    id : "",
    name:"",
    studentServiceNumber:"",
    numOfYears:"",
    profHeadName:""

  })
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].name : "";
      setInputValues({
        id : selectedRows[0].facultyId ,
        name:selectedRows[0].name ,
        studentServiceNumber : selectedRows[0].studentServiceNumber ,
        numOfYears: selectedRows[0].numOfYears ,
        profHeadName : selectedRows[0].profHeadName ,
      })
    console.log(selectedRows);
    selectedRows.length === 1 && 
    handleOpen();
  }, []);

  

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
                className="rounded-md p-2       border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="College"
                value={inputValues.name}
              />
              <input
                type="number"
                name="studentServiceNumber"
                onChange={handleInputChange}
                className="rounded-md p-2       border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="Student service number"
                value={inputValues.studentServiceNumber}
              />
              <input
                type="number"
                name="numOfYears"
                onChange={handleInputChange}
                className="rounded-md p-2       border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="Number of Years"
                value={inputValues.numOfYears}
              />

              <input
                type="text"
                name="profHeadName"
                onChange={handleInputChange}
                className="rounded-md p-2       border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                placeholder="Prof headName"
                value={inputValues.profHeadName}
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
