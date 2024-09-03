import React, { useEffect, useState } from "react";
import "./PaymentSuccessful.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Topbar from "../Topbar/Topbar";
import Footer from "../../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";

const PaymentSuccessful = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [businessData, setBusinessData] = useState({});

  const getUserInformation = async (bookingId) => {
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
    if (id) {
      getUserInformation(id);
    }
  }, []);
  return (
    <>
      <Topbar />
      <Container className="">
        <Row>
          <Col className="payment-conatiner">
            <div className="">
              <FontAwesomeIcon icon={faCircleCheck} className="checkicon" />
            </div>
            <div className="mt-3">
              <h2>Payment Successful</h2>
              <span>Thank you for Service Booking!</span>
            </div>
            <div className="borderclass">
              <div className="info">
                <strong>Customer Name:</strong>
                <p>{invoiceData?.customer_name}</p>
              </div>
              <div className="info">
                <strong>Amount Paid:</strong>
                <p>₹{invoiceData?.amount}.00</p>
              </div>
              <div className="info">
                <strong>Date & Time:</strong>
                <p>
                  {invoiceData?.date}, {invoiceData?.start_time} to{" "}
                  {invoiceData?.end_time}
                </p>
              </div>
              <div className="info">
                <strong>Reference Number:</strong>
                <p>{invoiceData?.id}</p>
              </div>
            </div>
            <div className="mt-5 div-button">
              <Button
                style={{ background: "#5B549E" }}
                onClick={() => Navigate("/home")}
              >
                Return To Home
              </Button>
              <div>
                <Button
                  style={{ background: "#5B549E" }}
                  onClick={() => Navigate("/my-bookings")}
                >
                  My Bookings
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentSuccessful;
