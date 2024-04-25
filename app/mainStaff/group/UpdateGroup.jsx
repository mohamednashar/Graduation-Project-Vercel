"use client";
import axios from "axios";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select";

import getData from "@/app/API/CustomHooks/useGet";

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

export default function UpdateGroup() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },

    {
      field: "studentHeadName",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },

    {
      field: "studentHeadPhone",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },

    {
      field: "numberOfStudent",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },

    {
      field: "year",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


  };

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [groups, setGroups] = useState([]);
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    studentHeadName: "",
    studentHeadPhone: 0,
    numberOfStudent: 0,
    departementId:0,

  });
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("Faculty/GetFaculties");
        console.log(data);
        setFaculties(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchDepartmentsByFaculty = async (facultyId) => {
    try {
      const response = await axios.get(
        `${API}Departement/GetDepartementsOfFaculty`,
        {
          headers: {
            FacultyId: facultyId,
          },
        }
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleFacultyChange = (option) => {
    setSelectedFaculty(option);
    setSelectedDepartment(null);
    setFormData({ ...formData, departementId: 0, acadimicYearId: 0 });
    fetchDepartmentsByFaculty(option.value);
    console.log(option.value);
  };

  const handleDepartmentChange = async (option) => {
    option ? setSelectedDepartment(option?.value) : ""
    setFormData({ ...formData, departementId: selectedDepartment});
    console.log(formData)
  };

  const handleOpenDeleteAssistant = () =>
    setOpenDeleteAssistant(!openDeleteAssistant);

  const fetchGridData = useCallback(async (academicYearId) => {
    if (!academicYearId) {
      return; // Exit if no academic year is selected
    }
    const apiUrl = `${API}Group/GetGroupsOfDepartement`;
    const config = {
      headers: {
        DepartementId: selectedDepartment,
      },
    };
    try {
      const response = await axios.get(apiUrl, config);
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }, []);

  useEffect(() => {
    // Initially load or reload data when academic year changes
    fetchGridData(selectedDepartment);
  }, [selectedDepartment, fetchGridData]);
  const onGridReady = useCallback((params) => {
    gridRef.current = params.api;  // Make sure this line is correct
    fetchGridData(selectedDepartment);
  }, [fetchGridData, selectedDepartment]);
  

  const gridRef = useRef();

  const onRowSelected = useCallback((event) => {
    if (event.node.isSelected()) {
      const selectedRowData = event.data;
      setFormData({
        name: selectedRowData.name,
        studentHeadName: selectedRowData.studentHeadName,
        studentHeadPhone: selectedRowData.studentHeadPhone,
        numberOfStudent: selectedRowData.numberOfStudent,
      });
      setOpen(true); // Open the dialog
    }
  }, []);

  const handleUpdate = () => {


    if (gridRef.current) {
      const selectedRows = gridRef.current.getSelectedRows();
      if (selectedRows.length > 0) {
        const selectedRow = selectedRows[0];
        setFormData({ ...formData, acadimicYearId: selectedRow.acadimicYearId });
        console.log(formData)

        
    const reorderedData = {
    
      name: formData.name,
      studentHeadName: formData.studentHeadName,
      studentHeadPhone: formData.studentHeadPhone,
      numberOfStudent: formData.numberOfStudent,
      acadimicYearId:selectedRow.acadimicYearId ,
      departementId:selectedDepartment ,
    };
    console.log("Data to be updated:", reorderedData);

        console.log(selectedRow);
        axios.put(`${API}Group/UpdateGroup`, reorderedData, {
          headers: {
            Id: selectedRow.groupId,
          },
        })
        .then((response) => {
          console.log("Update successful:", response.data);
        })
        .catch((error) => {
          console.error("Error updating department:", error);
        });
      }
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-between p-2 gap-5">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectFaculty">Faculty</label>

          <Select
            id="selectAcademicYear"
            options={faculties.map((faculty) => ({
              value: faculty.facultyId,
              label: faculty.name,
            }))}
            onChange={handleFacultyChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectDepartment">Department</label>

          <Select
            id="selectAcademicYear"
            options={departments.map((department) => ({
              value: department.departementId,
              label: department.name,
            }))}
            onChange={handleDepartmentChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="h-[600px]">
        <div style={containerStyle}>
          <div className="example-wrapper">
            <div style={gridStyle} className={"ag-theme-quartz"}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection={"single"}
                onGridReady={onGridReady}
                pagination={true}
                paginationPageSize={100}
                paginationPageSizeSelector={[20, 50, 100]}
                onRowSelected={onRowSelected}
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
              Update Group
            </DialogHeader>
            <DialogBody>
              <form>
                <div className="flex flex-wrap items-center gap-5 ">
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Group Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Student Head Name"
                    name="studentHeadName"
                    value={formData.studentHeadName}
                    onChange={handleInputChange}
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Student Head Phone"
                    name="studentHeadPhone"
                    value={formData.studentHeadPhone}
                    onChange={handleInputChange}
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Number of Students"
                    name="numberOfStudent"
                    value={formData.numberOfStudent}
                    onChange={handleInputChange}
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
              <Button
                variant="gradient"
                color="green"
                onClick={() => {
                  handleUpdate();
                  handleOpen();
                }}
              >
                <span>Update</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </>
  );
}
