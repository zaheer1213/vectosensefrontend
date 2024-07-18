import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./Service.css";
import Loader from "../../Loader/Loader";
import { BASEURL } from "../../Commanconstans/Comman";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Service = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("images/image.png");
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [serviceName, setServiceName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [openingDay, setOpeningDay] = useState("");

  // State for days and times
  const [selectedDays, setSelectedDays] = useState([]);
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("");
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("18:00");

  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({});
  const [timeValue, setTimeValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [id, setId] = useState(null);
  const [initialServiceData, setinitialServiceData] = useState(null);

  const handleClose = () => setShow(false);

  const handleClose1 = () => {
    setShow(false);
    // navigate("/dashbord");
    window.history.back();
  };
  const handleSliderChange = (e) => {
    setTimeValue(e.target.value);
  };

  const getAllCategory = async () => {
    const token = localStorage.getItem("token");

    // Check if token is available
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    try {
      const response = await fetch(
        `${BASEURL}/service-provider/service-category?page=1&limit=10`,
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAllCategory(data.rows);
    } catch (error) {
      console.error("Failed to fetch:", error.message);
    }
  };

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      setErrors({ file: "Please upload a valid image file." });
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!serviceName) newErrors.serviceName = "Service Name is required";
    if (!category) newErrors.category = "Category is required";
    if (!description) newErrors.description = "Description is required";
    if (!status) newErrors.status = "Status is required";
    // if (!openingDay) newErrors.openingDay = "Opening Day is required";
    // if (!openingTime) newErrors.openingTime = "Opening Time is required";
    // if (!closingTime) newErrors.closingTime = "Closing Time is required";
    if (!price) newErrors.price = "Price is required";
    if (!tags.length) newErrors.tags = "Tags are required";
    // if (!file) newErrors.file = "Service Image is required";

    if (days.length === 0) {
      newErrors.days =
        "At least one day must be added with opening and closing times";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
      event.preventDefault();
    } else if (event.key === "Backspace" && !inputValue && tags.length) {
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  const validateInputs = () => {
    if (!serviceName || !category || !description || !status || !price) {
      alert("Please fill out all required fields.");
      return false;
    }
    if (isNaN(price)) {
      alert("Price must be a number.");
      return false;
    }
    return true;
  };

  const handleAddDay = () => {
    if (day && openingTime && closingTime) {
      setDays([
        ...days,
        { day, opening_time: openingTime, closing_time: closingTime },
      ]);
      // setDay("");
      // setOpeningTime("");
      // setClosingTime("");
    } else {
      setErrors({
        ...errors,
        dayEntry: "All fields (Day, Opening Time, Closing Time) are required",
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", serviceName);
    formData.append("category", category);
    formData.append("price_per_hour", parseInt(price));
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("buffer_time", timeValue);
    formData.append("status", status);
    formData.append("service_times", JSON.stringify(days));
    if (file) {
      formData.append("service_logo", file);
    }

    if (id) {
      // Editing existing service
      axios
        .put(`${BASEURL}/service-provider/service/${id}`, formData, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data.error) {
            setMessage(response.data.message);
            setShow(true);
            setError(true);
          } else {
            setMessage("Service Updated Successfully");
            setShow(true);
            setError(false);
          }
        })
        .catch((error) => {
          console.error("Error updating service:", error);
          setError(true);
          setLoading(false);
        });
    } else {
      // Adding new service
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      axios
        .post(`${BASEURL}/service-provider/service`, formData, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data.error) {
            setMessage(response.data.message);
            setShow(true);
            setError(true);
          } else {
            setMessage("Service Created Successfully");
            setShow(true);
            setError(false);
          }
        })
        .catch((error) => {
          console.error("Error creating service:", error);
          setError(true);
          setLoading(false);
        });
    }
  };

  const getServiceById = async (serviceID) => {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/service-provider/service/${serviceID}`, { headers })
      .then((responce) => {
        setLoading(false);
        const serviceData = responce.data.data;
        setImageSrc(
          serviceData.service_logo
            ? BASEURL + serviceData.service_logo
            : "images/image.png"
        );
        setinitialServiceData(serviceData);
        setServiceName(serviceData.name);
        setCategory(serviceData.category);
        setStatus(serviceData.status);
        setDescription(serviceData.description);
        setTags(serviceData.tags);
        setPrice(serviceData.price_per_hour);
        setDays(serviceData.service_times);
        setTimeValue(serviceData.buffer_time);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };
  const handleAddDays = () => {
    if (selectedDays.length === 0) {
      setErrors({ days: "Please select at least one day." });
      return;
    }

    // Validation for duplicate days with same opening and closing times
    const hasDuplicates = selectedDays.some((day) =>
      days.some(
        (d) =>
          d.day === day &&
          d.opening_time === openingTime &&
          d.closing_time === closingTime
      )
    );

    if (hasDuplicates) {
      setErrors({ days: "Duplicate entry for the same day and time." });
      return;
    }

    setErrors({});

    // Format opening and closing times to include AM/PM using Moment.js
    const formattedOpeningTime = moment(openingTime, "HH:mm").format("hh:mm A");
    const formattedClosingTime = moment(closingTime, "HH:mm").format("hh:mm A");

    const newDays = selectedDays.map((day) => ({
      day,
      opening_time: formattedOpeningTime,
      closing_time: formattedClosingTime,
    }));
    setDays((prevDays) => [...prevDays, ...newDays]);
    setSelectedDays([]);
  };
  const handleRemoveDay = (index) => {
    setDays((prevDays) => prevDays.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const serviceId = location.state;
    setId(serviceId);
    if (serviceId) {
      getServiceById(serviceId);
    }

    getAllCategory();
  }, []);
  return (
    <>
      {loading ? <Loader /> : ""}
      <Container fluid>
        <Row>
          <Col className="p-0" md={4}>
            <div className="serviceHeader">
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
                    borderRadius: "10px",
                    marginTop: "200px",
                  }}
                  alt="Business Logo"
                />
              </div>
              <Button
                onClick={handleButtonClick}
                style={{
                  background: "white",
                  color: "black",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                Upload Service Image
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
          </Col>
          <Col className="p-0" md={8}>
            <div className="serviceSeconddiv">
              <h1 className="topmargin">
                {id ? "Edit Service" : "Add New Service"}{" "}
              </h1>
              <div className="">
                <p className="">
                  Use this form to add a new service to your offerings. Provide
                  the necessary details to accurately describe the service.
                </p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* <Col md={6}> */}
                  <h5 className="mt-3">Service Details</h5>
                  <hr className="underline" />
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="formServiceName">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter service name"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          isInvalid={!!errors.serviceName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.serviceName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Select Categories</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          isInvalid={!!errors.category}
                        >
                          <option value="">Select Categories</option>
                          {allCategory &&
                            allCategory.map((responce) => {
                              return (
                                <option value={responce.id}>
                                  {responce.category_name}
                                </option>
                              );
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.category}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          isInvalid={!!errors.status}
                        >
                          <option value="">Select Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>Inactive</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="mt-3">Add Tags</h5>
                  <hr className="underline" />
                  <Row>
                    <Col md={4}>
                      <Form.Label>Add Tags </Form.Label>
                      <div className="tags-input-container">
                        {tags &&
                          tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                              {tag}
                              <button
                                type="button"
                                className="remove-tag-button"
                                onClick={() => handleRemoveTag(index)}
                              >
                                x
                              </button>
                            </div>
                          ))}
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type and press enter"
                        />
                      </div>
                    </Col>
                  </Row>
                  <h5 className="mt-3">Price</h5>
                  <hr className="underline" />
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price/Hour</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="250"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className="mb-3" controlId="formPriceUnit">
                        <Form.Control
                          style={{ marginTop: "28px" }}
                          type="text"
                          value="CA$/Hour"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h5 className="mt-3">Service Timing</h5>
                  <hr className="underline" />
                </Row>
                <Row>
                  <Form.Label>Opening Hours</Form.Label>
                  <Col md={4}>
                    <Form.Label>Days</Form.Label>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <Form.Check
                        key={day}
                        type="checkbox"
                        label={day}
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                    ))}
                    {errors.days && (
                      <span className="error">{errors.days}</span>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Label>Opening Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>Closing Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                    />
                  </Col>
                  <Col md={12} className="d-flex justify-content-end">
                    <Button onClick={handleAddDays} className="servicebtn mt-3">
                      Add Days
                    </Button>
                  </Col>
                  {days.length > 0 && (
                    <ul>
                      {days.map((d, index) => (
                        <li key={index}>
                          {d.day}: {d.opening_time} - {d.closing_time}{" "}
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger pointer"
                            onClick={() => handleRemoveDay(index)}
                            title="remove"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </Row>
                <Row>
                  <h5 className="mt-3">Buffer Time</h5>
                  <hr className="underline" />
                  <Col md={4}>
                    <Form.Label>Range</Form.Label>
                    <Form.Range
                      min={0}
                      max={60}
                      value={timeValue}
                      onChange={handleSliderChange}
                    />
                    <div>Selected Time: {formatTime(timeValue)} Min</div>
                  </Col>
                </Row>
                <Button variant="" type="submit" className="longbtn mb-3">
                  {id ? "Edit Service" : "Add Service"}
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

export default Service;
