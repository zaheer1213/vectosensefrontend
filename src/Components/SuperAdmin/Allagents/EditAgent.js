import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Dropdown,
  InputGroup,
  DropdownButton,
  Modal,
} from "react-bootstrap";
import Countries from "../../Countries";
import axios from "axios";
import { BASEURL, UserRoles } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import MultiSelectDropdown from "../../MultiSelectDropdown";

const EditAgent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [country, setCountry] = useState(Countries[0]);
  const [imageSrc, setImageSrc] = useState("images/image.png");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [service, setServices] = useState([]);
  const [error, setError] = useState(false);
  const [id, setId] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleClose1 = () => {
    setShow(false);
    // navigate("/dashbord");
    window.history.back();
  };
  const handleShow = () => setShow(true);
  const [initialAgentData, setInitialAgentData] = useState(null);
  const [agentData, setAgentData] = useState({
    username: "",
    email: "",
    mobile_number: "",
    password: "",
    profile_pic: "",
    user_role: UserRoles.AGENT,
    status: "",
    service_id: [],
  });

  const validateForm = () => {
    const newErrors = {};
    if (!agentData.username) newErrors.username = "User Name is required";
    if (!agentData.email) newErrors.email = "Email is required";
    if (!agentData.mobile_number)
      newErrors.mobile_number = "Mobile number is required";
    if (!agentData.password) newErrors.password = "Password is required";
    if (!agentData.status) newErrors.status = "Status is required";
    if (!file) newErrors.file = "Please upload a logo.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData({ ...agentData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the field being changed
  };
  const handleServiceChange = (selectedOptions) => {
    setAgentData((prevState) => ({
      ...prevState,
      service_id: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) return;
    const data = new FormData();
    data.append("username", agentData.username);
    data.append("email", agentData.email);
    data.append("mobile_number", agentData.mobile_number);
    data.append("password", agentData.password);
    data.append("profile_pic", file);
    data.append("user_role", agentData.user_role);
    data.append("status", agentData.status);
    // const selectedServices = agentData.service_id.map((id) => id);
    data.append("service_id", JSON.stringify(agentData.service_id));
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    setLoading(true);
    axios
      .post(BASEURL + "/service-provider/agent", data, { headers })
      .then((response) => {
        if (response) {
          handleShow();
          setMessage("Agent Created Successfully");
          setLoading(false);
          setError(false);
        }
      })
      .catch((error) => {
        const errormessage = error?.response?.data?.message;
        setError(true);
        setLoading(false);
        setMessage(errormessage || "internal server error");
        handleShow();
      });
  };

  const handleCountryChange = (dialCode, countryName) => {
    setCountry({ name: countryName, dialCode });
  };

  const getAllServices = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    await axios
      .get(BASEURL + "/superadmin/service?page=1&limit=10", {
        headers,
      })
      .then((responce) => {
        if (responce) {
          setServices(responce.data.rows);
        }
      })
      .catch((error) => console.log(error));
  };
  const getAgentbyid = async (agentID) => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("token"),
      };
      setLoading(true);
      await axios
        .get(`${BASEURL}/superadmin/agent/${agentID}`, { headers })
        .then((responce) => {
          const apiResponse = responce?.data?.data;
          setAgentData({
            username: apiResponse.username,
            email: apiResponse.email,
            mobile_number: apiResponse.mobile_number,
            password: apiResponse.password,
            profile_pic: apiResponse.profile_pic,
            user_role: apiResponse.user_role,
            status: apiResponse.status,
            service_id: responce?.data?.service_data,
          });
          setInitialAgentData(responce?.data?.data);
          setImageSrc(
            apiResponse.profile_pic
              ? BASEURL + apiResponse.profile_pic
              : "images/image.png"
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const editAgent = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = new FormData();
    if (agentData.username !== initialAgentData.username) {
      data.append("username", agentData.username);
    }
    if (agentData.email !== initialAgentData.email) {
      data.append("email", agentData.email);
    }
    if (agentData.mobile_number !== initialAgentData.mobile_number) {
      data.append("mobile_number", agentData.mobile_number);
    }
    if (agentData.password !== initialAgentData.password) {
      // Only include password if it's not empty
      data.append("password", agentData.password);
    }
    if (file) {
      // Check if a new file is uploaded
      data.append("profile_pic", file);
    }
    if (agentData.user_role !== initialAgentData.user_role) {
      data.append("user_role", agentData.user_role);
    }
    if (agentData.status !== initialAgentData.status) {
      data.append("status", agentData.status);
    }
    if (agentData.service_id !== initialAgentData.service_id) {
      data.append("service_id", JSON.stringify(agentData.service_id));
    }

    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    await axios
      .put(`${BASEURL}/superadmin/agent/${id}`, data, { headers })
      .then((response) => {
        if (response) {
          window.history.back();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const agentid = location.state;
    if (agentid) {
      setId(agentid);
      getAgentbyid(agentid);
    }
    getAllServices();
  }, []);
  return (
    <>
      {loading ? <Loader /> : ""}
      <Container fluid className="">
        <Row>
          <Col className="p-0" md={4}>
            <div className="agentsidebar">
              <div className="agentsidebar">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="images/forwardicon.png"
                    onClick={() => window.history.back()}
                    className="pointer mb-3"
                    alt="Forward Icon"
                  />
                  <img
                    src={imageSrc}
                    style={{
                      height: "253px",
                      width: "256px",
                      borderRadius: "1000px",
                    }}
                    alt="Business Logo"
                  />
                </div>
                <div className="text-center">
                  <Button
                    onClick={handleButtonClick}
                    style={{
                      background: "white",
                      color: "black",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {errors.file && (
                    <div className="text-danger" style={{ marginTop: "10px" }}>
                      {errors.file}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col className="p-0" md={8}>
            <div className="agentSeconddiv ">
              <h1 className="topmargin">{id ? "Edit" : "Add New"} Agent</h1>
              <div className="">
                <p className="">
                  Register to unlock powerful tools, connect with customers, and
                  grow your business effortlessly.
                </p>
              </div>
              <Form onSubmit={id ? editAgent : handleSubmit}>
                <h5 className="mt-5">Agent Details</h5>
                <hr />
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter agent's full name"
                        name="username"
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                        className="input-height-48"
                        value={agentData.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label> Email </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter agent's email"
                        name="email"
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        className="input-height-48"
                        value={agentData.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label> Number</Form.Label>
                      <Row>
                        <InputGroup>
                          <DropdownButton
                            variant="outline-secondary"
                            title={country.dialCode || "Select Country"}
                            id="input-group-dropdown-1"
                            className="input-height-48"
                          >
                            {Countries.map((countryItem) => (
                              <Dropdown.Item
                                key={countryItem.value}
                                onClick={() =>
                                  handleCountryChange(
                                    countryItem.dialCode,
                                    countryItem.value
                                  )
                                }
                              >
                                {countryItem.value} ({countryItem.dialCode})
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                          <Form.Control
                            name="mobile_number"
                            type="text"
                            placeholder="00000 00000"
                            isInvalid={!!errors.mobile_number}
                            value={agentData.mobile_number}
                            onChange={handleChange}
                            className="input-height-48"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mobile_number}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="status"
                        onChange={handleChange}
                        value={agentData.status}
                        isInvalid={!!errors.status}
                        className="input-height-48"
                      >
                        <option>Status</option>
                        <option value="true">Active</option>
                        <option value="false">InActive</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formServices">
                      <Form.Label>Assign Services</Form.Label>
                      <MultiSelectDropdown
                        options={service}
                        selectedOptions={agentData.service_id}
                        onChange={handleServiceChange}
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Set Password</Form.Label>
                      <Form.Control
                        className="input-height-48"
                        type="password"
                        placeholder="******"
                        name="password"
                        value={agentData.password}
                        isInvalid={!!errors.password}
                        onChange={handleChange}
                        disabled={id}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="" className="longbtn mb-3" type="submit">
                  {id ? "Edit Agent" : "Add Agent"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={error ? handleClose : handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "#5b549e" }}
            onClick={error ? handleClose : handleClose1}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditAgent;
