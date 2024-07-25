import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import "./ThemeCreateionForm.css";
import { SliderPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import Loader from "../../Loader/Loader";

const ThemeCreateionForm = () => {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const fileInputRef3 = useRef();
  const Navigate = useNavigate();
  const [color, setColor] = useState("#fff");
  const [color1, setColor1] = useState("#322d86");
  const [color2, setColor2] = useState("#2d865f");
  const [imgSrc, setImgSrc] = useState("images/backgrondimg.png");
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  const [logo, setLogo] = useState(null);
  const [logoimg, setLogoImg] = useState("images/backgrondimg.png");
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [website_description, setWebsite_description] = useState("");

  const [heroSectionTitle, setHeroSectionTitle] = useState("");
  const [heroSectionDescription, setHeroSectionDescription] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [aboutImg, setAboutImg] = useState("images/backgrondimg.png");
  const [allBusinessData, setAllBuinessData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [businessinfoID, setBussinessInfoID] = useState(null);
  const [lightTheme, setLighetTheme] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFromData] = useState({
    street_address: "",
    business_email: "",
    business_no: "",
    instagram_url: "",
    facebook_url: "",
    youtube_url: "",
    other_url: "",
    twitter_url: "",
  });

  const handleClose1 = () => {
    setShow1(false);
  };
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const handleChangeComplete1 = (color) => {
    setColor1(color.hex);
  };
  const handleChangeComplete2 = (color) => {
    setColor2(color.hex);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };
  const handelFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutImg(reader.result);
      };
      reader.readAsDataURL(file);
      setFile1(file);
    }
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImg(reader.result);
      };
      reader.readAsDataURL(file);
      setLogo(file);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleButtonClick2 = () => {
    fileInputRef3.current.click();
  };
  const handleDelete = () => {
    setImgSrc("images/backgrondimg.png");
  };
  const handleRefClick = () => {
    fileInputRef2.current.click();
  };
  const handelChange = (e) => {
    const { value, name } = e.target;
    setFromData({ ...formData, [name]: value });
  };
  const validate = () => {
    const errors = {};

    if (!websiteTitle) errors.websiteTitle = "Website title is required.";
    if (!website_description)
      errors.website_description = "Website description is required.";
    if (!heroSectionTitle)
      errors.heroSectionTitle = "Hero section title is required.";
    if (!heroSectionDescription)
      errors.heroSectionDescription = "Hero section description is required.";
    if (!aboutTitle) errors.aboutTitle = "About Us title is required.";
    if (!aboutDescription)
      errors.aboutDescription = "About Us description is required.";
    // if (!logo) errors.logo = "Logo is required.";
    if (!file) errors.hero_image = "Hero section image is required.";
    if (!file1) errors.about_us_image = "About Us image is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // Stop submission if validation fails
    const formData = new FormData();
    formData.append("theme", darkTheme ? "dark" : "light");
    formData.append("hero_image", file);
    formData.append("hero_title", heroSectionTitle);
    formData.append("hero_description", heroSectionDescription);
    formData.append("about_us_title", aboutTitle);
    formData.append("about_us_image", file1);
    formData.append("logo", logo ? logo : "");
    formData.append("about_us_description", aboutDescription);
    formData.append("website_title", websiteTitle);
    formData.append("website_description", website_description);
    formData.append("color_palette", color);

    const headers = {
      "x-access-token": localStorage.getItem("admin-token"),
      "Content-Type": "multipart/form-data", // important to set the content type to multipart/form-data
    };

    setLoading(true);

    try {
      const response = await axios.post(
        BASEURL + "/service-provider/website-template",
        formData,
        { headers }
      );
      if (response.error == false) {
        window.history.back();
        // Navigate(`/serviceprovider/${response.data.data.user}`);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setShow1(true);
    } finally {
      setLoading(false);
    }
  };

  const getBuinessInfo = async () => {
    try {
      const headers = {
        "x-access-token": localStorage.getItem("admin-token"),
      };
      const buinessData = await axios.get(
        BASEURL + "/service-provider/business",
        { headers }
      );
      if (buinessData.data) {
        setAllBuinessData(buinessData.data.rows[0]);
        const businessData = buinessData.data.rows[0];
        setBussinessInfoID(businessData.id);
        setLogoImg(BASEURL + businessData.business_logo);
        setFromData({
          street_address: businessData.street_address,
          business_email: businessData.business_email,
          business_no: businessData.business_no,
          instagram_url: businessData.instagram_url,
          facebook_url: businessData.facebook_url,
          youtube_url: businessData.youtube_url,
          other_url: businessData.other_url,
          twitter_url: businessData.twitter_url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAgent = async () => {
    const token = localStorage.getItem("admin-token");
    const headers = {
      "x-access-token": token,
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/service-provider/all-agent?page=${page}&limit=${limit}`,
        { headers }
      );
      setAgentData(response.data.rows);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleImageClick = () => {
    setLighetTheme(true);
    setDarkTheme(false);
  };

  const handleCheckboxChange = (e) => {
    setLighetTheme(e.target.checked);
    setDarkTheme(false);
  };

  const handleImageClick1 = () => {
    setDarkTheme(true);
    setLighetTheme(false);
  };

  const handleCheckboxChange1 = (e) => {
    setDarkTheme(e.target.checked);
    setLighetTheme(false);
  };
  const handelMoveclick = () => {
    Navigate("/businessregistration", { state: { buinessID: businessinfoID } });
  };
  useEffect(() => {
    getBuinessInfo();
    getAllAgent();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Container fluid>
        <div className="themeheding">
          <div>
            <Button className="thmebtn"></Button>
          </div>
        </div>
        <Container>
          <Row>
            <Col>
              <div>
                <div className="forminfo">
                  <h1 style={{ color: "#5B549E" }}>Create Your Own Webpage </h1>
                  <p>
                    Pick a theme that suits your brand. Customize to create a
                    professional and attractive online presence..
                  </p>
                </div>
                <div>
                  <Row className="text-start">
                    <h5 className="mt-3 text-start">Logo / Website</h5>
                    <hr />
                    <Col md={4}>
                      <img
                        src={logoimg}
                        alt="logo"
                        style={{
                          height: "200px",
                          width: "200px",
                          borderRadius: "100px",
                        }}
                      />{" "}
                      <div className="text-start mt-3">
                        <button
                          className="formbtn"
                          onClick={handleButtonClick2}
                        >
                          Upload Logo
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef3}
                          style={{ display: "none" }}
                          onChange={handleFileChange2}
                          accept="image/*"
                        />
                      </div>
                    </Col>
                    <Col md={8}>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Website Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="www.example.com"
                            onChange={(e) => setWebsiteTitle(e.target.value)}
                            value={websiteTitle}
                          />
                          {errors.websiteTitle && (
                            <p className="text-danger">{errors.websiteTitle}</p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Website Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="enter brief description"
                            onChange={(e) =>
                              setWebsite_description(e.target.value)
                            }
                            value={website_description}
                          />
                          {errors.website_description && (
                            <p className="text-danger">
                              {errors.website_description}
                            </p>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <h5 className="mt-3">Choose Theme</h5>
                    <hr />
                    <Row>
                      <Col
                        md={6}
                        className="d-flex flex-column align-items-center justify-content-center pointer"
                      >
                        <div>
                          <div>
                            <img
                              src="images/herosection2.png"
                              alt="ThemeImage"
                              onClick={handleImageClick}
                              className="pointer formimg"
                            />
                          </div>
                          <div className="d-flex flex-row align-items-center justify-content-center pointer">
                            <input
                              type="checkbox"
                              checked={lightTheme}
                              onChange={handleCheckboxChange}
                            />
                            &nbsp;&nbsp;
                            <h4 className="text-center mt-3">Lite Theme</h4>
                          </div>
                        </div>
                      </Col>
                      <Col
                        md={6}
                        className="d-flex flex-column align-items-center justify-content-center pointer"
                      >
                        <div>
                          <img
                            src="images/herosection1.png"
                            alt="ThemeImage"
                            onClick={handleImageClick1}
                            className="pointer formimg"
                          />
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center pointer">
                          <input
                            type="checkbox"
                            checked={darkTheme}
                            onChange={handleCheckboxChange1}
                          />
                          &nbsp;&nbsp;
                          <h4 className="text-center mt-3">dark Theme</h4>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                  <h5 className="mt-5">Choose Your Primary Color</h5>
                  <hr />
                  <Row>
                    <Col md={4}>
                      <h5>Primary</h5>
                      <SliderPicker
                        color={color}
                        onChangeComplete={handleChangeComplete}
                      />
                    </Col>
                    <Col md={4}>
                      <h5>Secondary</h5>
                      <SliderPicker
                        color={color1}
                        onChangeComplete={handleChangeComplete1}
                      />
                    </Col>
                    <Col md={4}>
                      <h5>Filler</h5>
                      <SliderPicker
                        color={color2}
                        onChangeComplete={handleChangeComplete2}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <h5 className="mt-3">Hero Section</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <div>
                        <img src={imgSrc} className="formimg" alt="logo" />
                        <div className="button-container">
                          <button
                            className="formbtn"
                            onClick={handleButtonClick}
                          >
                            Upload image
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="pointer mt-3"
                            title="delete"
                            onClick={handleDelete}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="enter hero section title"
                            onChange={(e) =>
                              setHeroSectionTitle(e.target.value)
                            }
                            value={heroSectionTitle}
                          />
                          {errors.heroSectionTitle && (
                            <p className="text-danger">
                              {errors.heroSectionTitle}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="enter brief description"
                            onChange={(e) =>
                              setHeroSectionDescription(e.target.value)
                            }
                            value={heroSectionDescription}
                          />
                          {errors.heroSectionDescription && (
                            <p className="text-danger">
                              {errors.heroSectionDescription}
                            </p>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <h5 className="mt-3">About Us Section</h5>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <div>
                        <img src={aboutImg} className="formimg" alt="logo" />
                        <input
                          type="file"
                          ref={fileInputRef2}
                          style={{ display: "none" }}
                          onChange={handelFileChange1}
                          accept="image/*"
                        />
                        <div className="button-container">
                          <button className="formbtn" onClick={handleRefClick}>
                            Upload image
                          </button>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="pointer mt-3"
                            title="delete"
                            onClick={() =>
                              setAboutImg("images/backgrondimg.png")
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="enter about title"
                            onChange={(e) => setAboutTitle(e.target.value)}
                            value={aboutTitle}
                          />
                          {errors.aboutTitle && (
                            <p className="text-danger">{errors.aboutTitle}</p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="enter brief description"
                            onChange={(e) =>
                              setAboutDescription(e.target.value)
                            }
                            value={aboutDescription}
                          />
                          {errors.aboutDescription && (
                            <p className="text-danger">
                              {errors.aboutDescription}
                            </p>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "100px" }}>
                  <h5 className="mt-3">Employee Section</h5>
                  <hr />
                  <p>
                    We already have your employees' data. Review and update the
                    information to ensure your team is accurately represented on
                    your website.
                  </p>
                  <div>
                    <button
                      className="cutomebtn"
                      onClick={() => Navigate("/agentable")}
                    >
                      Edit &nbsp;
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                  <div className="mt-5">
                    <Row className="formcard">
                      {agentData &&
                        agentData.map((res, index) => (
                          <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card
                              style={{
                                width: "18rem",
                                marginBottom: "20px",
                                height: "300px",
                              }}
                            >
                              <Card.Img
                                variant="top"
                                src={
                                  res.profile_pic
                                    ? BASEURL + res.profile_pic
                                    : "images/userimg.png"
                                }
                                height={200}
                                width={100}
                              />
                              <Card.Body>
                                <Card.Title>{res.username}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </div>
                  <div>
                    <h5 className="mt-3">Opening Hours Section</h5>
                    <hr />
                    <p>
                      We have your business hours recorded. Please verify and
                      update them to keep your customers informed about your
                      availability.
                    </p>
                    <div>
                      <button
                        className="cutomebtn"
                        onClick={() => Navigate("/servicetable")}
                      >
                        Edit &nbsp;
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                    <Row>
                      <Col md={8}>
                        <div>
                          <table className="custom-table">
                            <thead>
                              <tr>
                                <th>Days</th>
                                <th>Timing</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Monday</td>
                                <td>09:00am-10:00pm</td>
                              </tr>
                              <tr>
                                <td>Tuesday</td>
                                <td>09:00am-10:00pm</td>
                              </tr>
                              <tr>
                                <td>Wednesday</td>
                                <td>09:00am-10:00pm</td>
                              </tr>
                              <tr>
                                <td>Thursday</td>
                                <td>09:00am-10:00pm</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div>
                  <h5 className="mt-3">Footer section</h5>
                  <hr />
                  <p>
                    We have your business hours recorded. Please verify and
                    update them to keep your customers informed about your
                    availability.
                  </p>
                  <div>
                    <button className="cutomebtn" onClick={handelMoveclick}>
                      Edit &nbsp;
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                  <div>
                    <Row>
                      <Col md={6}>
                        <h6 className="mt-3">Street Address</h6>
                        <input
                          type="text"
                          name="street_address"
                          placeholder=" 123 Maple Avenue, Toronto, ON M4B 1B3, Canada"
                          style={{ width: "100%", maxWidth: "500px" }}
                          value={formData.street_address}
                          onChange={handelChange}
                          readOnly
                        />
                        <h6 className="mt-3">Phone</h6>
                        <input
                          type="text"
                          placeholder=" 00000 00000"
                          style={{ width: "100%", maxWidth: "500px" }}
                          name="business_no"
                          value={formData.business_no}
                          onChange={handelChange}
                          readOnly
                        />
                      </Col>
                      <Col md={6}>
                        <h6 className="mt-3">Email</h6>
                        <input
                          type="email"
                          placeholder="  example@gmail.com"
                          style={{ width: "100%", maxWidth: "500px" }}
                          name="business_email"
                          value={formData.business_email}
                          onChange={handelChange}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <h5 className="mt-3">Social Media Links</h5>
            <hr />
            <Col md={6}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formInstagram"
              >
                <Form.Control
                  type="text"
                  placeholder="  Instagram Link"
                  name="instagram_url"
                  className="instagram-input"
                  value={formData.instagram_url}
                  onChange={handelChange}
                  readOnly
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="instagram-icon"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formFacebook"
              >
                <Form.Control
                  type="text"
                  placeholder="  Facebook Link"
                  name="facebook_url"
                  className="instagram-input"
                  value={formData.facebook_url}
                  onChange={handelChange}
                  readOnly
                />
                <FontAwesomeIcon icon={faFacebook} className="instagram-icon" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formYoutube"
              >
                <Form.Control
                  type="text"
                  placeholder="  Youtube Link"
                  name="youtube_url"
                  className="instagram-input"
                  value={formData.youtube_url}
                  onChange={handelChange}
                  readOnly
                />
                <FontAwesomeIcon icon={faYoutube} className="instagram-icon" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3 position-relative"
                controlId="formAdditionalAccount"
              >
                <Form.Control
                  type="text"
                  placeholder="  Add more accounts"
                  name="other_url"
                  className="instagram-input"
                  value={formData.other_url}
                  onChange={handelChange}
                  readOnly
                />
                <FontAwesomeIcon icon={faPlus} className="instagram-icon" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="footerbtn">
            <Col className="">
              <Button
                variant="primary"
                type="submit"
                className="longbtn mb-3"
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="primary"
                type="submit"
                className="longbtn mb-3"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Success Modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThemeCreateionForm;
