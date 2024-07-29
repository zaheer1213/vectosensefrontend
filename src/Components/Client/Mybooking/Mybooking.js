import React, { useEffect, useRef, useState } from "react";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Mybooking = () => {
  const invoiceRef = useRef();
  const [bookingData, setBookingData] = useState([]);
  const [loder, setLoder] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [invioceBookingData, setinvioceBookingData] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };
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

  const generateInvoice = async (service_id) => {
    const token = localStorage.getItem("client-token");
    const headers = {
      "x-access-token": token,
    };

    try {
      const response = await axios.get(
        `${BASEURL}/appointment/booking-invoice/${service_id}`,
        { headers }
      );

      if (response) {
        const allData = response.data;
        setInvoiceData(allData.data);
        setServiceData(allData.service_data);
        setBusinessData(allData.business_details);
        setinvioceBookingData(allData.booking_data);
        setDataReady(true);

        // await handleDownloadPdf();
      }
    } catch (error) {
      console.log(error);
    }
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
              <strong className="text-warning">Pending</strong>
            </>
          ) : params.data.status == "Rejected" ? (
            <strong className="text-danger">Rejected</strong>
          ) : params.data.status == "Approved" ? (
            <strong className="text-success">Approved</strong>
          ) : (
            <strong className="text-secondary">{params.data.status}</strong>
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
            <>
              {" "}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openService(params.value)}
              >
                Cancel Booking
              </Button>
            </>
          )}
        </>
      ),
    },
    {
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <>
          <Button
            size="sm"
            variant="primary"
            onClick={() => generateInvoice(params.data.id)}
            style={{ marginLeft: "10px" }}
          >
            Get Invoice
          </Button>
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
  const handleGenerateNumber = () => {
    const newRandomNumber = generateRandomNumber();
    setRandomNumber(newRandomNumber);
  };

  const handleDownloadPdf = () => {
    const input = invoiceRef.current;
    html2canvas(input, { useCORS: true, scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${randomNumber}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    handleGenerateNumber();
    getAllBooking(page, limit);
    generateRandomNumber();

    if (dataReady) {
      handleDownloadPdf();
      setDataReady(false);
    }
  }, [page, limit, dataReady]);
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

        {/* invioce */}
        <div
          ref={invoiceRef}
          style={{
            position: "absolute",
            left: "-9999px",
            top: "0",
            backgroundColor: "white",
            width: "210mm",
            minHeight: "297mm",
            padding: "20mm",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ color: "#5B549E", textAlign: "center" }}>Invoice</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={BASEURL + invoiceData.business_logo}
              alt="Logo"
              style={{ width: "100px" }}
            />
            <div style={{ textAlign: "right" }}>
              <p>
                <strong>Date:</strong>{" "}
                {invoiceData.due_date ? invoiceData.due_date : ""}
              </p>
              <p>
                <strong>Invoice Number:</strong>{" "}
                {invoiceData.invoice_number ? invoiceData.invoice_number : ""}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div>
              <h5>Bill To:</h5>
              <p>{invioceBookingData?.customer_name}</p>
              <p>
                {invioceBookingData?.address} {invioceBookingData?.city}{" "}
                {invioceBookingData?.zipcode}
              </p>
              <p>{invioceBookingData?.mobile}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h5>Service Provider:</h5>
              <p>{serviceData?.name} Service</p>
              <p>{businessData?.street_address}</p>
              <p>{businessData?.business_no}</p>
            </div>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Service Name
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Price
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Time (hrs)
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {serviceData?.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${serviceData?.price_per_hour}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {invioceBookingData?.start_time} &nbsp;&nbsp;{" "}
                  {invioceBookingData?.end_time}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${serviceData?.price_per_hour}
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ textAlign: "right", marginTop: "20px" }}>
            <strong>Final Total : ${serviceData?.price_per_hour}</strong>
          </p>
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
