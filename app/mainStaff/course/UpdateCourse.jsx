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
import { getCourseCategories } from "../../CustomHooks/useAllData";
import { postData } from "../../CustomHooks/usePost";

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
      field: "description",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith",
      },
    },
    { field: "totalMark", filter: "agNumberColumnFilter" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [courseId , setCourseId] = useState()

  const handleOpen = () => setOpen(!open);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const selectedRowsElement = document.querySelector("#selectedRows");
    if (selectedRowsElement) {
      selectedRowsElement.innerHTML =
        selectedRows.length === 1 ? selectedRows[0].athlete : "";
    }
    setCourseId(selectedRows[0]?.courseId)
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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalMark: 0,
    acadimicYearId: 0,
    courseCategoryId: 0,
    departementId: 0
  });  const API = process.env.NEXT_PUBLIC_BACKEND_API;

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
    setFormData({ ...formData, departementId: 0, courseCategoryId: 0, acadimicYearId: 0 });
  };

  const handleDepartmentChange = async (option) => {
    setSelectedDepartment(option);
    setSelectedCourseCategory(null);
    setSelectedAcademicYear(null);
    setFormData({ ...formData, departementId: option.value, courseCategoryId: 0, acadimicYearId: 0 });
    const years = await getAcademicYears(option.value);
    setAcademicYears(years);
  };

  const handleAcademicYearChange = (option) => {
    setSelectedAcademicYear(option ? option.value : null);
    setFormData({ ...formData, acadimicYearId: option.value });
  };
  const handleCourseCategoryChange = (option) => {
    setSelectedCourseCategory(option ? option.value : null);
    setFormData({ ...formData, courseCategoryId: option.value });
  };

  const fetchCourses = async () => {
    if (!selectedAcademicYear || !selectedCourseCategory) {
      return; // Exit if either is not selected
    }

    const apiUrl = `${API}Course/GetCoursesOfAcadimicYear`;
    const params = { CourseCategoryId: selectedCourseCategory };
    const headers = { AcadimicYearId: selectedAcademicYear };

    try {
      const response = await axios.get(apiUrl, { params, headers });
      console.log(
        "Fetched data with:",
        selectedCourseCategory,
        selectedAcademicYear
      );
      const coursesData = response.data.map((course) => ({
        courseId:course.courseId ,
        name: course.name,
        description: course.description,
        totalMark: course.totalMark,
      }));
      setRowData(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [selectedAcademicYear, selectedCourseCategory]); // Dependencies on selections

  const handleOpenDeleteAssistant = () =>
    setOpenDeleteAssistant(!openDeleteAssistant);

  const onGridReady = useCallback(async () => {
    const apiUrl = `${API}Course/GetCoursesOfAcadimicYear`; // Base API URL
    const params = {
      CourseCategoryId: selectedCourseCategory, // Query parameter
    };
    const headers = {
      AcadimicYearId: selectedAcademicYear, // Header parameter
    };
    try {
      const response = await axios.get(apiUrl, {
        params, // Query parameters
        headers, // Headers
      });
      console.log(
        "selectedCourseCategory : " +
          selectedCourseCategory +
          "  selectedAcademicYear : " +
          selectedAcademicYear
      );
      console.log(response.data);
      const coursesData = response.data.map((course) => ({
        name: course.name,
        description: course.description,
        totalMark: course.totalMark,
      }));
      console.log(coursesData);
      setRowData(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [API, selectedAcademicYear, selectedCourseCategory]);

  const gridRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData)
  };

  const handleUpdate = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows?.length) {
      const selectedRow = selectedRows[0];
      axios
        .put(
          `${API}Course/UpdateCourse`,
          formData,
          {
            headers: {
              Id: selectedRow.courseId,
            },
          }
        )
        .then((response) => {
          console.log("Update successful:", response.data);
        })
        .catch((error) => {
          console.error("Error updating department:", error);
        });
    }
  };

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
            options={academicYears.map((academicYear) => ({
              value: academicYear.value,
              label: academicYear.label,
            }))}
            onChange={handleAcademicYearChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-sm items-center w-full md:mb-5">
          <label htmlFor="selectCourseCategory">Course Category</label>
          <Select
            id="selectCourseCategory"
            options={courseCategories.map((courseCategory) => ({
              value: courseCategory.value,
              label: courseCategory.label,
            }))}
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
                    name="name"
                    onChange={handleInputChange}
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Course Description"
                    name="description"
                    onChange={handleInputChange}
                  />
                  <input
                    className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none"
                    placeholder="Total Mark"
                    name="totalMark"
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
              <Button variant="gradient" color="green"   onClick={() => {
                handleUpdate();
                handleOpen();
              }}>
                <span>Update</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </>
  );
}
