import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { BASEURL } from "../Commanconstans/Comman";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  let [type, setType] = useState("password");
  let [type1, setType1] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${BASEURL}/accounts/reset-pass/nt/`,
        payload
      );
      if (response.data) {
        setLoading(false);
        navigate("/login");
        // setShow(true);
        // setMessage(response.data.Success);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {loading ? <Loader /> : ""}
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
              <img src="/images/forgotpasswordimg.png" alt="section img" />
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <div className="text-center mb-4">
              <img src="/images/lockicon.png" alt="lock-icon" />
            </div>
            <div className="text-center mb-4">
              <h1 className="text-center">Reset Password</h1>
              <p>Enter a new password below to change your password.</p>
            </div>
            <div>
              <Form className="forgotpassword-form">
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="mb-2">Email Address</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="inputheight"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "350px" }}
                    />
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    {error && (
                      <p className="text-danger">
                        please enter valid email address
                      </p>
                    )}
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Enter New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="inputheight"
                      type={type}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setType(type === "password" ? "text" : "password")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={type === "password" ? faEyeSlash : faEye}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  controlId="formBasicConfirmPassword"
                  className="mb-3"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="inputheight"
                      type={type1}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setType1(type1 === "password" ? "text" : "password")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={type === "password" ? faEyeSlash : faEye}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    className="cutomebutton"
                    onClick={() => handleSubmit()}
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {/* model  */}
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

export default Resetpassword;
