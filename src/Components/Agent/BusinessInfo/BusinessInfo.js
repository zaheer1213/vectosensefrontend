import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../Commanconstans/Comman";
import { Col, Container, Form, Row } from "react-bootstrap";
import Loader from "../../Loader/Loader";

const BusinessInfo = () => {
  const [business, setBusiness] = useState({});
  const [loder, setLoder] = useState(false);

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
        setBusiness(response?.data?.business_data);
        setLoder(false);
      }
    } catch (error) {
      setLoder(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      {loder ? <Loader /> : ""}
      <Container fluid className="bg-filler" style={{ marginTop: "50px" }}>
        <Container className="py-5">
          <h1 className="">Business Information</h1>
          <Row className="mt-3">
            <Form>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formServiceName">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={business.business_name}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={business.business_email}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={business.business_no}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Street Address </Form.Label>
                    <Form.Control
                      type="text"
                      value={business.street_address}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formServiceName">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={business.postal_code}
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Business city</Form.Label>
                    <Form.Control type="text" value={business.city} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Business Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={business.country}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                {business?.other_url && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formCategory">
                      <Form.Label>Other URL</Form.Label>
                      <Form.Control
                        type="text"
                        value={business.other_url}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="formServiceName">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={business.description}
                      readOnly
                      rows={4}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {business?.youtube_url && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formCategory">
                      <Form.Label>Youtube Url</Form.Label>
                      <Form.Control
                        type="text"
                        value={business.youtube_url}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                )}
                {business?.twitter_url && (
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="formCategory">
                      <Form.Label>Twitter Url</Form.Label>
                      <Form.Control
                        type="text"
                        value={business.twitter_url}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
            </Form>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default BusinessInfo;
