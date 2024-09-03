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
  const [shuffledReviews, setShuffledReviews] = useState([]);

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
    if (!localStorage.getItem("client-token")) {
      navigate("/clientlogin");
    } else {
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
            const response = await axios.get(
              BASEURL + "/accounts/user-profile",
              {
                headers,
              }
            );
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
      amount: servicedata?.price_per_hour,
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
          if (res.data.pay_page_url) {
            window.location.href = res.data.pay_page_url;
          }
          // navigate("/invoice", { state: { bookingId: bookingID } });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
  };

  const reviews = [
    {
      id: 1,
      Username: "Neha Sinha",
      Designation: "Graphic Designer",
      Rating: "3",
      Description:
        "The service was exceptional. The professionals were on time, friendly, and got the job done efficiently. Highly recommend!",
    },
    {
      id: 2,
      Username: "Rajesh Verma",
      Designation: "Software Engineer",
      Rating: "4",
      Description:
        "Had a great experience. The booking process was seamless and the service quality was commendable. Will definitely use it again.",
    },
    {
      id: 3,
      Username: "Priya Sharma",
      Designation: "Marketing Specialist",
      Rating: "3",
      Description:
        "Absolutely wonderful! The team was professional and meticulous. They went above and beyond my expectations.",
    },
    {
      id: 4,
      Username: "Rohit Patel",
      Designation: "Freelance Writer",
      Rating: "5",
      Description:
        "Service was okay but there was room for improvement. There were some delays, but the job was done satisfactorily.",
    },
    {
      id: 5,
      Username: "Arjun Nair",
      Designation: "Teacher",
      Rating: "3",
      Description:
        "Good service. The booking process was easy and the professionals were skilled. Will definitely book again in the future.",
    },
  ];

  const shuffleReviews = (reviewsArray) => {
    for (let i = reviewsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviewsArray[i], reviewsArray[j]] = [reviewsArray[j], reviewsArray[i]];
    }
    return reviewsArray;
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
    setShuffledReviews(shuffleReviews([...reviews]));
  }, [location?.state?.service_id, selectedDate]);

  return (
    <>
      {loading && <Loader />}
      <Topbar />
      <Container fluid>
        <Container className="perticualrservice">
          <Row>
            <Col md={5} className="firstcol">
              <div className="imagesdiv">
                <ImageGallery items={images} />
              </div>
              <div className="reviewdiv">
                <h5>Reviews</h5> <br />
                <hr className="underline" />
                <div>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      <div>
                        {shuffledReviews.slice(0, 2).map((review) => (
                          <Row key={review.id} className="mb-4">
                            <Col
                              lg="2"
                              className="d-flex justify-content-center"
                            >
                              <img
                                src="images/user2.png"
                                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                alt="avatar"
                                width="50"
                                height="50"
                              />
                            </Col>
                            <Col className="text-center text-lg-start mx-auto mx-lg-0">
                              <h7 className="mb-2">
                                {review.Username} - {review.Designation}
                              </h7>
                              <ul className="list-unstyled starDiv mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <li key={i}>
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      className={
                                        i < review.Rating ? "text-warning" : ""
                                      }
                                    />
                                  </li>
                                ))}
                              </ul>
                              <p className="mb-0 pb-3 reviewdes">
                                {review.Description}
                              </p>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={7} className="secondcol">
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
              <div className="">
                <div className="mt-3">
                  <h5>₹ {servicedata.price_per_hour}/hr</h5>
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
                      showToolbar={false}
                    />
                  </LocalizationProvider>
                </Col>
                <Col md={6}>
                  <h5>Available Slots</h5>
                  <hr />
                  <div className="button-container">
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
                            className="custom-button"
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
                placeholder="Enter Note"
                value={formData.details}
                onChange={handleChange}
              />
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
