import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import "./Analytics.css";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Analytics = () => {
  const [direct, setDirect] = useState(70);
  const [referral, setReferral] = useState(50);
  const [socialMedia, setSocialMedia] = useState(30);
  const [twitter, setTwitter] = useState(20);

  // Define min and max values
  const MIN = 0;
  const MAX = 100;

  const options = {
    animationEnabled: true,
    title: {
      text: "Monthly Sales - 2024",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "Sales (in USD)",
      prefix: "$",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2024, 0), y: 25060 },
          { x: new Date(2024, 1), y: 27980 },
          { x: new Date(2024, 2), y: 42800 },
          { x: new Date(2024, 3), y: 32400 },
          { x: new Date(2024, 4), y: 35260 },
          { x: new Date(2024, 5), y: 33900 },
          { x: new Date(2024, 6), y: 40000 },
          { x: new Date(2024, 7), y: 52500 },
          { x: new Date(2024, 8), y: 32300 },
          { x: new Date(2024, 9), y: 42000 },
          { x: new Date(2024, 10), y: 37160 },
          { x: new Date(2024, 11), y: 38400 },
        ],
      },
    ],
  };

  return (
    <>
      <Container fluid className="mainconatiner">
        <Container className="mt-5">
          <img
            src="images/Frame 1321316250.png"
            onClick={() => window.history.back()}
            className="pointer"
          />
          <h1 className="topmargin">Analytics</h1>
          <p>
            Here you can manage all your agents. Add new agents, edit existing
            details, or remove agents from your company.
          </p>
          <Row>
            <Col md={3}>
              <Card className="card-main">
                <Card.Body className="card-body">
                  <Card.Subtitle className="mb-2 text-muted text-start">
                    Today’s Sale
                  </Card.Subtitle>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Card.Title className="text-center">$12,426 </Card.Title>

                    <Card.Title
                      className="text-center"
                      style={{ color: "green" }}
                    >
                      + 36% <FontAwesomeIcon icon={faArrowUp} />
                    </Card.Title>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-main">
                <Card.Body className="card-body">
                  <Card.Subtitle className="mb-2 text-muted text-start">
                    Total Sales
                  </Card.Subtitle>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Card.Title className="text-center">$2,38,485 </Card.Title>
                    <Card.Title
                      className="text-center"
                      style={{ color: "red" }}
                    >
                      + 36% <FontAwesomeIcon icon={faArrowDown} />
                    </Card.Title>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-main">
                <Card.Body className="card-body">
                  <Card.Subtitle className="mb-2 text-muted text-start">
                    Total Orders
                  </Card.Subtitle>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Card.Title className="text-center">$84,382 </Card.Title>

                    <Card.Title
                      className="text-center"
                      style={{ color: "green" }}
                    >
                      + 36% <FontAwesomeIcon icon={faArrowUp} />
                    </Card.Title>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-main">
                <Card.Body className="card-body">
                  <Card.Subtitle className="mb-0 pb-2 text-muted text-start">
                    Total Customers
                  </Card.Subtitle>
                  <Col className="d-flex justify-content-center align-items-center mt-2">
                    <Card.Title className="text-center">$33,493 </Card.Title>
                    <Card.Title
                      className="text-center"
                      style={{ color: "green", marginLeft: "10px" }}
                    >
                      + 36% <FontAwesomeIcon icon={faArrowUp} />
                    </Card.Title>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <CanvasJSChart options={options} />
            </Col>
            <Col md={4}>
              <div className="secondDiv">
                <div>
                  <Row>
                    <Col>
                      <h4>Traffic Sources</h4>
                    </Col>
                    <Col className="justify-content-end">
                      <Dropdown data-bs-theme="dark">
                        <Dropdown.Toggle className="dropwonlist">
                          Last 7 Days
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1" active>
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#/action-4">
                            Separated link
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Form.Label>Direct</Form.Label> <br />
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={direct}
                    onChange={(e) => setDirect(e.target.value)}
                    style={{ width: "100%", color: "#5B549E" }}
                  />
                </div>
                <div>
                  <Form.Label>Referral</Form.Label>
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <Form.Label>Social Media</Form.Label>
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={socialMedia}
                    onChange={(e) => setSocialMedia(e.target.value)}
                    style={{ width: "100%" }}
                    className="rangecolor"
                  />
                </div>
                <div>
                  <Form.Label>Twitter</Form.Label>
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Analytics;
