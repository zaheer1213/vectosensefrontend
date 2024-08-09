import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Dropdown,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import { BASEURL } from "../../Commanconstans/Comman";
import { useDropzone } from "react-dropzone";
import Loader from "../../Loader/Loader";

const Promotionalservices = () => {
  const [formData, setFormData] = useState({
    title: "",
    promotionType: "",
    startDate: "",
    endDate: "",
    purchaseAmount: "",
    description: "",
    selectedServices: [],
  });
  const [imageSrc, setImageSrc] = useState("");
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleClose = () => {
    setShow(false);
    window.history.back();
  };

  // Drag and drop for image
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

  const handleSelect = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedServices: prevFormData.selectedServices.includes(option)
        ? prevFormData.selectedServices.filter((item) => item !== option)
        : [...prevFormData.selectedServices, option],
    }));
  };

  const getAllServices = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    try {
      const response = await axios.get(
        `${BASEURL}/superadmin/service?page=10&limit=50`,
        { headers }
      );
      setServices(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceById = async (id) => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("token"),
      };
      const response = await axios.get(
        `${BASEURL}/superadmin/promotional-service/${id}`,
        { headers }
      );
      if (response) {
        const responseData = response.data.data;
        setImageSrc(BASEURL + responseData.banner_image);
        setFormData({
          title: responseData.title,
          promotionType: responseData.promotional_parameter,
          startDate: responseData.start_date,
          endDate: responseData.end_date,
          purchaseAmount: responseData.purchase_amount,
          description: responseData.description,
          selectedServices: [responseData.service],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      // Regex to check if the date format is YYYY-MM-DD
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (!datePattern.test(value)) {
        setErrors({
          ...errors,
          [name]: "Please enter a valid date in the format DD-MM-YYYY",
        });
      } else {
        // Extract the year from the date
        const year = parseInt(value.split("-")[0], 10);
        const currentYear = new Date().getFullYear();

        // Check if the year is a 4-digit number and within a valid range
        if (year < 1900 || year > currentYear) {
          setErrors({
            ...errors,
            [name]: "Please enter a year between 1900 and the current year",
          });
        } else {
          // Clear the error if the date is valid
          setErrors({
            ...errors,
            [name]: "",
          });
        }
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validate = () => {
    let tempErrors = {};
    tempErrors.title = formData.title ? "" : "Title is required.";
    tempErrors.promotionType = formData.promotionType
      ? ""
      : "Promotion Type is required.";
    tempErrors.startDate = formData.startDate ? "" : "Start Date is required.";
    tempErrors.endDate = formData.endDate ? "" : "End Date is required.";
    tempErrors.purchaseAmount = formData.purchaseAmount
      ? ""
      : "Purchase Amount is required.";
    tempErrors.description = formData.description
      ? ""
      : "Description is required.";
    tempErrors.selectedServices =
      formData.selectedServices.length > 0
        ? ""
        : "At least one service must be selected.";
    if (!editId) {
      tempErrors.file = file ? "" : "Image file is required.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const data = new FormData();

      // Add fields only if they have been modified or are required
      if (formData.title) data.append("title", formData.title);
      if (formData.promotionType)
        data.append("promotional_parameter", formData.promotionType);
      if (formData.startDate) data.append("start_date", formData.startDate);
      if (formData.endDate) data.append("end_date", formData.endDate);
      if (formData.purchaseAmount)
        data.append("purchaseAmount", formData.purchaseAmount);
      if (formData.description)
        data.append("description", formData.description);
      if (formData.selectedServices.length > 0)
        data.append("service", formData.selectedServices[0]);
      if (file) data.append("banner_image", file);

      try {
        setLoading(true);
        const headers = {
          "x-access-token": localStorage.getItem("superadmin-token"),
          "Content-Type": "multipart/form-data",
        };

        const url = editId
          ? `${BASEURL}/superadmin/promotional-service/${editId}`
          : `${BASEURL}/superadmin/promotional-service`;

        const method = editId ? "put" : "post";

        const response = await axios({
          method,
          url,
          data,
          headers,
        });

        if (response.data) {
          setLoading(false);
          setShow(true);
          setMessage(
            editId
              ? "Service updated successfully"
              : "Service added successfully"
          );
          setFormData({
            title: "",
            promotionType: "",
            startDate: "",
            endDate: "",
            purchaseAmount: "",
            description: "",
            selectedServices: [],
          });
          window.location.back();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  useEffect(() => {
    const serviceId = window.history.state.usr;
    setEditId(serviceId);
    if (serviceId) {
      getServiceById(serviceId);
    }
    getAllServices();
  }, []);
  return (
    <>
      {" "}
      {loading ? <Loader /> : ""}
      <Container>
        <Row>
          <Col>
            <img
              src="images/Frame 1321316250.png"
              onClick={() => window.history.back()}
              className="pointer topmargin"
            />
            <h1 className="mt-3">Promote Service</h1>
            <Form onSubmit={handleSubmit}>
              <Row className="py-5 mb-5 justify-content-center">
                <Col md={6}>
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
                      <p>Drag & drop an image here, or click to select one</p>
                    )}
                  </div>
                  {errors.file && <p className="text-danger">{errors.file}</p>}
                </Col>
              </Row>
              {imageSrc && (
                <Row className="justify-content-center mt-3">
                  <Col md={6} className="text-center">
                    <Image src={imageSrc} alt="Selected Image" fluid />
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

              <h5>Promotion Details</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Service Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input-height-48"
                    />
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPromotionType">
                    <Form.Label>Promotion Parameters</Form.Label>
                    <Form.Select
                      name="promotionType"
                      value={formData.promotionType}
                      onChange={handleChange}
                    >
                      <option value="">Select Promotion Type</option>
                      <option value="offer">Offer</option>
                      <option value="sale">Sale</option>
                    </Form.Select>
                    {errors.promotionType && (
                      <p className="text-danger">{errors.promotionType}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="input-height-48"
                    />
                    {errors.startDate && (
                      <p className="text-danger">{errors.startDate}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPurchaseAmount">
                    <Form.Label>Minimum Purchase Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Purchase Amount"
                      name="purchaseAmount"
                      value={formData.purchaseAmount}
                      onChange={handleChange}
                      className="input-height-48"
                    />
                    {errors.purchaseAmount && (
                      <p className="text-danger">{errors.purchaseAmount}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="input-height-48"
                    />
                    {errors.endDate && (
                      <p className="text-danger">{errors.endDate}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formServices"
                    style={{ position: "relative" }}
                  >
                    <Form.Label>Assign Services</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{ width: "100%", background: "#5B549E" }}
                      >
                        {formData.selectedServices.length > 0
                          ? `Selected Services: ${formData.selectedServices.length}`
                          : "Select Services"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          width: "100%",
                        }}
                      >
                        {services.map((service) => (
                          <Dropdown.Item
                            key={service.id}
                            onClick={() => handleSelect(service.id)}
                            active={formData.selectedServices.includes(
                              service.id
                            )}
                          >
                            {service.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    {errors.selectedServices && (
                      <p className="text-danger">{errors.selectedServices}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-danger">{errors.description}</p>
                )}
              </Form.Group>
              <Row className="justify-content-center mt-5">
                <Col md={3}>
                  <Button
                    className="w-100 btn-md"
                    style={{ background: "#5B549E" }}
                    type="submit"
                  >
                    {editId ? "Edit" : "Add"} Promotion
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* SUCESS MODEL */}
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

export default Promotionalservices;
