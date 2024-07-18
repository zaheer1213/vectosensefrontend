import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  DropdownButton,
  Dropdown,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./Businessregistration.css";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Countries from "../../Countries";
import {
  BASEURL,
  COUNTRYAPIKRY,
  COUNTRYURL,
} from "../../Commanconstans/Comman";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const Businessregistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("images/image.png");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    buisness_name: "",
    businessEmail: "",
    country: "Canada",
    province: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    instagramLink: "",
    facebookLink: "",
    youtubeLink: "",
    additionalAccount: "",
    businessNumber: {
      countryCode: "",
      phoneNumber: "",
    },
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState(Countries[0]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [popup, setPopup] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [business_id, setbusiness_id] = useState(null);
  const [initialBusinessData, setinitialBusinessData] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleClose1 = () => {
    setShow(false);
    navigate("/dashbord");
  };
  const handleClosePopup = () => {
    setPopup(false);
    navigate("/login");
  };
  const handleShow = () => setShow(true);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCountryChange = (dialCode, countryName) => {
    setCountry({ name: countryName, dialCode });
    setFormData({
      ...formData,
      businessNumber: {
        ...formData.businessNumber,
        countryCode: dialCode,
      },
    });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "countryCode" || name === "phoneNumber") {
      setFormData({
        ...formData,
        businessNumber: {
          ...formData.businessNumber,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCountryChange1 = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
  };
  const allProvience = async (event) => {
    try {
      const countryCode = event.target.value;
      setSelectedCountry(countryCode);

      const response = await axios.get(
        `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json`
      );
      const allProvinces = response.data;
      const countryProvinces = allProvinces.filter(
        (state) => state.country_name === countryCode
      );
      setProvinces(countryProvinces);
    } catch (error) {
      console.error("Error fetching the provinces:", error);
    }
  };
  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
  };
  // const allCity = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json"
  //     );
  //     const allCities = response.data;
  //     setCities(allCities);
  //   } catch (error) {
  //     console.error("Error fetching the cities:", error);
  //   }
  // };
  const getAllCountry = async () => {
    try {
      const response = await axios.get(COUNTRYURL);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching the countries:", error);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.buisness_name)
      newErrors.buisness_name = "Business Name is required";
    if (!formData.businessEmail)
      newErrors.businessEmail = "Business Email is required";
    if (!formData.businessNumber.phoneNumber)
      newErrors.businessNumber = "Business Number is required";
    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedProvince) newErrors.province = "Province is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!file) newErrors.file = "Please upload a logo.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (business_id) {
      e.preventDefault();

      const data = new FormData();

      if (initialBusinessData.business_name !== formData.buisness_name) {
        data.append("business_name", formData.buisness_name);
      }
      if (initialBusinessData.business_email !== formData.businessEmail) {
        data.append("business_email", formData.businessEmail);
      }
      if (initialBusinessData.country !== selectedCountry) {
        data.append("country", selectedCountry);
      }
      if (
        initialBusinessData.business_no !== formData.businessNumber.phoneNumber
      ) {
        data.append("business_no", formData.businessNumber.phoneNumber);
      }
      if (
        initialBusinessData.country_code !== formData.businessNumber.countryCode
      ) {
        data.append("country_code", formData.businessNumber.countryCode);
      }
      if (file) {
        data.append("business_logo", file);
      }
      if (initialBusinessData.description !== formData.description) {
        data.append("description", formData.description);
      }
      if (initialBusinessData.province !== formData.province) {
        data.append("province", formData.province);
      }
      if (initialBusinessData.city !== formData.city) {
        data.append("city", formData.city);
      }
      if (initialBusinessData.postal_code !== formData.postalCode) {
        data.append("postal_code", formData.postalCode);
      }
      if (initialBusinessData.street_address !== formData.streetAddress) {
        data.append("street_address", formData.streetAddress);
      }
      if (initialBusinessData.instagram_url !== formData.instagramLink) {
        data.append("instagram_url", formData.instagramLink);
      }
      if (initialBusinessData.facebook_url !== formData.facebookLink) {
        data.append("facebook_url", formData.facebookLink);
      }
      if (initialBusinessData.youtube_url !== formData.youtubeLink) {
        data.append("youtube_url", formData.youtubeLink);
      }
      if (initialBusinessData.other_url !== formData.additionalAccount) {
        data.append("other_url", formData.additionalAccount);
      }
      setLoading(true);
      const headers = {
        "x-access-token": localStorage.getItem("admin-token"),
      };
      await axios
        .put(`${BASEURL}/service-provider/business/${business_id}`, data, {
          headers,
        })
        .then((response) => {
          if (response.data) {
            setMessage("Business Data update successfully");
            handleShow();
            setError(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          setMessage("There was an error submitting the form");
          setError(true);
          setLoading(false);
        });
    } else {
      e.preventDefault();
      if (!validateForm()) return;

      const data = new FormData();
      data.append("business_name", formData.buisness_name);
      data.append("business_email", formData.businessEmail);
      data.append("business_no", formData.businessNumber.phoneNumber);
      data.append("country_code", formData.businessNumber.countryCode);
      data.append("business_logo", file);
      data.append("description", formData.description);
      data.append("country", selectedCountry);
      data.append("province", formData.province);
      data.append("city", formData.city);
      data.append("postal_code", formData.postalCode);
      data.append("street_address", formData.streetAddress);
      data.append("instagram_url", formData.instagramLink);
      data.append("facebook_url", formData.facebookLink);
      data.append("twitter_url", formData.instagramLink);
      data.append("youtube_url", formData.youtubeLink);
      data.append("other_url", formData.additionalAccount);

      setLoading(true);
      const headers = {
        "x-access-token": localStorage.getItem("token"),
      };
      await axios
        .post(BASEURL + "/service-provider/business", data, { headers })
        .then((response) => {
          if (response.data) {
            setMessage("Business Data submitted successfully");
            handleShow();
            setError(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          setMessage("There was an error submitting the form");
          setError(true);
          setLoading(false);
        });
    }
  };
  const getBusinessDetilsByID = async (businessId) => {
    const headers = {
      "x-access-token": localStorage.getItem("admin-token"),
    };
    setLoading(true);
    await axios
      .get(`${BASEURL}/service-provider/business/${businessId}`, { headers })
      .then((responce) => {
        const responceData = responce.data.data;
        if (responce) {
          setFormData({
            buisness_name: responceData.business_name,
            businessEmail: responceData.business_email,
            country: responceData.country,
            province: responceData.province,
            city: responceData.city,
            postalCode: responceData.postal_code,
            streetAddress: responceData.street_address,
            instagramLink: responceData.instagram_url,
            facebookLink: responceData.facebook_url,
            youtubeLink: responceData.youtube_url,
            additionalAccount: responceData.other_url,
            businessNumber: {
              countryCode: responceData.country_code,
              phoneNumber: responceData.business_no,
            },
            description: responceData.description,
          });
          console.log(responceData);
          setinitialBusinessData(responceData);
          setImageSrc(responceData.business_logo);
          setSelectedCountry(responceData.country);
          setSelectedProvince(responceData.province);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    const checkAndSetToken = async () => {
      const passToken = location.state?.token;
      if (passToken) {
        // Optionally handle passToken logic here
      }

      let token = await localStorage.getItem("admin-token");
      if (!token) {
        const reloadNeeded = localStorage.getItem("reloadNeeded");
        if (reloadNeeded === "true") {
          localStorage.removeItem("reloadNeeded");
          window.location.reload();
        }
      } else {
        setToken(token);
      }

      const businessId = location.state?.buinessID;
      if (businessId) {
        setbusiness_id(businessId);
        getBusinessDetilsByID(businessId);
      }

      getAllCountry();
      allProvience();
      // await allCity();
    };

    checkAndSetToken();
  }, [navigate]);

  return (
    <>
      {/* loder */}
      {loading ? <Loader /> : ""}
      <Container fluid>
        <Row>
          <Col className="p-0" md={4}>
            <div className="mainsidebar">
              <div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src="images/forwardicon.png"
                    onClick={() => window.history.back()}
                    className="pointer"
                    style={{ marginBottom: "50px" }}
                  />
                  <img
                    src={business_id ? BASEURL + imageSrc : imageSrc}
                    className="userImg"
                    alt="Business Logo"
                  />
                  <div>
                    <Button
                      onClick={handleButtonClick}
                      style={{
                        background: "white",
                        color: "black",
                        marginTop: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Upload Logo
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {errors.file && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "10px" }}
                      >
                        {errors.file}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="p-0" md={8}>
            <div className="secondremain">
              <h1 className="topmargin">Business Info</h1>
              <p>
                Register to unlock powerful tools, connect with customers, and
                grow your business effortlessly.
              </p>
              <Form onSubmit={handleSubmit}>
                <h5 className="mt-3">Business Info</h5>
                <hr />
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBusinessName">
                      <Form.Label>Business Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your business name"
                        name="buisness_name"
                        value={formData.buisness_name}
                        onChange={handleChange}
                        isInvalid={!!errors.buisness_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.buisness_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBusinessEmail">
                      <Form.Label>Business Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        isInvalid={!!errors.businessEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.businessEmail}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formBusinessNumber">
                      <Form.Label>Business Number</Form.Label>
                      <Row>
                        {/* <Col md={4}>
                          <Form.Control
                            type="number"
                            placeholder="+1"
                            name="countryCode"
                            value={formData.businessNumber.countryCode}
                            onChange={handleChange}
                            className="bordered-input"
                            isInvalid={!!errors.businessNumber}
                          />
                        </Col>
                        <Col md={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            name="phoneNumber"
                            value={formData.businessNumber.phoneNumber}
                            onChange={handleChange}
                            className="bordered-input"
                            style={{ marginLeft: "10px" }}
                            isInvalid={!!errors.businessNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.businessNumber}
                          </Form.Control.Feedback>
                        </Col> */}
                        <InputGroup>
                          <DropdownButton
                            variant="outline-secondary"
                            title={country.dialCode || "Select Country"}
                            id="input-group-dropdown-1"
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
                            name="phoneNumber"
                            className="inputheight"
                            type="number"
                            placeholder="00000 00000"
                            isInvalid={!!errors.businessNumber}
                            value={formData.businessNumber.phoneNumber}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.businessNumber}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Row>
                      <Form.Control.Feedback type="invalid">
                        {errors.businessNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <h5 className="mt-3">Location Info</h5>
                  <hr />
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={selectedCountry}
                        onChange={allProvience}
                        isInvalid={!!errors.country}
                      >
                        <option value="">Select Country</option>
                        {countries &&
                          countries.map((country) => {
                            return (
                              <>
                                <option key={country.name} value={country.name}>
                                  {country.name}
                                </option>
                              </>
                            );
                          })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Select
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        isInvalid={!!errors.province}
                      >
                        <option value="">Select a province/state</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.province}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formPostalCode">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="eg. M5V 1LF"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        isInvalid={!!errors.postalCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formStreetAddress">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Street Address"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        isInvalid={!!errors.streetAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.streetAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <h5 className="mt-3">Social Media Links</h5>
                  <hr />
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                      controlId="formInstagram"
                    >
                      <Form.Control
                        type="text"
                        placeholder="    Instagram Link"
                        name="instagramLink"
                        value={formData.instagramLink}
                        onChange={handleChange}
                        className="instagram-input"
                      />
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="instagram-icon"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                      controlId="formFacebook"
                    >
                      <Form.Control
                        type="text"
                        placeholder="     Facebook Link"
                        name="facebookLink"
                        value={formData.facebookLink}
                        onChange={handleChange}
                        className="instagram-input"
                      />
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="instagram-icon"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                      controlId="formYoutube"
                    >
                      <Form.Control
                        type="text"
                        placeholder="     Youtube Link"
                        name="youtubeLink"
                        value={formData.youtubeLink}
                        onChange={handleChange}
                        className="instagram-input"
                      />
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="instagram-icon"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group
                      className="mb-3 position-relative"
                      controlId="formAdditionalAccount"
                    >
                      <Form.Control
                        type="text"
                        placeholder="     Add more accounts"
                        name="additionalAccount"
                        value={formData.additionalAccount}
                        onChange={handleChange}
                        className="instagram-input"
                      />
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="instagram-icon"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="longbtn mb-3"
                >
                  Save Info
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
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

      {/* no token model */}
      <Modal show={popup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#5b549e" }} onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Businessregistration;
