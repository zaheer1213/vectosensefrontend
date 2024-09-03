import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASEURL } from "../Commanconstans/Comman";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useAuth } from "../Utils/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let [type, setType] = useState("password");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleClose1 = () => {
    if (message == "Password is not Matched") {
      setShow(false);
    } else {
      navigate("/dashbord");
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      const payload = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          BASEURL + "/accounts/login/nt/",
          payload
        );
        if (response) {
          if (response.data.error == false) {
            const token = response?.data?.token;
            const userRole = response?.data?.user_info?.user_role;
            login(token, userRole);

            if (userRole == "Client") {
              localStorage.setItem("client-token", token);
              navigate("/home");
            } else if (userRole == "Admin") {
              localStorage.setItem("admin-token", token);
              navigate("/dashbord");
            } else if (userRole == "Agent") {
              localStorage.setItem("Agent-token", token);
              navigate("/agent-booking");
            } else if (userRole == "Superadmin") {
              localStorage.setItem("superadmin-token", token);
              navigate("/super-dashbord");
            }
            setMessage(response?.data?.message);
            handleShow();
            setEmail("");
            setPassword("");
            setLoading(false);
            setError(false);
          }
        } else {
          setLoading(false);
          setMessage(response?.data?.message);
          handleShow();
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
        setMessage(error?.response?.data?.message || "Something went wrong.");
        handleShow();
      }
    }
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
                  onClick={() => navigate("/")}
                  className="pointer"
                />
              </div>
              <img
                src="images/loginimg.png"
                alt="Registration illustration"
                className="login-image"
              />
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
                  <img src="images/loginicon.png" className="login-icon" />
                </div>
                <h1 className="mb-5 text-center loginheding">Welcome back!</h1>
                <p className="text-center">
                  Log in to manage your business, connect with customers, and
                  grow with our powerful tools.
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label className="mb-2">Email Address</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="inputheight"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                      />
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label className="mb-2">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="inputheight"
                        type={type}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                      />
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          className="pointer"
                          icon={type === "password" ? faEyeSlash : faEye}
                          onClick={() =>
                            setType(type === "password" ? "text" : "password")
                          }
                        />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex align-items-end justify-content-end pointer">
                    <p onClick={()=>navigate("/forgotpassword")}>Forgot Password?</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-center">
                    <Button className="cutomebutton" type="submit">
                      Login
                    </Button>
                  </div>

                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <NavLink to="/registration">
                      <p>
                        Not a member?{" "}
                        <span className="create-account pointer">
                          Create an account.
                        </span>
                      </p>
                    </NavLink>
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
          <Button
            variant="secondary"
            onClick={error ? handleClose : handleClose1}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
