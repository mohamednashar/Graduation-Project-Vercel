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

const API = process.env.NEXT_PUBLIC_BACKEND_API;

export default function DeleteStudentsFromSection() {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [selectedAcademicYearId, setSelectedAcademicYearId] = useState(null);
  const [open, setOpen] = useState(false);
  const [AcademicYears, setAcademicYears] = useState([]);
  const [groupId, setGroupId] = useState();
  const [courseCategories, setCourseCategories] = useState([]);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [courseCycleId, setCourseCycleId] = useState();
  const [groups, setGroups] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState();
  const [selectedSection, setSelectedSection] = useState([]);
  const [dataSent , setDataSent] = useState([])
  const [failedMessage , setFailedMessage] = useState([""])
  const [successMessage , setSuccessMessage] = useState("")
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
    gpa: null,
    groupId: null,
  });
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  // New state to store selected usernames
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      filter: true,
    }),
    []
  );

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
  const fetchGroups = async (academicYearId) => {
    try {
      const response = await axios.get(`${API}Group/GetGroupsOfAcadimicYear`, {
        headers: {
          AcadimicYearId: academicYearId,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchStudentsByAcademicYear = async (AcademicYearId) => {
    try {
      const response = await axios.get(
        `${API}Student/GetAllStudentsInDepartementandAcadimicYear`,
        {
          headers: {
            AcadimicYearId: AcademicYearId,
          },
        }
      );
      const formattedData = response.data.map((student) => ({
        ...student,
        gender: student.gender === "Male", // Convert gender to boolean
        selected: false, // Add selected property
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
    fetchGroups(academicYearId);
  };

  const handleSectionSelectChange = (selectedOption) => {
    const sectionId = selectedOption ? selectedOption.value : null;
    setSelectedSection(selectedOption); // Reset selected department
    setSectionId(sectionId);
    console.log(sectionId);
  };
  const onGridReady = useCallback(() => {
    if (selectedDepartmentId) {
      fetchStudentsByAcademicYear(selectedDepartmentId); // Ensure this is the correct function you want to call
    }
  }, [selectedDepartmentId, fetchStudentsByAcademicYear]); // Assuming fetchStudentsByAcademicYear is stable or wrapped in useCallback

  const columnDefs = useMemo(
    () => [
      {
        headerName: "First Name",
        field: "firstName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Second Name",
        field: "secondName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Third Name",
        field: "thirdName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Fourth Name",
        field: "fourthName",
        sortable: true,
        filter: true,
      },
      { headerName: "Address", field: "address", sortable: true, filter: true },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Username",
        field: "userName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Gender",
        field: "gender",
        sortable: true,
        filter: true,
        valueFormatter: (params) => (params.value ? "Male" : "Female"),
      },
      {
        headerName: "Birthday",
        field: "birthDay",
        sortable: true,
        filter: "agDateColumnFilter",
      },
      {
        headerName: "GPA",
        field: "gpa",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
    ],
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      
      console.log(sectionId)
      console.log(dataSent)

      // Perform the update request
      const response = await axios.delete(
        `${API}StudentSection/DeleteStudentsFromSection`,
        {
          headers: {
            SectionId: sectionId,
          },
          data: dataSent, // Pass the request body data
        }
      );

    const status = response.status;
    console.log(response.status)
    status === 200 ?
      (
        setSuccessMessage("Students Deleted successfully"),
        setFailedMessage("") ,
        console.log(successMessage)
      ) 
      :
      (
        setFailedMessage("Failed to Delete Students"),
        setSuccessMessage(""),
        console.log(failedMessage)
      );

  

      console.log("Deleted successful:", response.data);
      handleOpen();


      
    } catch (error) {
      console.error("Error Deleting students:", error);
      setFailedMessage("Failed to Delete Students"),
      setSuccessMessage(""),
      console.log(failedMessage)
      handleOpen();

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
    setGroupId(selectedRow.groupId);
  }, []);

  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const response = await axios.get(
          `${API}CourseCategory/GetAllCourseCategories`
        );
        setCourseCategories(response.data);
      } catch (error) {
        console.error("Error fetching course categories:", error);
      }
    };
    fetchCourseCategories();
  }, []);

  const handleCourseCategorySelectChange = async (selectedOption) => {
    setSelectedCourseCategory(selectedOption);
    setFormData({
      ...formData,
      courseCategoryId: selectedOption ? selectedOption.value : "",
    });
    await fetchCourses(selectedAcademicYearId, selectedOption?.value);
  };

  const fetchCourses = async (academicYearId, courseCategoryId) => {
    try {
      const response = await axios.get(
        `${API}Course/GetCoursesOfAcadimicYear`,
        {
          params: {
            CourseCategoryId: courseCategoryId,
          },
          headers: {
            AcadimicYearId: academicYearId,
          },
        }
      );
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleGroupSelectChange = async (selectedOption) => {
    const newGroupId = selectedOption ? selectedOption.value : "";

    // Update the selected group and form data state
    setSelectedGroup(selectedOption);

    try {
      // Fetch the course cycles based on selected group
      const responseCourseCycle = await axios.get(
        `${API}CourseCycle/GetCourseCyclesLessInfo`,
        {
          headers: {
            CourseId: selectedCourse,
            GroupId: newGroupId,
          },
        }
      );

      const courseCycles = responseCourseCycle.data;

      // Update course cycle ID based on the fetched data
      if (courseCycles && courseCycles.length > 0) {
        const newCourseCycleId = courseCycles[0].id;
        setCourseCycleId(newCourseCycleId);

        // Fetch sections based on the new course cycle ID
        const responseSections = await axios.get(
          `${API}Section/GetAllSectionsOfCourseCycle`,
          {
            headers: {
              CourseCycleId: newCourseCycleId,
            },
          }
        );

        setSections(responseSections.data);
        // Update state or do something with sections data
        console.log(sections);
      } else {
        setCourseCycleId(""); // Clear the cycle ID if no cycles are found
      }

      // Optional: log the fetched course cycles for debugging
      console.log(courseCycles);
    } catch (error) {
      console.error("Failed to fetch course cycles or sections", error);
      setCourseCycleId(""); // Handle errors by clearing the cycle ID
    }
  };

  // Function to handle row selection
  const handleRowSelected = useCallback((event) => {
    const selectedRows = event.api.getSelectedRows();
    const selectedUsernames = selectedRows.map((row) => row.userName);
    setSelectedUsernames(selectedUsernames);
    console.log(selectedUsernames)
  }, []);

  // Function to toggle row selection
  const handleToggleRowSelection = useCallback(
    (event) => {
      const selectedRow = event.data;
      selectedRow.selected = !selectedRow.selected;
      const selectedRows = rowData.filter((row) => row.selected);
      const selectedUsernames = selectedRows.map((row) => row.userName);
      setSelectedUsernames(selectedUsernames);
      setDataSent(selectedUsernames);
      console.log(selectedUsernames);
      setRowData([...rowData]); // Trigger re-render

      var selectedRowsString = "";

      selectedRows.forEach(function (selectedRow, index) {
        if (index > 0) {
          selectedRowsString += ", ";
        }
        selectedRowsString += selectedRow.userName;
      });

      document.querySelector("#selectedRowsToDelete").innerHTML = selectedRowsString;
    },
    [rowData]
  );



  return (
    <div className="h-[600px]">
      <div >
        <div className="flex items-center gap-5 ">
          
          <div className="flex flex-col text-sm items-center w-full md:mb-5">
            <label htmlFor="selectFaculty" className="mb-2">
               Faculty
            </label>
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
            <label htmlFor="selectDepartment" className="mb-2">
               Department
            </label>
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
            <label htmlFor="selectAcademicYear" className="mb-2">
               Academic Year
            </label>
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

          <div className="flex min-w[550px] flex-col text-sm items-center w-full">
            <label htmlFor="SelectCourseCategory" className="mb-2">
              Course Category
            </label>
            <Select
              className="w-full"
              options={courseCategories.map((category) => ({
                value: category.courseCategoryId,
                label: category.courseCategoryName,
              }))}
              closeMenuOnSelect={true}
              onChange={handleCourseCategorySelectChange}
              value={selectedCourseCategory}
            />
          </div>
          
        </div>
      <div className="flex items-center gap-5">
          
        
        
          <div className="flex min-w[550px] flex-col text-sm items-center w-full">
            <label htmlFor="SelectCourse" className="mb-2">
              Course
            </label>
            <Select
              className="w-full"
              options={courses.map((course) => ({
                value: course.courseId,
                label: course.name,
              }))}
              closeMenuOnSelect={true}
              onChange={(selectedOption) => {
                selectedOption ? setSelectedCourse(selectedOption.value) : "";
              }}
            />
          </div>
        
          <div className="flex min-w[550px] flex-col text-sm items-center w-full">
            <label htmlFor="SelectGroup" className="mb-2">
              Group
            </label>
            <Select
              className="w-full"
              options={groups.map((group) => ({
                value: group.id,
                label: group.name,
              }))}
              closeMenuOnSelect={true}
              onChange={handleGroupSelectChange}
              value={selectedGroup}
            />
          </div>

          <div className="flex min-w[550px] flex-col text-sm items-center w-full">
          <label htmlFor="SelectGroup" className="mb-2">
            Section
          </label>
          <Select
            className="w-full"
            options={sections.map((section) => ({
              value: section.sectionId,
              label: section.sectionName,
            }))}
            closeMenuOnSelect={true}
            onChange={handleSectionSelectChange}
            value={selectedSection}
          />
        </div>
      </div>

      
      </div>
      <div style={containerStyle}>
        <div className="example-wrapper">
          <div className="example-header font-semibold">
            Selected students :<span id="selectedRowsToDelete" className="whitespace-normal break-words"></span>
          </div>
          <div style={gridStyle} className={"ag-theme-quartz"}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={"multiple"} // Enable multi-select
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={100}
              onRowClicked={handleRowClicked}
              onSelectionChanged={handleRowSelected} // Add row selection event handler
              onCellClicked={handleToggleRowSelection} // Toggle selection on cell click
            />
          </div>
        </div>

        <div className="w-full text-center ">
          <button 
          className="font-bold text-lg bg-red-600 text-white px-4 py-2 mt-4 rounded-lg w-[30%] mx-auto mb-5 transition-all duration-200 hover:bg-red-700"
          onClick={handleSubmit}
          >
            {" "}
            Delete  students from  section
          </button>
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
        <DialogHeader className="dark:text-white">
          Update Professor Data
        </DialogHeader>
        <DialogBody>
        {successMessage && (
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {successMessage}
              </p>
            )}
            {failedMessage && (
              <p className="mb-4 text-lg font-semibold text-red-600">
                {failedMessage}
              </p>
            )}
        

      

        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green"   onClick={handleClose}>
            OK
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Button to save selected usernames */}
    </div>
  );
}
