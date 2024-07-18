import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import "./Dashbord.css";
import CanvasJSReact from "@canvasjs/react-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";

const Dashbord = () => {
  const MIN = 0;
  const MAX = 100;

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [data, setData] = useState([]);
  const [timeToRender, setTimeToRender] = useState("");
  const [timeRange, setTimeRange] = useState("12months");
  const [direct, setDirect] = useState(70);
  const [referral, setReferral] = useState(50);
  const [socialMedia, setSocialMedia] = useState(30);
  const [twitter, setTwitter] = useState(20);

  const transction = [
    {
      id: 1,
      status: "complete",
      name: "Alex Johnson",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
    {
      id: 2,
      status: "pending",
      name: "Jamie Smith",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
    {
      id: 3,
      status: "complete",
      name: "Morgan Davis",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
    {
      id: 4,
      status: "complete",
      name: "Dent",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
    {
      id: 5,
      status: "complete",
      name: "Davis",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
  ];
  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 249;
            },
          },
        },
      },
    },
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
    colors: ["#5B549E", "#5B549E", "#5B549E", "#5B549E"],
  };

  const series = [44, 55, 67, 83];
  const getStatusVariant = (status) => {
    switch (status) {
      case "complete":
        return { bg: "success", text: "dark" };
      case "pending":
        return { bg: "warning", text: "dark" };
      case "cancel":
        return { bg: "danger", text: "dark" };
      default:
        return { bg: "secondary", text: "dark" };
    }
  };

  useEffect(() => {
    setStartTime(new Date());

    const limit = 50000;
    let y = 100;
    const dataPoints = [];

    for (let i = 0; i < limit; i += 1) {
      y += Math.round(Math.random() * 10 - 5);
      dataPoints.push({
        x: i,
        y: y,
      });
    }

    setData([{ type: "line", dataPoints }]);

    setEndTime(new Date());
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      setTimeToRender(`Time to Render: ${endTime - startTime}ms`);
    }
  }, [startTime, endTime]);

  const options1 = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Service Report",
    },
    data: data,
  };
  return (
    <>
      <Container fluid>
        <Container fluid>
          <Row style={{ marginTop: "50px" }}>
            <Col>
              <div className="text-center hedingDiv">
                <h1 className="text-center ">Dashboard</h1>
                <p>
                  Our philosophy is simple — create a team of diverse,
                  passionate people and <br /> foster a culture that empowers
                  you to do you best work.
                </p>
              </div>
              <Row className="mt-5">
                <Col md={3}>
                  <div className="custome-cards-dashbord bg-filler">
                    <strong>TOTAL PROFIT</strong>
                    <div className="ineer-dashbord-div">
                      $12,426
                      <div>+ 36%</div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="custome-cards-dashbord bg-filler text-center">
                    <strong>Total Services</strong>
                    <h1 className="text-center">100</h1>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="custome-cards-dashbord bg-filler text-center">
                    <strong>Total Agents</strong>
                    <h1 className="text-center">150</h1>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="custome-cards-dashbord bg-filler">
                    <strong>per annum profit</strong>
                    <div className="ineer-dashbord-div">
                      $2,38,485
                      <div>+ 56%</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="py-3 mt-5">
                <Col md={4}>
                  <Chart
                    options={options}
                    series={series}
                    type="radialBar"
                    height="350"
                  />
                </Col>
                <Col md={4}>
                  <strong>Recent Transactions</strong>
                  <Table className="mt-3">
                    <tbody>
                      {transction.map((transition) => (
                        <tr key={transition.id}>
                          <td className="text-center">
                            <Badge
                              bg={getStatusVariant(transition.status).bg}
                              text={getStatusVariant(transition.status).text}
                            >
                              . {transition.status}
                            </Badge>
                          </td>
                          <td>{transition.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                  <div className="pointer text-end">
                    See All Transactions &nbsp;{" "}
                    <FontAwesomeIcon icon={faChevronRight} />
                    <Table>
                      <tbody>
                        {transction.map((transition) => (
                          <tr key={transition.id}>
                            <td className="text-center">
                              {transition.cardName}
                              <br />
                              {transition.paymentType}
                            </td>
                            <td className="text-center">
                              {transition.price}
                              <br />
                              {transition.date}
                            </td>
                            <td className="text-center"></td>
                            <td className="text-center">
                              <FontAwesomeIcon icon={faEllipsis} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              <Row className="py-5 mt-3">
                {" "}
                <Col className="d-flex justify-content-between align-items-center btn-group-wrapper">
                  <ButtonGroup>
                    <Button
                      onClick={() => setTimeRange("7days")}
                      style={{ background: "#5B549E" }}
                    >
                      7 Days
                    </Button>{" "}
                    &nbsp;
                    <Button
                      onClick={() => setTimeRange("30days")}
                      style={{ background: "#5B549E" }}
                    >
                      30 Days
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => setTimeRange("6months")}
                      style={{ background: "#5B549E" }}
                    >
                      6 Months
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => setTimeRange("12months")}
                      style={{ background: "#5B549E" }}
                    >
                      12 Months
                    </Button>
                  </ButtonGroup>
                  <Button style={{ background: "#5B549E" }}>Download</Button>
                </Col>
                <CanvasJSChart options={options1} />
                {/* <span id="timeToRender" style={spanStyle}>
                  {timeToRender}
                </span> */}
              </Row>
              <Row>
                <div className="customerstable">
                  <h4 className="">Services</h4>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <div className="customertablerow">
                          <img src="images/customer.png" className="logoimg" />
                          <div>
                            <strong>Jenny Wilson</strong> <br />
                          </div>
                          <div>
                            <strong>$11,234</strong> <br />
                          </div>
                        </div>
                        <div className="customertablerow">
                          <img src="images/customer2.png" className="logoimg" />
                          <div>
                            <strong>Devon Lane</strong> <br />
                          </div>
                          <div>
                            <strong>$10,483</strong> <br />
                          </div>
                        </div>
                        <div className="customertablerow">
                          <img src="images/customer2.png" className="logoimg" />
                          <div>
                            <strong>Jane Cooper</strong> <br />
                          </div>
                          <div>
                            <strong>$9,084</strong> <br />
                          </div>
                        </div>
                        <div className="customertablerow">
                          <img src="images/customer2.png" className="logoimg" />
                          <div>
                            <strong>Jane Cooper</strong> <br />
                          </div>
                          <div>
                            <strong>$9,084</strong> <br />
                          </div>
                        </div>
                        <div className="customertablerow">
                          <img src="images/customer.png" className="logoimg" />
                          <div>
                            <strong>Jenny Wilson</strong> <br />
                          </div>
                          <div>
                            <strong>$11,234</strong> <br />
                          </div>
                        </div>
                        <div className="mt-3">
                          <h6 className="text-center pointer">
                            {" "}
                            See More Services
                          </h6>
                        </div>
                      </Col>
                      <Col md={6}>
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
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Dashbord;
