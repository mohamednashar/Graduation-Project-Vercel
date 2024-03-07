"use client"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useState } from 'react';

var filterParams = {
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

const UpdateStudent = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', editable: true },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100, editable: true },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      editable: true,
    },
    { field: 'country', filter: 'agSetColumnFilter', editable: true },
    { field: 'sport', filter: 'agMultiColumnFilter', editable: true },
    { field: 'gold', filter: 'agNumberColumnFilter', editable: true },
    { field: 'silver', filter: 'agNumberColumnFilter', editable: true },
    { field: 'bronze', filter: 'agNumberColumnFilter', editable: true },
    { field: 'total', filter: false },
  ]);
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 150,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-quartz">
        <AgGridReact
         rowData={rowData}
         columnDefs={columnDefs}
         defaultColDef={defaultColDef}
         rowSelection="multiple"
         suppressRowClickSelection={true}
         pagination={true}
         paginationPageSize={100}
         paginationPageSizeSelector={[20, 50, 100]}
        />
      </div>
    </div>
  );
};

export default UpdateStudent;