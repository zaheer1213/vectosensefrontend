import React, { useEffect, useState, useRef } from "react";
import Topbar from "../Topbar/Topbar";
import Footer from "../../Footer/Footer";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "./Invoice.css";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [businessData, setBusinessData] = useState({});
  const currentDate = new Date().toLocaleDateString();
  const [randomNumber, setRandomNumber] = useState(null);

  const invoiceRef = useRef();

  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };
  const handleGenerateNumber = () => {
    const newRandomNumber = generateRandomNumber();
    setRandomNumber(newRandomNumber);
  };

  const getUserInformation = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    await axios
      .get(`${BASEURL}/appointment/booking/${bookingId}`, { headers })
      .then((response) => {
        if (response) {
          const responseData = response?.data?.data;
          const serviceData = response?.data?.service_data;
          const businessData = response?.data?.business_details;
          setInvoiceData(responseData);
          setServiceData(serviceData);
          setBusinessData(businessData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleGenerateNumber();
    const BookingId = location?.state?.bookingId;
    if (BookingId) {
      setBookingId(BookingId);
    }
    getUserInformation();
  }, [bookingId]);

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

  return (
    <>
      <Topbar />
      <Container fluid className="py-3">
        <div
          className="text-end"
          style={{ marginRight: "40px", marginBottom: "20px" }}
        >
          <Button className="downalodbtn" onClick={handleDownloadPdf}>
            Download PDF
          </Button>
        </div>
        <Container className="invoice-container">
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <img
                src={BASEURL + businessData?.business_logo}
                alt="Logo"
                className="logo"
              />
            </Col>
            <Col md={6} className="text-md-right">
              <h1 style={{ color: "#5B549E" }}>Invoice</h1>
              <p>
                <strong>Name:</strong> {invoiceData?.customer_name}
              </p>
              <p>
                <strong>Date:</strong> {currentDate}
              </p>
              <p>
                <strong>Invoice Number:</strong>{" "}
                {randomNumber ? randomNumber : ""}
              </p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <h5>Bill To:</h5>
              <p>{invoiceData?.customer_name}</p>
              <p>
                {invoiceData?.address} {invoiceData?.city}{" "}
                {invoiceData?.zipcode}
              </p>
              <p>{invoiceData?.mobile}</p>
            </Col>
            <Col md={6} className="text-md-right">
              <h5>Service Provider:</h5>
              <p>{serviceData?.name} Service</p>
              <p>{businessData?.street_address}</p>
              <p>{businessData?.business_no}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Time (hrs)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{serviceData?.name}</td>
                    <td>${serviceData?.price_per_hour}</td>
                    <td>
                      {invoiceData?.start_time} &nbsp;&nbsp;{" "}
                      {invoiceData?.end_time}
                    </td>
                    <td>${serviceData?.price_per_hour}</td>
                  </tr>
                </tbody>
              </Table>
              <p className="text-end mt-3">
                <strong>Final Total : ${serviceData?.price_per_hour}</strong>
              </p>
            </Col>
          </Row>
        </Container>
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
            <img src="images/logo.png" alt="Logo" style={{ width: "100px" }} />
            <div style={{ textAlign: "right" }}>
              <p>
                <strong>Name:</strong> {invoiceData?.customer_name}
              </p>
              <p>
                <strong>Date:</strong> {currentDate}
              </p>
              <p>
                <strong>Invoice Number:</strong>{" "}
                {randomNumber ? randomNumber : ""}
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
              <p>{invoiceData?.customer_name}</p>
              <p>
                {invoiceData?.address} {invoiceData?.city}{" "}
                {invoiceData?.zipcode}
              </p>
              <p>{invoiceData?.mobile}</p>
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
                  {invoiceData?.start_time} &nbsp;&nbsp; {invoiceData?.end_time}
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
      <Footer />
    </>
  );
};

export default Invoice;
