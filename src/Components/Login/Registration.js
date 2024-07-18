// src/Login/Registration.js
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  DropdownButton,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { BASEURL, UserRoles } from "../Commanconstans/Comman";
import Loader from "../Loader/Loader";
import Countries from "../Countries";
import { useAuth } from "../Utils/AuthContext";
function Registration() {
  const { login } = useAuth();
  let [type, setType] = useState("password");
  let [type1, setType1] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(Countries[0]);
  const [check, setCheck] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }
    if (!phone) {
      newErrors.phone = "Phone Number is required";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be 6 digit long";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        username: name,
        mobile_number: phone,
        password: password,
        confirmPassword: confirmPassword,
        accepted_policy: check,
        user_role: UserRoles.ADMIN,
      };
      try {
        const response = await axios.post(
          BASEURL + "/accounts/register/nt/",
          payload
        );
        if (response) {
          const token = response?.data?.token;
          const userRole = response.data.data.user_role;
          login(token, userRole);
          setMessage(response?.data?.message);
          handleShow();
          setEmail("");
          setName("");
          setPassword("");
          setConfirmPassword("");
          navigate("/verification", { state: { useremail: email } });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const emailMessage = error?.response?.data?.message[0];
        const mobileMessage = error?.response?.data?.message[1];

        setMessage(emailMessage || mobileMessage || "Internal Server Error");
        handleShow();
      }
    } else {
      console.log("Form is invalid.");
    }
  };

  useEffect(() => {}, [type]);

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
              className="d-flex justify-content-center align-items-center flex-column register-image-col"
            >
              <div>
                <img
                  src="images/forwardicon.png"
                  onClick={() => navigate("/")}
                  className="pointer"
                />
              </div>
              <img
                src="images/register.png"
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
                  <img src="images/registericon.png" className="login-icon" />
                </div>
                <h1 className="mb-3 text-center loginheding">Welcome!</h1>
                <p className="text-center">
                  Register to unlock powerful tools, connect with customers, and
                  grow your business effortlessly.
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="inputheight"
                        type="text"
                        placeholder="Enter your name"
                        isInvalid={!!errors.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserAlt} />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="inputheight"
                        type="email"
                        placeholder="Enter Email address"
                        isInvalid={!!errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <DropdownButton
                        variant="outline-secondary"
                        title={country.dialCode}
                        id="input-group-dropdown-1"
                      >
                        {Countries.map((countryItem) => (
                          <Dropdown.Item
                            key={countryItem.value}
                            onClick={() => setCountry(countryItem)}
                          >
                            {countryItem.value} ({countryItem.dialCode})
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                      <Form.Control
                        className="inputheight"
                        type="number"
                        placeholder="Enter Phone Number"
                        isInvalid={!!errors.phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className="inputheight"
                        type={type}
                        placeholder="Enter Password"
                        isInvalid={!!errors.password}
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
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
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
                        placeholder="Enter Confirm Password"
                        isInvalid={!!errors.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={() =>
                          setType1(type1 === "password" ? "text" : "password")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={type1 === "password" ? faEyeSlash : faEye}
                        />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox" className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Check
                        type="checkbox"
                        label="I agree to the Terms and Conditions"
                        onChange={(e) => setCheck(e.target.checked)}
                        checked={check}
                      />
                    </div>
                  </Form.Group>

                  <div className="d-flex align-items-center justify-content-center">
                    <Button className="cutomebutton" type="submit">
                      Sign Up
                    </Button>
                  </div>

                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <p>
                      Already have an account?{" "}
                      <NavLink to="/login">
                        <span className="create-account pointer">
                          Log in here.
                        </span>
                      </NavLink>
                    </p>
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
}

export default Registration;
