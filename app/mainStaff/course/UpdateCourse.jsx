"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios"; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { getCourseCategories } from "@/app/API/CustomHooks/useAllData";
import { postData } from "@/app/API/CustomHooks/usePost";

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

export default function UpdateCourse() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    {
      field: "country",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },
    {
      field: "sport",
      filterParams: {
        maxNumConditions: 10,
      },
    },
    {
      field: "age",
      filter: "agNumberColumnFilter",
      filterParams: {
        numAlwaysVisibleConditions: 2,
        defaultJoinOperator: "OR",
      },
      maxWidth: 100,
    },
    {
      field: "date",
      filter: "agDateColumnFilter",
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


 

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const selectedRowsElement = document.querySelector("#selectedRows");
    if (selectedRowsElement) {
      selectedRowsElement.innerHTML =
        selectedRows.length === 1 ? selectedRows[0].athlete : "";
    }
    console.log(selectedRows);
    handleOpen();
  }, []);

  const [allCourseCategories, setAllCourseCategories] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [totalMark, setTotalMark] = useState(0);
  const [academicYears, setAcademicYears] = useState([]);
  const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCourseCategories();
        setAllCourseCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const faculties = allCourseCategories.reduce((acc, item) => {
    const facultyOption = { value: item.facultyId, label: item.facultyName };
    if (!acc.some((fac) => fac.value === facultyOption.value)) {
      acc.push(facultyOption);
    }
    return acc;
  }, []);

  const departments = selectedFaculty
    ? allCourseCategories
        .filter((item) => item.facultyId === selectedFaculty.value)
        .reduce((acc, item) => {
          const departmentOption = {
            value: item.departementId,
            label: item.departementName,
          };
          if (!acc.some((dep) => dep.value === departmentOption.value)) {
            acc.push(departmentOption);
          }
          return acc;
        }, [])
    : [];

  const courseCategories = selectedDepartment
    ? allCourseCategories
        .filter((item) => item.departementId === selectedDepartment.value)
        .map((item) => ({
          value: item.courseCategoryId,
          label: item.courseCategoryName,
        }))
    : [];

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

  const handleFacultyChange = (option) => {
    setSelectedFaculty(option);
    setSelectedDepartment(null);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
  };

  const handleDepartmentChange = async (option) => {
    setSelectedDepartment(option);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
    const years = await getAcademicYears(option.value);
    setAcademicYears(years);
  };

  const handleCourseCategoryChange = (option) => {
    setSelectedCourseCategory(option);
  };

  const handleAcademicYearChange = (option) => {
    setSelectedAcademicYear(option);
  };

  const handleOpenDeleteAssistant = () =>
    setOpenDeleteAssistant(!openDeleteAssistant);

  const createCourse = async () => {
    const courseData = {
      name: courseName,
      description: courseDescription,
      totalMark: totalMark,
      acadimicYearId: selectedAcademicYear.value,
      courseCategoryId: selectedCourseCategory.value,
      departementId: selectedDepartment.value,
    };
    console.log(courseData);
    await postData("Course/CreateCourse", courseData);
  };

  const onGridReady = useCallback(async (params) => {
    try {
      const response = await axios.get(
        `${API}GetCoursesOfAcademicYear`,
        {
          headers: {
            AcadimicYearId: selectedAcademicYear.value,
            CourseCategoryId: selectedCourseCategory.value
          },
        }
      );
  
      const coursesData = response.data.map((course) => ({
        name: course.name,
        description: course.description,
        totalMark: course.totalMark,
      }));
      setRowData(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [selectedAcademicYear, selectedCourseCategory]);
 

  const gridRef = useRef();

  return (
    <>
      <div className="flex items-center justify-between p-2 gap-5">
        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectFaculty">Faculty</label>
          <Select
            id="selectFaculty"
            options={faculties}
            onChange={handleFacultyChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectDepartment">Department</label>
          <Select
            id="selectDepartment"
            options={departments}
            onChange={handleDepartmentChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectAcademicYear">Academic Year</label>
          <Select
            id="selectAcademicYear"
            options={academicYears}
            onChange={handleAcademicYearChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectCourseCategory">Course Category</label>
          <Select
            id="selectCourseCategory"
            options={courseCategories}
            onChange={handleCourseCategoryChange}
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
              Update Course
            </DialogHeader>
            <DialogBody>
              <form>
                <div className="flex flex-wrap items-center gap-5 ">
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Course Name"
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Course Description"
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Total Mark"
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
              <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Update</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </>
  );
}
