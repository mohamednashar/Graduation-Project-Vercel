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



var filterParams = {
  maxNumConditions: 1,
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
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

export default function UpdateCourse () {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    {
      field: 'country',
      filterParams: {
        filterOptions: ['contains', 'startsWith', 'endsWith'],
        defaultOption: 'startsWith',
      },
    },
    {
      field: 'sport',
      filterParams: {
        maxNumConditions: 10,
      },
    },
    {
      field: 'age',
      filter: 'agNumberColumnFilter',
      filterParams: {
        numAlwaysVisibleConditions: 2,
        defaultJoinOperator: 'OR',
      },
      maxWidth: 100,
    },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
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

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  const gridRef = useRef();
  
  
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
    <div style={containerStyle} >
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
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Course Title" />          
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Course description" />          
            <input className='rounded-md p-2 block w-72 border border-solid border-gray-800'   placeholder="Course Code" />          
                   
          <div className="w-72">
      <Select  label="College">
      
        <Option>Option A</Option>
        <Option>Option B</Option>
        <Option>Option C</Option>
      </Select>
    </div>                    <div className="w-72">
      <Select  label="Department">
      
      <Option>Option A</Option>
        <Option>Option B</Option>
        <Option>Option C</Option>
      </Select>
    </div>     

      <div className="w-72">
      <Select  label="Prof">
      
        <Option>Option A</Option>
        <Option>Option B</Option>
        <Option>Option C</Option>
      </Select>
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








