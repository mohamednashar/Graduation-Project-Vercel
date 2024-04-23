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

export default function UpdateProf() {
  const [formData, setFormData] = useState({
    DepartmentNames: [],
  });
  const [faculties, setFaculties] = useState([]);
  const [facultyId, setFacultyId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // State to hold the selected department ID
  const [columnDefs, setColumnDefs] = useState([]);

  const [open, setOpen] = useState(false);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 150,
    filter: true,
  }), []);

  // Handle the form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const onGridReady = useCallback(() => {
    if (facultyId) {
      fetchDepartmentsByFaculty(facultyId); // Fetch departments when the grid is ready and faculty ID is set
    }
  }, [facultyId]);

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
      setDepartments(response.data); // Set fetched departments
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows?.length) {
      setOpen(true);
      document.querySelector("#selectedRows").innerHTML =
        selectedRows[0]?.departementId || "";
    }
  }, []);

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

  const handleUpdate = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows?.length) {
      const selectedRow = selectedRows[0];

      const postData = {
        name: formData["Department Name"],
        studentServiceNumber: formData["Student Service Number"],
        profHeadName: formData["Head Name"],
        facultyId: selectedRow.facultyId,
      };

      axios
        .put(
          `${API}Departement/UpdateDepartement`,
          postData,
          {
            headers: {
              Id: selectedRow.departementId,
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

  const handleSelectChange = (selectedOption, selector) => {
    const ID = selectedOption ? selectedOption.value : null;
    if (selector === "facultyId") {
      setFacultyId(ID);
      fetchDepartmentsByFaculty(ID); // Fetch departments when faculty ID changes
    } else if (selector === "departmentId") {
      setSelectedDepartmentId(ID); // Update selected department ID
    }
  };

  return (
    <div className="h-[600px]">
      <div className="flex gap-14">
      <div className="flex flex-col text-sm items-center w-full md:mb-5">
        <label htmlFor="selectFaculty" className="mb-2">
          Select Faculty
        </label>
        <Select
          id="selectFaculty"
          className="w-full"
          options={faculties.map((faculty) => ({
            value: faculty.facultyId,
            label: faculty.name,
          }))}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "facultyId")
          }
        />
      </div>

      <div className="flex flex-col text-sm items-center w-full md:mb-5">
        <label htmlFor="selectDepartment" className="mb-2">
          Select Department
        </label>
        <Select
          id="selectDepartment"
          className="w-full"
          options={departments.map((department) => ({
            value: department.departmentId,
            label: department.name,
          }))}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, "departmentId")
          }
        />
      </div>
      </div>

      <div style={containerStyle} >
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
              onSelectionChanged={onSelectionChanged}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={100}
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
            Update Department Data
          </DialogHeader>
          <DialogBody>
            <form>
              <div className="flex flex-wrap items-center gap-5">
                <input
                  type="text"
                  name="Department Name"
                  onChange={handleInputChange}
                  className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828]"
                  placeholder="Department Name"
                />
                <input
                  type="text"
                  name="Student Service Number"
                  onChange={handleInputChange}
                  className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828]"
                  placeholder="Student Service Number"
                />
                <input
                  type="text"
                  name="Head Name"
                  onChange={handleInputChange}
                  className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828]"
                  placeholder="Head Name"
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
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleUpdate();
                handleOpen();
              }}
            >
              Update
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
