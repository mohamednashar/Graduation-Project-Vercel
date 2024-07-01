"use client";
import React, {  useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "./style.css"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
export default function Show() {
  const axiosAuth=useAxiosAuth()
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId");
  const router = useRouter()
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    setColumnDefs([
      {
        headerName: "Student Image",
        field: "studentImageUrl",
        cellRenderer: (params) => {
          const imageUrl = params.value || "/user.png"; // If imageUrl is null, set default
          return (
            <div className="flex items-center justify-center">
              <img
                src={imageUrl}
                alt="student img"
                className="w-[50px] rounded-full h-[50px]"
              />
            </div>
          );
        },
        width: 200,
        headerStyle: { textAlign: "center" }, // Center header name
        cellStyle: { textAlign: "center" }, // Center text in this column
      },
      {
        headerName: "Name",
        field: "name",
        valueGetter: (params) => {
          const { data } = params;
          return `${data.studentFirstName} ${data.studentSecondName} ${data.studentThirdName} ${data.studentFourthName}`;
        },
        filterParams: {
          filterOptions: ["contains", "startsWith", "endsWith"],
          defaultOption: "startsWith",
        },
        width: 550,
        headerStyle: { textAlign: "center" }, // Center header name
        cellStyle: { textAlign: "center" }, // Center text in this column
      },
      {
        field: "studentMarks",
        width: 300,
        headerStyle: { textAlign: "center" }, // Center header name
        cellStyle: { textAlign: "center" }, // Center text in this column
      },
    ]);
  }, []);

  const getRowHeight = (params) => {
    return 80;
  };

  const fetchingData = async () => {
    try {
      const response = await axiosAuth.get(`${API}Exam/GetAllStudnetsAttendExam`, {
        params: {
          ExamId: examId,
          ExamCreatorUserName: userName,
        },
      });
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [examId, userName]);

  const gridRef = useRef();

  const getRowStyle = (params) => {
    return { cursor: "pointer" };
  };

  const getRowClass = (params) => {
    return "clickable-row";
  };

  useEffect(() => {
    const gridApi = gridRef.current.api;
    gridApi?.refreshCells({ force: true });
  }, [rowData]);

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="h-full max-w-screen-xl">
        <div className="example-wrapper h-[700px] w-[1050px]">
          <div className={"ag-theme-quartz h-[700px]"}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={"single"}
              pagination={true}
              paginationPageSize={100}
              paginationPageSizeSelector={[20, 50, 100]}
              getRowHeight={getRowHeight}
              getRowStyle={getRowStyle}
              getRowClass={getRowClass}
              onRowClicked={(event) => {
                const { studentUserName } = event.data;
                router.push(`show/student${studentUserName}ExamId${examId}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
