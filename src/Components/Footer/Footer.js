import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../VECTOSENSELOGO.png";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASEURL } from "../Commanconstans/Comman";

const Footer = () => {
  const naviate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [show, setShow] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setformData] = useState({
    name: "",
    subject: "",
    description: "",
    email: "",
  });

  const handleClose = () => setShow(false);

  const handelInputChange = (e) => {
    const { value, name } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const movetopaartner = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.scroll(0, 0);
    naviate("/");
  };

  const handleOpen = () => {
    setShow(true);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setFile(file);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validate = () => {
    let tempErrors = {};
    tempErrors.subject = formData.subject ? "" : "Problem Name is required.";
    tempErrors.description = formData.description
      ? ""
      : "Description is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    if (validate()) {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "x-access-token": token ? token : "",
          "Content-Type": "multipart/form-data",
        };
        const data = new FormData();
        data.append("doc_file", file);
        data.append("subject", formData?.subject);
        data.append("description", formData?.description);
        data.append("email", formData.email);
        data.append("name", formData.name);

        const response = await axios.post(
          `${BASEURL}/customer/report-issue`,
          data,
          {
            headers,
          }
        );
        if (response) {
          handleClose();
          setformData({
            subject: "",
            description: "",
          });
          setFile(null);
          setImageSrc("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Container fluid className="py-1 footercolor">
        <Container className="mt-5">
          <Row>
            <Col md={4}>
              <div className="footersection">
                <div className="footerlogo">
                  <img src={logo} className="footer" alt="" decoding="async" />
                </div>
                <p className="text-light mt-3">
                  VectoSense is your comprehensive solution for diverse
                  services. We pride ourselves on delivering tailored services
                  to meet your unique needs, ensuring top-notch quality and
                  customer satisfaction.
                </p>
                <div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "25px",
                    }}
                  >
                    <div className="m-3">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <div className="m-3">
                      <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="m-3">
                      <FontAwesomeIcon icon={faFacebook} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4 mb-md-0">
                <h5 className="text-uppercase text-light">Quick links</h5>
                {userRole === "Admin" ? (
                  <div className="link-animated d-flex flex-column justify-content-start mt-3">
                    <div className="text-light mb-2">Home</div>
                    <div className="text-light mb-2">About Us</div>
                    <div className="text-light mb-2">Services</div>
                    <div className="text-light mb-2">Pricing</div>
                    <div
                      className="text-light mb-2 pointer"
                      onClick={() => movetopaartner()}
                    >
                      Grow With Us
                    </div>
                  </div>
                ) : (
                  <div className="link-animated d-flex flex-column justify-content-start mt-3">
                    <NavLink to="/home" className="custom-link">
                      <div className="text-light mb-2">Home</div>
                    </NavLink>
                    <div
                      className="text-light mb-2 pointer"
                      onClick={() => movetopaartner()}
                    >
                      Grow With Us
                    </div>
                    <div
                      className="text-light mb-2 pointer"
                      onClick={() => handleOpen()}
                    >
                      Report a Problem
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-4 mb-md-0">
                <h5 className="text-uppercase text-light">LEGAL</h5>
                <div className="link-animated d-flex flex-column justify-content-start mt-3">
                  <NavLink to="/termscondition" className="custom-link">
                    <div className="text-light mb-2">Terms And Conditions</div>
                  </NavLink>
                  <NavLink to="/privacyPolicy" className="custom-link">
                    <div className="text-light mb-2">Privacy Policy</div>
                  </NavLink>
                  <NavLink to="/refund" className="custom-link">
                    <div className="text-light mb-2">Refund</div>
                  </NavLink>
                  <div
                    className="text-light mb-2 pointer"
                    onClick={() => handleOpen()}
                  >
                    Report a Problem
                  </div>
                  {/* <div className="text-light mb-2">Cookies Policy</div> */}
                </div>
              </div>
            </Col>
            <div className="text-white text-center">
              {" "}
              <h6>
                Powered by @ Connect And Discover Business Solutions Private
                Limited.
              </h6>
            </div>
          </Row>
        </Container>
      </Container>

      {/* report problem */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <div className="hedingdiv">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{ fontSize: "30px", color: "red" }}
              />{" "}
              &nbsp;&nbsp;
              <h3>Report a Problem</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <small>
              Help Us Improve by Reporting Issues—Your Feedback Drives Our
              Solutions.
            </small>
          </div>
          <div>
            <h4>Problem Section</h4>
            <hr />
            <Form>
              <Col>
                <Form.Group className="mb-3" controlId="formBusinessName">
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handelInputChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBusinessName">
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handelInputChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBusinessName">
                  <Form.Label>Name the Problem </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a concise title for the probleme"
                    name="subject"
                    value={formData.subject}
                    onChange={handelInputChange}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Problem Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Provide a detailed explanation of what is happening"
                    value={formData.description}
                    onChange={handelInputChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Upload Images</Form.Label>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #007bff",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragActive ? "#f0f0f0" : "white",
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Upload Images (Multiple)</p>
                  )}
                </div>
                {imageSrc && (
                  <Row className="justify-content-center mt-3">
                    <Col md={6} className="text-center">
                      <Image
                        src={imageSrc}
                        alt="Selected Image"
                        fluid
                        style={{ height: "100px", width: "100px" }}
                      />
                      <Button
                        variant="danger"
                        className="mt-3"
                        onClick={() => setImageSrc(null)}
                      >
                        Remove Image
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Footer;
