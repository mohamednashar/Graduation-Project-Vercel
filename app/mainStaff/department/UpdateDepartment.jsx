import axios from "axios"; // Import Axios for making HTTP requests
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


const API = process.env.NEXT_PUBLIC_BACKEND_API;

export default function UpdateDepartment() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartmentNamesChange = (event) => {
    const { name, value } = event.target;
    const DepartmentNames = [...formData.DepartmentNames];
    DepartmentNames[parseInt(name)] = value;
    setFormData({ ...formData, DepartmentNames });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const renderDepartmentNamesInputs = ({ open }) => {
    let inputs = [];
    for (let i = 0; i < formData.numberOfDepartments; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          name={i}
          value={formData.DepartmentNames[i] || ""}
          onChange={handleDepartmentNamesChange}
          className="rounded-md p-2 border border-solid border-gray-800"
          placeholder={`Department ${i + 1} Name`}
        />
      );
    }

    return inputs;
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  }, []);

  // Fetch departments data from the API endpoint
  const onGridReady = useCallback((params) => {
    fetch(`${API}Departement/GetDepartements`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const gridRef = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  };

  const handleUpdate = () => {
    // Prepare the data to be sent in the POST request
    const selectedRows = gridRef.current.api.getSelectedRows();
    const selectedRow = selectedRows[0]; // Assuming only one row can be selected
    console.log(selectedRow.facultyId);
    const postData = {
      name: formData["Department Name"],
      studentServiceNumber: formData["Student Service Number"],
      profHeadName: formData["Head Name"],
      facultyId: selectedRow.facultyId,
    };

    // Make the POST request
    axios
      .post(`${API}Departement/UpdateDepartement`, postData, {
        headers: {
          Id: selectedRow.departementId,
        },
      })
      .then((response) => {
        // Handle success
        console.log("Update successful:", response.data);
        // Optionally, you can close the modal or show a success message here
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating department:", error);
        // Optionally, you can show an error message to the user
      });

  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].departementId : "";
    console.log(selectedRows);
    handleOpen();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <span id="selectedRows" className="hidden"></span>
        </div>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={[
              { field: "departementId", headerName: "Department ID" },
              { field: "name", headerName: "Department Name" },
              {
                field: "studentServiceNumber",
                headerName: "Student Service Number",
              },
              { field: "profHeadName", headerName: "Head Name" },
            ]}
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
          Update Department Data
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center gap-5 ">
              <input
                type="text"
                name="Department Name"
                onChange={handleInputChange}
                className="rounded-md p-2       border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none  "
                placeholder="Department Name"
              />
              <input
                type="text"
                name="Student Service Number"
                onChange={handleInputChange}
                className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none  "
                placeholder="Student Service Number"
              />
              <input
                type="text"
                name="Head Name"
                onChange={handleInputChange}
                className="rounded-md p-2 border border-solid border-gray-800 dark:text-white dark:bg-[#282828] outline-none  "
                placeholder="Head Name"
              />

              {renderDepartmentNamesInputs({ open })}
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
  );
}
