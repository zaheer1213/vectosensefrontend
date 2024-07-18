import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Allbooking.css";

const Allbooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const columnDefs = [
    {
      headerName: "Sr",
      field: "sr",
      sortable: true,
      filter: true,
      editable: false,
    },
    {
      headerName: "Service",
      field: "service_name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Customer Name",
      field: "customer_name",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Phone",
      field: "mobile",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Booking Time",
      field: "booking_time",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Address",
      field: "address",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
      editable: true,
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  const getAllBooking = async () => {
    const token = localStorage.getItem("admin-token");
    const headers = {
      "x-access-token": token,
    };
    setLoader(true);
    await axios
      .get(`${BASEURL}/service-provider/booking?page=${page}&limit=${limit}`, {
        headers,
      })
      .then((response) => {
        if (response) {
          setLoader(false);
          const dataWithSr = response.data.rows.map((item, index) => ({
            ...item,
            sr: (page - 1) * limit + index + 1,
            booking_time: `${item.start_time} - ${item.end_time}`,
          }));
          setBookingData(dataWithSr);
          setTotalPages(Math.ceil(response.data.count / limit));
        }
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getAllBooking();
  }, [page, limit]);

  return (
    <>
      {loader && <Loader />}
      <Container fluid>
        <Container className="container-center" style={{ marginTop: "50px" }}>
          <div>
            <h1>All Bookings</h1>
          </div>
          <div>
            <div
              className="ag-theme-alpine"
              style={{ height: 600, width: "100%" }}
            >
              <AgGridReact
                rowData={bookingData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={false}
                paginationPageSize={limit}
                onPageChanged={handlePageChange}
                rowSelection="multiple"
              />
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  className="custom-pagination"
                />
              </Stack>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Allbooking;
