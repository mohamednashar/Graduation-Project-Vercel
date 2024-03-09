"use client"

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";

export default function UpdateDepartment () {


  const [formData, setFormData] = useState({
    college: "",
    department: "",
    numberOfDepartments: 0,
    DepartmentNames: []
  });

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
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder={`Department ${i + 1} Name`}
        />
      );
    }
    
    return inputs;
  };

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  
  
    const [open, setOpen] = useState(false);
   
    const handleOpen = () => 
    {
      setOpen(!open);
      setFormData(prevFormData => ({
        ...prevFormData,
        numberOfDepartments: 0 // Update numberOfDepartments with the new value
      }));
  
    }
    const onSelectionChanged = useCallback(() => {
      const selectedRows = gridRef.current.api.getSelectedRows();
      document.querySelector('#selectedRows').innerHTML =
        selectedRows.length === 1 ? selectedRows[0].athlete : '';
        console.log(selectedRows)
        handleOpen();
    }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          Selection:
          <span id="selectedRows"></span>
        </div>

        <div
          style={gridStyle}
          className={
            "ag-theme-quartz"
          }
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'single'}
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
      >
        <DialogHeader>Update Department Data</DialogHeader>
        <DialogBody>
        <form onSubmit={handleSubmit}>
      <div className='flex flex-wrap items-center gap-5 '>
        <input
          type="text"
          name="college"
          onChange={handleInputChange}
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder="College"
        />
      
        <input
          type="number"
          name="numberOfDepartments"
          onChange={handleInputChange}
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder="Number of Departments"
        />
        {renderDepartmentNamesInputs({open})}
      
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
  );
};








