import axios from "axios";
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import Select from "react-select";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

export default function UpdateStudent() {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [selectedAcademicYearId, setSelectedAcademicYearId] = useState(null);
  const [open, setOpen] = useState(false);
  const [AcademicYears, setAcademicYears] = useState([]);
  const [groupId , setGroupId] = useState()
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    address: "",
    email: "",
    userName: "",
    gender: "",
    birthDay: "",
    gpa: null ,
    groupId:null ,

  });
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 150,
    filter: true,
  }), []);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(`${API}Faculty/GetFaculties`);
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const fetchDepartmentsByFaculty = async (facultyId) => {
    try {
      const response = await axios.get(`${API}Departement/GetDepartementsOfFaculty`, {
        headers: {
          FacultyId: facultyId,
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const getAcademicYears = async (departementId) => {
    try {
      const response = await axios.get(`${API}AcadimicYear/GetAcadimicYears`, {
        headers: {
          DeptId: departementId,
        },
      });
      console.log(response.data);
      const years = response.data.map((year) => ({
        value: year.acadimicYearId,
        label: year.year,
      }));
      console.log("Years:", years); // Log transformed years
      setAcademicYears(response.data);

      return years; // Return the years
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const fetchStudentsByAcademicYear = async (AcademicYearId) => {
    try {
      const response = await axios.get(`${API}Student/GetAllStudentsInDepartementandAcadimicYear`, {
        headers: {
          AcadimicYearId: AcademicYearId,
        },
      });
      const formattedData = response.data.map((student) => ({
        ...student,
        gender: student.gender === "Male", // Convert gender to boolean
      }));
      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleFacultySelectChange = (selectedOption) => {
    const facultyId = selectedOption ? selectedOption.value : null;
    setSelectedDepartmentId(null); // Reset selected department
    fetchDepartmentsByFaculty(facultyId);
  };

  const handleDepartmentSelectChange = (selectedOption) => {
    const departmentId = selectedOption ? selectedOption.value : null;
    setSelectedDepartmentId(departmentId);
    getAcademicYears(departmentId);
  };
  const handleAcademicYearSelectChange = (selectedOption) => {
    const academicYearId = selectedOption ? selectedOption.value : null;
    setSelectedAcademicYearId(academicYearId);
    fetchStudentsByAcademicYear(academicYearId);
  };
  const onGridReady = useCallback(() => {
    if (selectedDepartmentId) {
      fetchStudentsByAcademicYear(selectedDepartmentId); // Ensure this is the correct function you want to call
    }
  }, [selectedDepartmentId, fetchStudentsByAcademicYear]); // Assuming fetchStudentsByAcademicYear is stable or wrapped in useCallback

  const columnDefs = useMemo(() => [
    { headerName: "First Name", field: "firstName", sortable: true, filter: true },
    { headerName: "Second Name", field: "secondName", sortable: true, filter: true },
    { headerName: "Third Name", field: "thirdName", sortable: true, filter: true },
    { headerName: "Fourth Name", field: "fourthName", sortable: true, filter: true },
    { headerName: "Address", field: "address", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: 'agTextColumnFilter' },
    { headerName: "Username", field: "userName", sortable: true, filter: true },
    { headerName: "Gender", field: "gender", sortable: true, filter: true, valueFormatter: (params) => params.value ? "Male" : "Female" },
    { headerName: "Birthday", field: "birthDay", sortable: true, filter: 'agDateColumnFilter' },
    { headerName: "GPA", field: "gpa", sortable: true, filter: 'agNumberColumnFilter' }
], []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Log the data before updating
  
      // Reorder the formData properties
      const reorderedData = {
        id: formData.id || 0 , // Send ID with a value of 0 if not provided
        firstName: formData.firstName,
        secondName: formData.secondName,
        thirdName: formData.thirdName,
        fourthName: formData.fourthName,
        address: formData.address,
        gender: formData.gender === "Male", // Convert gender to boolean
        email: formData.email,
        birthDay: new Date(formData.birthDay).toISOString(),
        phoneNumber: "123",
        gpa:formData.gpa ,
        acadimicYearId:selectedAcademicYearId,
        groupId:groupId,
        departementId: formData.departementId,
      };
      console.log("Data to be updated:", reorderedData);

  
      // Perform the update request
      const response = await axios.put(`${API}Student/UpdateStudent`, reorderedData);
      console.log("Update successful:", response.data);
  
      // Optionally, you can update the grid data after successful update
      // Refetch the professors data for the selected department
      if (selectedAcademicYearId) {
        fetchStudentsByAcademicYear(selectedAcademicYearId);
      }
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating professor:", error);
      // Handle error
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRowClicked = useCallback((event) => {
    const selectedRow = event.data;
    console.log("Selected Student Data:", selectedRow); // Log the data of the selected Student
    setFormData(selectedRow); // Fill form data with selected row data
    setGroupId(selectedRow.groupId)
    setOpen(true);
  }, []);

  return (
    <div className="h-[600px]">
      <div className="flex gap-14">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectFaculty" className="mb-2">Select Faculty</label>
          <Select
            id="selectFaculty"
            className="w-full"
            options={faculties.map((faculty) => ({
              value: faculty.facultyId,
              label: faculty.name,
            }))}
            onChange={handleFacultySelectChange}
          />
        </div>
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectDepartment" className="mb-2">Select Department</label>
          <Select
            id="selectDepartment"
            className="w-full"
            options={departments.map((department) => ({
              value: department.departementId,
              label: department.name,
            }))}
            onChange={handleDepartmentSelectChange}
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectAcademicYear" className="mb-2">Select Academic Year</label>
          <Select
            id="selectAcademicYear"
            className="w-full"
            options={AcademicYears.map((AcademicYear) => ({
              value: AcademicYear.acadimicYearId,
              label: AcademicYear.year,
            }))}
            onChange={handleAcademicYearSelectChange}
          />
        </div>
      </div>
      <div style={containerStyle}>
        <div className="example-wrapper">
          <div className="example-header">
            <span id="selectedRows" className="hidden"></span>
          </div>
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
              onRowClicked={handleRowClicked} // Add rowClicked event handler
            />
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-[#282828]"
      >
        <DialogHeader className="dark:text-white">Update Professor Data</DialogHeader>
        <DialogBody>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-xs mb-1">First Name</label>
        <input id="firstName" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="secondName" className="text-xs mb-1">Second Name</label>
        <input id="secondName" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="secondName" value={formData.secondName} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="thirdName" className="text-xs mb-1">Third Name</label>
        <input id="thirdName" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="thirdName" value={formData.thirdName} onChange={handleInputChange} />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="fourthName" className="text-xs mb-1">Fourth Name</label>
        <input id="fourthName" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="fourthName" value={formData.fourthName} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="text-xs mb-1">Address</label>
        <input id="address" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="address" value={formData.address} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-xs mb-1">Email</label>
        <input id="email" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="userName" className="text-xs mb-1">Username</label>
        <input id="userName" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-xs mb-1">Gender</label>
        <Select
  id="gender"
  options={[
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ]}
  value={formData.gender ? { label: formData.gender, value: formData.gender } : null}
  onChange={(selectedOption) => setFormData({ ...formData, gender: selectedOption.value })}
/>

      </div>
      <div className="flex flex-col">
        <label htmlFor="birthDay" className="text-xs mb-1">Birthday</label>
        <input id="birthDay" className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none" type="date" name="birthDay" value={formData.birthDay} onChange={handleInputChange} />
      </div>
    </div>
    
  </form>
</DialogBody>

        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClose} className="mr-1">Cancel</Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}