import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Dashbord.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Dashbord = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid>
        <Container fluid>
          <Row>
            <Col>
              <div className="firstdiv">
                <div className="text-center hedingDiv">
                  <h1 className="text-center ">Welcome !</h1>
                  <p>Here’s a summary of your business at a glance.</p>
                </div>
                <div className="text-center">
                  <button className="dashbordbtn">
                    {moment(new Date()).format("MMMM D, YYYY, h:mm A")}
                  </button>
                </div>
                <div className="infotext text-center mt-5">
                  <p>
                    Set up your customizable <strong>landing page</strong>{" "}
                    <br /> to enhance your online presence.
                  </p>
                  <Button
                    style={{ background: "white", color: "#5B549E" }}
                    onClick={() => {
                      navigate("/themeselectionform");
                    }}
                  >
                    Set up webpage
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-center mt-5 secondhedingcomntiner">
                  <h1 className="text-center ">Admin Dashboard</h1>
                  <p>Here’s a summary of your business at a glance.</p>
                </div>
                <div>
                  <div className="dashbordcard-container">
                    <div className="dashbordcard">
                      <h5>Add Service</h5>
                      <div
                        className="centerdiv pointer"
                        onClick={() => navigate("/serviceinformation")}
                      >
                        +
                      </div>
                    </div>
                    <div className="dashbordcard">
                      <h5>Add Agent</h5>
                      <div
                        className="centerdiv pointer"
                        onClick={() => {
                          navigate("/agentregistration");
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Dashbord;
