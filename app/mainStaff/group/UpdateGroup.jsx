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

export default function UpdateGroup () {


  const [formData, setFormData] = useState({
    college: "",
    department: "",
    numberOfGroups: 0,
    groupNames: []
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGroupNamesChange = (event) => {
    const { name, value } = event.target;
    const groupNames = [...formData.groupNames];
    groupNames[parseInt(name)] = value;
    setFormData({ ...formData, groupNames });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const renderGroupNamesInputs = ({ open }) => {
  
    let inputs = [];
    for (let i = 0; i < formData.numberOfGroups; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          name={i}
          value={formData.groupNames[i] || ""}
          onChange={handleGroupNamesChange}
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder={`Group ${i + 1} Name`}
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
        numberOfGroups: 0 // Update numberOfGroups with the new value
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
        <DialogHeader>Update Group Data</DialogHeader>
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
          type="text"
          name="department"
          onChange={handleInputChange}
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder="Department"
        />
        <input
          type="number"
          name="numberOfGroups"
          onChange={handleInputChange}
          className='rounded-md p-2 block w-72 border border-solid border-gray-800'
          placeholder="Number of Groups"
        />
        {renderGroupNamesInputs({open})}
      
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








