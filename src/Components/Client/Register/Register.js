import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faHandsWash,
  faStar,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import "./Register.css";
import Countries from "../../Countries";
import {
  BASEURL,
  GOOGLECLINETID,
  UserRoles,
} from "../../Commanconstans/Comman";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();
  let [type, setType] = useState("password");
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
  const [countries, setCountries] = useState([]);

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
        user_role: UserRoles.CLIENT,
        super_admin: "",
      };
      try {
        const response = await axios.post(
          BASEURL + "/accounts/register/nt/",
          payload
        );
        if (response) {
          const token = response?.data?.token;
          localStorage.setItem("clientoken", token);
          setMessage(response?.data?.message);
          handleShow();
          setEmail("");
          setName("");
          setPassword("");
          setConfirmPassword("");
          navigate("/verification", { state: { clientEmail: email } });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
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

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryData = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.cca2,
          dialCode:
            country.idd.root +
            (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        }));
        setCountries(countryData);
      })
      .catch((error) => console.error("Error fetching countries data:", error));
  }, []);

  // const handleLoginSuccess = (response) => {
  //   console.log("Login Success:", response);
  //   const credentialResponceDecode = jwtDecode(response.credential);
  //   console.log(credentialResponceDecode)
  // };

  // const handleLoginFailure = (error) => {
  //   console.error("Login Failure:", error);
  // };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      // Send user info to your backend
      // axios
      //   .post("/api/auth/google", {
      //     email: userInfo.data.email,
      //     name: userInfo.data.name,
      //     token: tokenResponse.access_token,
      //   })
      //   .then((response) => {
      //     console.log("Login successful", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error logging in", error);
      //   });
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center no-padding full-height"
      >
        <Container fluid className="no-padding">
          <Row className="no-padding full-height">
            <Col md={6} className="agentCol">
              <div className="text-center">
                <img
                  src="images/groupImg.png"
                  alt="Registration illustration"
                  className="agent-login-image mt-3"
                />
                <div className="row reviewdiv " style={{ color: "white" }}>
                  <ul className="list-unstyled starDiv mb-3">
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                    </li>
                  </ul>
                  <p className="px-xl-3">
                    "We love Landingfolio! Our designers were using it for their
                    <br />
                    projects, so we already knew what kind of design they want."
                  </p>
                  <div className="col-12 starDiv mb-5 ">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                      className="rounded-circle shadow-1-strong me-3"
                      width="45"
                      height="45"
                      alt="User Avatar"
                    />
                    <div className="text-start">
                      <h5 className="mb-0">Devon Lane</h5>
                      <h6 className="mb-3">Co-Founder, Design.cor</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col
              md={6}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div>
                <h1 className="mb-3 text-center loginheding">
                  Welcome!{" "}
                  <img
                    src="images/hand-wave-icon-18.png"
                    style={{ height: "70px", width: "70px" }}
                  />
                </h1>
                <p className="text-center">
                  Register to unlock powerful tools, connect with <br />
                  customers, and grow your business effortlessly.
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                {/* <GoogleLogin
                  clientId={GOOGLECLINETID}
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                  buttonText="Login with Google"
                  cookiePolicy={"single_host_origin"}
                /> */}
                <GoogleOAuthProvider clientId={GOOGLECLINETID}>
                  <Button
                    className="cutomebutton1"
                    type="submit"
                    onClick={() => login()}
                  >
                    <img
                      src="images/Group 1000006014.png"
                      height={23}
                      width={23}
                    />
                    &nbsp;&nbsp;&nbsp; Sign up with Google{" "}
                  </Button>
                </GoogleOAuthProvider>
              </div>
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="inputheight bordered-input"
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
                      placeholder="Email address"
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
                      placeholder="00000 00000"
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
                      placeholder="Password"
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
                      type={type}
                      placeholder="Confirm Password"
                      isInvalid={!!errors.confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register;
