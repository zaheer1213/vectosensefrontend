import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { BASEURL } from "../../../Commanconstans/Comman";
import axios from "axios";
import Loader from "../../../Loader/Loader";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgentBooking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs"; // Import dayjs
import { Pagination, Stack } from "@mui/material";

const AgentBooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [userData, setUserData] = useState({});
  const [userDataIndex, setuserDataIndex] = useState(0);

  const getAllBooking = async () => {
    const token = localStorage.getItem("Agent-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/agent/booking?page=${page}&limit=${limit}`,
        { headers }
      );
      const dataWithSr = response.data.rows.map((item, index) => ({
        ...item,
        sr: (page - 1) * limit + index + 1,
        booking_time: `${item.start_time} - ${item.end_time}`,
      }));
      setBookingData(dataWithSr);
      setLoading(false);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleOpenDelete = (id) => {
    setId(id);
    setShow(true);
    setMessage("Are you sure you want to delete?");
  };

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      const token = localStorage.getItem("Agent-token");
      const headers = { "x-access-token": token };
      const response = await axios.delete(`${BASEURL}/agent/booking/${id}`, {
        headers,
      });
      setLoading(false);
      if (response) {
        setMessage("Booking deleted successfully");
        setShow1(true);
        getAllBooking();
      }
    } catch (error) {
      setShow(false);
      setMessage("Something went wrong.");
      setShow1(true);
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    const token = localStorage.getItem("Agent-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const [response, updateResponse] = await Promise.all([
        axios.get(`${BASEURL}/customer/booking/${id}`, { headers }),
        axios.put(
          `${BASEURL}/customer/booking/${id}`,
          { status: "Approved" },
          { headers }
        ),
      ]);
      setLoading(false);
      if (!updateResponse.data.error) {
        setMessage("Booking Accepted Successfully");
        setShow1(true);
        getAllBooking();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (id) => {
    const token = localStorage.getItem("Agent-token");
    const headers = { "x-access-token": token };
    try {
      setLoading(true);
      const [response, updateResponse] = await Promise.all([
        axios.get(`${BASEURL}/customer/booking/${id}`, { headers }),
        axios.put(
          `${BASEURL}/customer/booking/${id}`,
          { status: "Rejected" },
          { headers }
        ),
      ]);
      setLoading(false);
      if (!updateResponse.data.error) {
        setMessage("Booking Rejected Successfully");
        setShow1(true);
        getAllBooking();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, value) => setPage(value);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Set newDate which is a dayjs object
  };

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
    {
      headerName: "Action",
      field: "id",
      cellRenderer: (params) => (
        <>
          {params.data.status == "Pending" ? (
            <>
              <Button
                size="sm"
                style={{
                  background: "#5B549E",
                  color: "white",
                  border: "1px solid black",
                }}
                onClick={() => handleAccept(params.data.id)}
              >
                Accept
              </Button>
              &nbsp;
              <Button
                size="sm"
                style={{
                  background: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={() => handleDecline(params.data.id)}
              >
                Decline
              </Button>
              &nbsp;
            </>
          ) : params.data.status == "Approved" ? (
            <Button
              size="sm"
              style={{
                background: "green",
                color: "white",
                border: "1px solid black",
              }}
              disabled
            >
              Approved
            </Button>
          ) : (
            <Button
              size="sm"
              style={{
                background: "red",
                color: "white",
                border: "1px solid black",
              }}
              disabled
            >
              Declined
            </Button>
          )}{" "}
          &nbsp;&nbsp;
          <FontAwesomeIcon
            icon={faTrashCan}
            title="Delete"
            className="pointer"
            style={{ color: "red" }}
            onClick={() => handleOpenDelete(params.data.id)}
          />
        </>
      ),
    },
  ];

  const statusCellRenderer = (params) => {
    const { status, id } = params.data;
    return (
      <div className="d-flex align-items-center">
        {status === "Pending" ? (
          <>
            <Button
              size="sm"
              style={{
                background: "#5B549E",
                color: "white",
                border: "1px solid black",
              }}
              onClick={() => handleAccept(id)}
            >
              Accept
            </Button>
            &nbsp;
            <Button
              size="sm"
              style={{
                background: "white",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => handleDecline(id)}
            >
              Decline
            </Button>
            &nbsp;
          </>
        ) : status === "Approved" ? (
          <Button
            size="sm"
            style={{
              background: "green",
              color: "white",
              border: "1px solid black",
            }}
            disabled
          >
            Approved
          </Button>
        ) : (
          <Button
            size="sm"
            style={{
              background: "red",
              color: "white",
              border: "1px solid black",
            }}
            disabled
          >
            Declined
          </Button>
        )}
      </div>
    );
  };

  const actionCellRenderer = (params) => {
    return (
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleOpenDelete(params.data.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} title="Delete" />
      </Button>
    );
  };
  const getAllDateBooking = async () => {
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
      setTimeSlots(response.data.booked_slots);
      setUserData(response.data.data[userDataIndex]);
      setLoading(false);

      // setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSlotSelection = (slot, index) => {
    setSelectedSlot(slot);
    setuserDataIndex(index);
  };
  useEffect(() => {
    getAllBooking();
    getAllDateBooking();
  }, [page, limit, selectedDate, userDataIndex]);
  return (
    <>
      {loading && <Loader />}
      <Container fluid className="bg-filler" style={{ minHeight: "80vh" }}>
        <Container
          className="container-center py-3"
          style={{ marginTop: "50px" }}
        >
          <div className="heading-and-table">
            <div className="text-center">
              <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                All Bookings
              </h1>
              <p>
                Our philosophy is simple — create a team of diverse, passionate
                people and <br /> foster a culture that empowers you to do you
                best work.
              </p>
            </div>
            <Row className="mt-3 slotsinfo mb-5">
              <Col>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    orientation="landscape"
                    value={selectedDate}
                    onChange={handleDateChange} // Assuming you have this function for date change
                  />
                </LocalizationProvider>
              </Col>
              <Col>
                {/* Display time slots here */}
                <div className="time-slots">
                  <h5>Your schedule</h5>
                  <div className="button-container">
                    {timeSlots.length === 0 ? (
                      <p className="fw-bold">No Slots Available On This Day</p>
                    ) : (
                      timeSlots.map((slot, index) => {
                        return (
                          <Button
                            key={index}
                            className="custom-button"
                            variant={
                              selectedSlot === slot
                                ? "primary"
                                : "outline-primary"
                            }
                            onClick={() => handleSlotSelection(slot, index)}
                          >
                            {slot[0]} - {slot[1]}
                          </Button>
                        );
                      })
                    )}
                  </div>
                </div>
              </Col>
              <Col>
                {/* Display user info here */}
                <div className="user-info">
                  <h5>
                    Details for{" "}
                    <span style={{ color: "#5B549E" }}>
                      {userData?.date ? userData?.date : ""}
                    </span>
                  </h5>
                  {userData ? (
                    <>
                      <p>
                        <strong>Name:</strong>{" "}
                        {userData?.customer_name
                          ? userData?.customer_name
                          : "-"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {userData?.email ? userData?.email : "-"}
                      </p>
                      <p>
                        <strong>Mobile:</strong>{" "}
                        {userData?.mobile ? userData?.mobile : "-"}
                      </p>
                      <p>
                        <strong>Address:</strong> {userData?.address}{" "}
                        {userData?.city} {userData?.zipcode}
                      </p>
                      <p>
                        <strong>Service Name:</strong>{" "}
                        {userData?.service_name ? userData?.service_name : "-"}
                      </p>
                      <p>
                        <strong>Agent Assigned:</strong>{" "}
                        {userData.service_agent ? userData.service_agent : "-"}
                      </p>
                      <p>
                        <strong>Amount:</strong> $
                        {userData?.amount ? userData?.amount : "-"}
                      </p>
                    </>
                  ) : (
                    <strong>No User Data Available On This Day</strong>
                  )}
                </div>
              </Col>
            </Row>

            <div
              className="ag-theme-alpine"
              style={{ height: 500, width: "100%" }}
            >
              <AgGridReact
                rowData={bookingData}
                columnDefs={columns}
                pagination={false}
                frameworkComponents={{
                  statusCellRenderer,
                  actionCellRenderer,
                }}
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

      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleDelete}>
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgentBooking;
