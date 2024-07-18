import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import "./Perticularservice.css";
import Topbar from "../Topbar/Topbar";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Footer from "../../Footer/Footer";
import { TextField } from "@mui/material";
import moment from "moment/moment";

const Perticularservice = () => {
  const today = dayjs();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [servicedata, setservicedata] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); // New state for booked slots
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceID, setServiceID] = useState(null);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
    note: "",
    id: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    details: false,
    phone: false,
    city: false,
    zipcode: false,
    address: false,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getServices = async (id) => {
    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/customer/service/${id}`, {
        headers,
      })
      .then((response) => {
        setservicedata(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getServiceTimes = async (date, serviceId) => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("client-token"),
      };

      const formattedDate = moment(date.$d).format("YYYY-MM-DD"); // Format date here

      const response = await axios.get(`${BASEURL}/appointment/booked-times`, {
        params: {
          page: 1,
          limit: 10,
          date: formattedDate, // Pass formatted date here
          service_id: serviceId,
        },
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching service times:", error);
      return null;
    }
  };

  const images = [
    {
      original: "images/homecleing.png",
      thumbnail: "images/homecleing.png",
    },
    {
      original: "images/homecleing.png",
      thumbnail: "images/homecleing.png",
    },
    {
      original: "images/homecleing.png",
      thumbnail: "images/homecleing.png",
    },
  ];

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const fetchData = async () => {
      const serviceId = location?.state?.service_id;
      setServiceID(serviceId);
      if (serviceId) {
        await getServices(serviceId); // Assuming getServices is defined somewhere
        const serviceTimes = await getServiceTimes(selectedDate, serviceId);
        if (serviceTimes) {
          setTimeSlots(serviceTimes.available_slots);
          setBookedSlots(serviceTimes.booked_slots);
        } else {
          setTimeSlots([]);
          setBookedSlots([]);
        }
      }
    };
    fetchData();
  }, [location?.state?.service_id, selectedDate]);

  const handleDateChange = async (newValue) => {
    setSelectedDate(newValue);
    const serviceTimes = await getServiceTimes(newValue, serviceID);
    if (serviceTimes) {
      setTimeSlots(serviceTimes.available_slots);
      setBookedSlots(serviceTimes.booked_slots);
    } else {
      setTimeSlots([]);
      setBookedSlots([]);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBook = async () => {
    if (selectedSlot?.length === 0) {
      setError(true);
    } else {
      setError(false);
      const clientoken = localStorage.getItem("client-token");
      if (!clientoken) {
        handleShow();
      } else {
        const headers = {
          "x-access-token": localStorage.getItem("client-token"),
        };
        try {
          const response = await axios.get(BASEURL + "/accounts/user-profile", {
            headers,
          });
          handleShow();

          if (response && response.data && response.data.data) {
            const newData = response.data.data;
            setFormData({
              name: newData.username,
              email: newData.email,
              details: "",
              phone: newData.mobile_number,
              address: "",
              city: "",
              zipcode: "",
              note: "",
              id: newData.id,
            });
          }
        } catch (error) {
          console.log(error);
        }
        // navigate("/invoice");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, details, phone, address, city, zipcode } = formData;

    // Simple validation
    if (name.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: true }));
      return;
    }

    if (email.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: true }));
      return;
    }

    if (details.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, details: true }));
      return;
    }

    if (phone.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, phone: true }));
      return;
    }
    if (address.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, address: true }));
      return;
    }
    if (city.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, city: true }));
      return;
    }
    if (zipcode.trim() === "") {
      setFormErrors((prevErrors) => ({ ...prevErrors, zipcode: true }));
      return;
    }
    const payload = {
      service: serviceID,
      customer: formData.id,
      customer_name: name,
      date: moment(selectedDate).format("YYYY-MM-DD"),
      start_time: selectedSlot ? selectedSlot[0] : "",
      end_time: selectedSlot ? selectedSlot[1] : "",
      address: address,
      city: city,
      zipcode: zipcode,
      status: "Pending",
      notes: details,
      mobile: phone,
      email: email,
    };

    const headers = {
      "x-access-token": localStorage.getItem("client-token"),
    };
    await axios
      .post(BASEURL + "/appointment/booking", payload, { headers })
      .then((res) => {
        console.log(res);
        if (res.data) {
          const bookingID = res.data.data.id;
          navigate("/invoice", { state: { bookingId: bookingID } });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };
  return (
    <>
      {loading && <Loader />}
      <Topbar />
      <Container fluid>
        <Container className="perticualrservice">
          <Row>
            <Col md={6} className="firstcol">
              <div className="imggesdiv">
                <ImageGallery items={images} />
              </div>
              <div className="reviewdiv">
                <h5>Reviews</h5> <br />
                <hr className="underline" />
                <div>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      <Row>
                        <Col lg="2" className="d-flex justify-content-center">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                            className="rounded-circle shadow-1 mb-4 mb-lg-0"
                            alt="woman avatar"
                            width="80"
                            height="80"
                          />
                        </Col>
                        <Col className="text-center text-lg-start mx-auto mx-lg-0">
                          <h4 className="mb-2">
                            Lisa Cudrow - Graphic Designer
                          </h4>
                          <ul className="list-unstyled starDiv mb-3">
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                          </ul>
                          <p className="mb-0 pb-3">
                            Absolutely thrilled with the home cleaning service!
                            The team was professional, punctual, and left my
                            home sparkling clean. Highly recommend!.
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="2" className="d-flex justify-content-center">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                            className="rounded-circle shadow-1 mb-4 mb-lg-0"
                            alt="woman avatar"
                            width="80"
                            height="80"
                          />
                        </Col>
                        <Col className="text-center text-lg-start mx-auto mx-lg-0">
                          <h4 className="mb-2">
                            Lisa Cudrow - Graphic Designer
                          </h4>
                          <ul className="list-unstyled starDiv mb-3">
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faStarHalfStroke}
                                className="text-warning"
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faStar} />
                            </li>
                          </ul>
                          <p className="mb-0 pb-3">
                            Absolutely thrilled with the home cleaning service!
                            The team was professional, punctual, and left my
                            home sparkling clean. Highly recommend!.
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={6} className="secondcol">
              <div>
                <p>{servicedata.agent}</p>
                <h2>{servicedata.name}</h2>
                <div>
                  <div>
                    {servicedata?.tags?.map((item, index) => {
                      const color = generateRandomColor();
                      return (
                        <button
                          key={index}
                          className="btn custom-btn m-2"
                          style={{ backgroundColor: color, color: "white" }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p>{servicedata?.description}</p>
                </div>
              </div>
              <div className="mt-5">
                <div className="d-none">
                  <h5>Select Your Home Size</h5>
                  <hr />
                  <div>
                    <button
                      className="btn w-30"
                      style={{ color: "#5B549E", border: "1px solid #5B549E" }}
                    >
                      1 RK
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn w-30"
                      style={{ color: "#5B549E", border: "1px solid #5B549E" }}
                    >
                      1 BHK
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn w-30"
                      style={{ color: "#5B549E", border: "1px solid #5B549E" }}
                    >
                      2 BHK
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn w-30"
                      style={{ color: "#5B549E", border: "1px solid #5B549E" }}
                    >
                      3 BHK
                    </button>
                    &nbsp; &nbsp;
                    <button
                      className="btn w-30"
                      style={{ color: "#5B549E", border: "1px solid #5B549E" }}
                    >
                      BUNGALOW
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <h5>$ {servicedata.price_per_hour}/hr</h5>
                </div>
              </div>
              <Row className="mt-5">
                <Col md={6}>
                  <h5>Select Date</h5>
                  <hr />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                      minDate={today}
                    />
                  </LocalizationProvider>
                </Col>
                <Col md={6}>
                  <h5>Available Slots</h5>
                  <hr />
                  <div>
                    {timeSlots.length === 0 ? (
                      <p className="fw-bold">No Slots Available On This Day</p>
                    ) : (
                      timeSlots.map((slot, index) => {
                        const isBooked = bookedSlots.some(
                          (bookedSlot) =>
                            bookedSlot[0] === slot[0] &&
                            bookedSlot[1] === slot[1]
                        );
                        return (
                          <Button
                            key={index}
                            className="w-100 mb-2 custom-button"
                            variant={
                              selectedSlot === slot
                                ? "primary"
                                : "outline-primary"
                            }
                            onClick={() => handleSlotSelection(slot)}
                            disabled={isBooked} // Disable the button if the slot is booked
                          >
                            {slot[0]} - {slot[1]}
                          </Button>
                        );
                      })
                    )}
                  </div>
                  {error && <p className="error">Please Select Time Slots </p>}
                </Col>
              </Row>
              <div className="text-center m-5">
                <button
                  className="btn w-30"
                  style={{ color: "white", background: "#5B549E" }}
                  onClick={() => handleBook()}
                >
                  Book Now
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* form model  */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Address Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={formErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.city}
                onChange={handleChange}
                isInvalid={formErrors.city}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="zipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                isInvalid={formErrors.zipcode}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a zipcode.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="details">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                value={formData.details}
                onChange={handleChange}
                isInvalid={formErrors.details}
              />
              <Form.Control.Feedback type="invalid">
                Please provide Note.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              style={{ color: "white", background: "#5B549E" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
};

export default Perticularservice;
