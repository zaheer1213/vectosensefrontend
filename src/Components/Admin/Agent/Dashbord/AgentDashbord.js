import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs
import { BASEURL } from "../../../Commanconstans/Comman";
import moment from "moment";

const AgentDashbord = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with a dayjs object

  const getAllBooking = async () => {
    const token = localStorage.getItem("Agent-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/agent/date-booking?page=${page}&limit=${limit}&date=${selectedDate.format(
          "YYYY-MM-DD"
        )}`,
        { headers }
      );

      const dataWithSr = response.data.data.map((item, index) => ({
        ...item,
        sr: (page - 1) * limit + index + 1,
        booking_time: `${item.start_time} - ${item.end_time}`,
      }));
      setBookingData(dataWithSr);
      setLoading(false);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => setPage(value);

  const columns = [
    { headerName: "Sr No", field: "sr", sortable: true, filter: true },
    {
      headerName: "Customer Name",
      field: "customer_name",
      sortable: true,
      filter: true,
    },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Mobile", field: "mobile", sortable: true, filter: true },
    {
      headerName: "Service Name",
      field: "service_name",
      sortable: true,
      filter: true,
    },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    {
      headerName: "Timing",
      field: "booking_time",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (params.value ? "Active" : "Inactive"),
    },
  ];
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Set newDate which is a dayjs object
  };

  useEffect(() => {
    getAllBooking();
  }, [page, limit, selectedDate]);

  return (
    <>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <div className="text-center hedingDiv">
              <h1 className="text-center ">Dashboard</h1>
              <p>
                Our philosophy is simple — create a team of diverse, passionate
                people and <br /> foster a culture that empowers you to do your
                best work.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={3}>
            <div className="custome-cards-dashbord bg-filler">
              <strong>TOTAL PROFIT</strong>
              <div className="ineer-dashbord-div">
                <h4>$0</h4>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="custome-cards-dashbord bg-filler text-center">
              <strong>Total Booking</strong>
              <h1 className="text-center">5</h1>
            </div>
          </Col>
          <Col md={3}>
            <div className="custome-cards-dashbord bg-filler text-center">
              <strong>Total Services</strong>
              <h1 className="text-center">5</h1>
            </div>
          </Col>
          <Col md={3}>
            <div className="custome-cards-dashbord bg-filler">
              <strong>Total Booking</strong>
              <div className="ineer-dashbord-div">
                <h4>5</h4>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={7}>
            <div
              className="ag-theme-alpine"
              style={{ height: 500, width: "100%" }}
            >
              <AgGridReact
                rowData={bookingData}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={limit}
                onPaginationChanged={(params) =>
                  handlePageChange(
                    null,
                    params.api.paginationGetCurrentPage() + 1
                  )
                }
              />
            </div>
          </Col>
          <Col md={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="landscape"
                value={selectedDate} // Pass the selectedDate as the value
                onChange={handleDateChange} // Handle date changes
              />
            </LocalizationProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AgentDashbord;
