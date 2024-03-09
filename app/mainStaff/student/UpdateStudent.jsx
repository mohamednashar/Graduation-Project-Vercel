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

export default function UpdateStudent () {
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
   
    const handleOpen = () => setOpen(!open);
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
        <DialogHeader>Update Assistant Data</DialogHeader>
        <DialogBody>
          <form >

        <div className='flex flex-wrap items-center gap-5 '>
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="First Name" />          
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Second Name" />          
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Third Name" />          
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Fourth Name" /> 
          <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'  placeholder="Username" />          
          <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'  placeholder="mail" />          
          <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'  placeholder="Address" />          
          <input className='rounded-md p-2 block w-72 border border-solid border-gray-800' type='date' placeholder="Date of birth"/>          
          <input className='rounded-md p-2 block w-72 border border-solid border-gray-800' type='number' placeholder="Phone" />          
          <div className="w-72">
      <Select  label="Select Version">
      
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
      </Select>
    </div>                    <div className="w-72">
      <Select  label="Select Version">
      
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
      </Select>
    </div>          
          <div className="flex gap-10">
      <Radio name="Gender"  label="Male" />
      <Radio name="Gender"  label="Female"  />
    </div>     
       
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








