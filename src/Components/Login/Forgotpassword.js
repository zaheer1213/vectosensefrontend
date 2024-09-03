import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./Forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Commanconstans/Comman";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError(true);
    } else {
      try {
        const payload = {
          email: email,
        };
        const respose = await axios.post(
          `${BASEURL}/accounts/forgetpassword/nt/`,
          payload
        );

        if (respose) {
          if (respose.data) {
            navigate("/verifyotp", { state: { useremail: email } });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container fluid className="forgetpassword">
      <Row className="align-items-stretch">
        <Col md={6} className="forget-imagediv flex-column">
          <div>
            <img
              src="images/forwardicon.png"
              onClick={() => window.history.back()}
              className="pointer"
            />
          </div>
          <div className="forgotpasswordimg">
            <img src="/images/forgotpasswordimg.png" alt="section img" />
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className="text-center mb-4">
            <img src="/images/lockicon.png" alt="lock-icon" />
          </div>
          <div className="text-center mb-4">
            <h1>Forgot Your Password?</h1>
            <p>Enter your registered email address to reset your password.</p>
          </div>
          <div>
            <Form className="forgotpassword-form">
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label className="mb-2">Email Address</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="inputheight"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "350px" }}
                  />
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  {error && (
                    <p className="text-danger">
                      please enter valid email address
                    </p>
                  )}
                </InputGroup>
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center">
                <Button className="cutomebutton" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </div>
              <div className="d-flex align-items-center justify-content-center mt-3 pointer">
                <p onClick={() => navigate("/login")}>
                  Back to <span style={{ color: "#5B549E" }}>Login</span>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forgotpassword;
