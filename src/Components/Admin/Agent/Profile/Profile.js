import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loader from "../../../Loader/Loader";
import axios from "axios";
import { BASEURL } from "../../../Commanconstans/Comman";

const Profile = () => {
  const [business, setBusiness] = useState({});
  const [loder, setLoder] = useState(false);
  const [imageSrc, setImageSrc] = useState("images/image.png");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(null);

  const fileInputRef = useRef(null);
  const getUserInfo = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    try {
      setLoder(true);
      const response = await axios.get(BASEURL + "/accounts/user-profile", {
        headers,
      });
      if (response && response.data && response.data.data) {
        const userData = response?.data?.data;
        setBusiness(userData);
        setImageSrc(
          userData.profile_pic
            ? BASEURL + userData.profile_pic
            : "images/image.png"
        );
        setId(userData.id);
        setLoder(false);
      }
    } catch (error) {
      setLoder(false);
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name) {
      formData.append("username", name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (phone) {
      formData.append("mobile_number", phone);
    }
    if (file) {
      formData.append("profile_pic", file);
    }
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    await axios
      .put(`${BASEURL}/accounts/user/${id}`, formData, { headers })
      .then((res) => {
        if (res.data) {
          window.history.back();
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      {loder ? <Loader /> : ""}
      <Container fluid className="bg-filler" style={{ marginTop: "50px" }}>
        <Container className="py-5">
          <h1 className="">Agent Profile</h1>
          <Row className="mt-3">
            <Form onSubmit={handleSubmit}>
              <Row>
                <div className="">
                  <Form.Group controlId="formServiceName">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        marginTop: "20px",
                      }}
                    >
                      <Form.Label>Profile Image</Form.Label>

                      <img
                        src={imageSrc}
                        style={{
                          height: "253px",
                          width: "256px",
                          borderRadius: "10px",
                        }}
                        alt="Business Logo"
                      />
                      <Button
                        onClick={handleButtonClick}
                        style={{
                          background: "white",
                          color: "black",
                          marginTop: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Upload Profile Image
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </Form.Group>
                </div>
              </Row>
              <Row className="mt-5">
                <Col md={4}>
                  <Form.Group controlId="formServiceName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={business.username}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={business.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={business.mobile_number}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="" type="submit" className="longbtn mb-3">
                Edit
              </Button>
            </Form>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
