import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { BASEURL } from "../Commanconstans/Comman";
import "./VerificationForm.css"; // Import the CSS file
import Loader from "../Loader/Loader";

const VerificationForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: userEmail,
      email_otp: otp,
    };
    setLoading(true);
    await axios
      .post(BASEURL + "/accounts/verify-otp/nt/", payload)
      .then((responce) => {
        if (responce) {
          const token = responce?.data?.token;
          localStorage.setItem("token", token);
          localStorage.setItem("reloadNeeded", "true");
          setMessage(responce?.data?.message);
          handleShow();
          setLoading(false);
          setOtp(null);
          const userRole = responce?.data?.user_role;
          if (userRole == "Admin") {
            navigate("/businessregistration", { state: { token: token } });
            localStorage.setItem("admin-token", token);
          } else if (userRole == "Client") {
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.Error;
        const message2 = error?.response?.data?.message;
        setMessage(message || message2 || "internal server error");
        handleShow();
        setLoading(false);
        setOtp(null);
      });
  };

  const reSendOtp = async () => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("token"),
      };
      const sendotp = await axios.post(
        BASEURL + "/accounts/resend-otp/nt/",
        {
          email: userEmail,
        },
        { headers }
      );

      if (sendotp) {
        setMessage(sendotp?.data?.message);
        handleShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userEmail = location?.state?.useremail;
    const clientEmails = location?.state?.clientEmail;
    setUserEmail(userEmail || clientEmails);

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [userEmail]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
      >
        <Container fluid>
          <Row className="">
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center login-image-col"
            >
              <div>
                <img
                  src="images/forwardicon.png"
                  onClick={() => window.history.back()}
                  className="pointer"
                />
              </div>
              <div>
                <img
                  src="images/verificationimg.png"
                  alt="Registration illustration"
                  className="login-image"
                />
              </div>
            </Col>
            <Col
              md={6}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2rem",
              }}
            >
              <div className="login-form-container">
                <div className="text-center">
                  <img
                    src="images/verifyicon.png"
                    className="login-icon"
                    alt="Verify icon"
                  />
                </div>
                <h1 className="mb-5 text-center verify-heading">
                  Verify Your Account
                </h1>
                <p className="text-center">
                  Thank you for registering! To finish, verify your email.
                </p>
                <p className="text-center">
                  <strong>
                    You can request a new OTP in :{" "}
                    <span
                      style={{
                        height: "32px",
                        width: "73px",
                        borderRadius: "5px",
                        background: "#5B549E",
                        color: "white",
                        display: "inline-block",
                        textAlign: "center",
                        lineHeight: "32px",
                      }}
                    >
                      {formatTime(timeLeft)}
                    </span>{" "}
                    &nbsp; seconds.
                  </strong>
                </p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <Form.Group>
                      <Form.Label>E-mail Verification:</Form.Label>
                      <div className="">
                        <OtpInput
                          className="otp-input-container"
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                    </Form.Group>
                    <div className="text-end pointer">
                      <span onClick={reSendOtp}>resend OTP</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button className="cutomebutton" type="submit">
                      Verify
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerificationForm;
