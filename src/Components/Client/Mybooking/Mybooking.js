import React, { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Modal } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Footer from "../../Footer/Footer";

const Mybooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loder, setLoder] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);

  const getAllBooking = async (page, limit) => {
    const token = localStorage.getItem("client-token");
    const headers = {
      "x-access-token": token,
    };
    setLoder(true);
    await axios
      .get(`${BASEURL}/accounts/booking?page=${page}&limit=${limit}`, {
        headers,
      })
      .then((responce) => {
        if (responce) {
          setLoder(false);
          const dataWithSr = responce.data.rows.map((item, index) => ({
            ...item,
            sr: (page - 1) * limit + index + 1,
            booking_time: `${item.start_time} - ${item.end_time}`,
          }));
          setBookingData(dataWithSr);
          setTotalPages(Math.ceil(responce.data.count / limit));
        }
      })
      .catch((error) => {
        console.log(error);
        setLoder(false);
      });
  };

  const columnDefs = [
    { headerName: "Sr No", field: "sr", sortable: true, filter: true },
    {
      headerName: "Name",
      field: "customer_name",
      sortable: true,
      filter: true,
    },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Mobile", field: "mobile", sortable: true, filter: true },
    {
      headerName: "Address",
      field: "address",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
    },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    {
      headerName: "Service Name",
      field: "service_name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Booking Time",
      field: "booking_time",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => (
        <>
          {params.data.status == "Pending" ? (
            <>
              <Button size="sm" variant="warning">
                Pending
              </Button>
            </>
          ) : params.data.status == "Rejected" ? (
            <Button size="sm" variant="danger">
              Rejected
            </Button>
          ) : params.data.status == "Approved" ? (
            <Button size="sm" variant="success">
              Approved
            </Button>
          ) : (
            <Button size="sm" variant="secondary">
              {params.data.status}
            </Button>
          )}
        </>
      ),
    },
    {
      headerName: "Action",
      field: "id",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <>
          {params.data.status == "Canceled" ? (
            <Button size="sm" variant="secondary" disabled>
              Canceled
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => openService(params.value)}
            >
              Cancel Booking
            </Button>
          )}
        </>
      ),
    },
  ];
  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

  const openService = (id) => {
    setId(id);
    setShow(true);
    setMessage("Are you sure you want to cancel this booking?");
  };
  const cancelService = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    const param = {
      status: "Canceled",
    };
    await axios
      .put(`${BASEURL}/accounts/booking/${id}`, param, { headers })
      .then((responce) => {
        if (responce) {
          setShow(false);
          getAllBooking();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleClose1 = () => {
    setShow1(false);
  };

  useEffect(() => {
    getAllBooking(page, limit);
  }, [page, limit]);
  return (
    <>
      {loder ? <Loader /> : ""}
      <Topbar />
      <Container className="py-5">
        <div style={{ marginTop: "50px" }}>
          <div>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                fontSize: "30px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => window.history.back()}
            />
          </div>
          <div>
            <h1 className="text-center mb-5">My Bookings</h1>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={bookingData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={limit}
              rowSelection="multiple"
            />
          </div>
        </div>
      </Container>

      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={cancelService}>
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
      <Footer />
    </>
  );
};

export default Mybooking;
