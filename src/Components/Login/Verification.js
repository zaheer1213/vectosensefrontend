import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";
import { BASEURL } from "../Commanconstans/Comman";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [userEmail, setUserEmail] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleShow = () => setShow(true);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    const payload = {
      email: userEmail,
      email_otp: otp,
    };
    await axios
      .post(BASEURL + "/accounts/verify-otp/nt/", payload)
      .then((responce) => {
        if (responce) {
          navigate("/resetpassword");
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.Error;
        const message2 = error?.response?.data?.message;
        setMessage(message || message2 || "internal server error");
        handleShow();
        console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow(false);
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
  return (
    <>
      <Container fluid className="forgetpassword">
        <Row className="align-items-stretch">
          <Col md={6} className="forget-imagediv flex-column">
            <div>
              <img
                src="images/forwardicon.png"
                onClick={() => window.history.back()}
                className="pointer"
              />
            </div>
            <div className="forgotpasswordimg">
              <img src="images/verificationimg.png" alt="section img" />
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <div className="text-center mb-4">
              <img src="/images/verify.png" alt="lock-icon" />
            </div>
            <div className="text-center mb-4">
              <h1>Verify Your Account</h1>
              <p>To finish, verify your OTP.</p>
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
            </div>
            <div>
              <Form className="forgotpassword-form">
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>E-mail Verification:</Form.Label>
                    <div className="">
                      <OtpInput
                        className=""
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{
                              width: "50px", // Adjust the width here
                              height: "50px", // You can adjust the height as well
                              fontSize: "20px", // Optional: Increase font size for better visibility
                              textAlign: "center", // Optional: Center text within input
                            }}
                          />
                        )}
                      />
                    </div>
                  </Form.Group>
                  <div className="text-end pointer">
                    <span onClick={reSendOtp}>resend OTP</span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    className="cutomebutton"
                    onClick={() => handleSubmit()}
                  >
                    Verify
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-3 pointer">
                  <p onClick={() => navigate("/login")}>
                    Back to <span style={{ color: "#5B549E" }}>Login</span>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* model */}
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

export default Verification;
