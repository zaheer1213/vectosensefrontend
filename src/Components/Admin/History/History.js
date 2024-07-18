import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEllipsis,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import "./History.css";

const History = () => {
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

  const transitions = [
    {
      id: 1,
      status: "complete",
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
      cardName: "Product B",
      number: "5678",
      price: "$50",
      date: "2024-06-29",
      platform: "Flipkart",
      paymentType: "Bank payment",
    },
    {
      id: 3,
      status: "cancel",
      cardName: "Product C",
      number: "9101",
      price: "$200",
      date: "2024-06-30",
      platform: "Etsy",
      paymentType: "Card payment",
    },
    {
      id: 4,
      status: "complete",
      cardName: "Visa card  **** 4831",
      number: "1234",
      price: "$100",
      date: "2024-06-28",
      platform: "Amazon",
      paymentType: "Card payment",
    },
    {
      id: 5,
      status: "pending",
      cardName: "Product B",
      number: "5678",
      price: "$50",
      date: "2024-06-29",
      platform: "Flipkart",
      paymentType: "Bank payment",
    },
    {
      id: 6,
      status: "cancel",
      cardName: "Product C",
      number: "9101",
      price: "$200",
      date: "2024-06-30",
      platform: "Etsy",
      paymentType: "Card payment",
    },
  ];

  return (
    <>
      <Container fluid className="mainconatiner py-5">
        <Container>
          <img
            src="images/Frame 1321316250.png"
            onClick={() => window.history.back()}
            className="pointer"
          />
          <h1 className="topmargin">History</h1>
          <p>
            Here you can manage all your agents. Add new agents, edit existing
            details, or remove agents from your company.
          </p>
          <Row>
            <Col md={8} className="tablecol">
              <div className="hedingcol">
                <div>
                  <h5 className="">Transactions</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipis.</p>
                </div>
                <div className="pointer">
                  See All Transactions &nbsp;{" "}
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
              <Table>
                <tbody>
                  {transitions.map((transition) => (
                    <tr key={transition.id}>
                      <td className="text-center">
                        <Badge
                          bg={getStatusVariant(transition.status).bg}
                          text={getStatusVariant(transition.status).text}
                        >
                          . {transition.status}
                        </Badge>
                      </td>
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
                      <td className="text-center">{transition.platform}</td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faEllipsis} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <div className="customerstable">
                <h4 className="">Recent Customers</h4>
                <p>Lorem ipsum dolor sit ametis. </p>
                <Container>
                  <Row>
                    <Col>
                      <div className="customertablerow">
                        <img src="images/customer.png" className="logoimg" />
                        <div>
                          <strong>Jenny Wilson</strong> <br />
                          <span>w.lawson@example.com</span>
                        </div>
                        <div>
                          <strong>$11,234</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer.png" className="logoimg" />
                        <div>
                          <strong>Jenny Wilson</strong> <br />
                          <span>w.lawson@example.com</span>
                        </div>
                        <div>
                          <strong>$11,159</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer2.png" className="logoimg" />
                        <div>
                          <strong>Devon Lane</strong> <br />
                          <span>dat.roberts@example.com</span>
                        </div>
                        <div>
                          <strong>$10,483</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>{" "}
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer2.png" className="logoimg" />
                        <div>
                          <strong>Jane Cooper</strong> <br />
                          <span>jgraham@example.com</span>
                        </div>
                        <div>
                          <strong>$9,084</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer.png" className="logoimg" />
                        <div>
                          <strong>Dianne Russell</strong> <br />
                          <span>curtis.d@example.com</span>
                        </div>
                        <div>
                          <strong>$11,234</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer2.png" className="logoimg" />
                        <div>
                          <strong>Dianne Russell</strong> <br />
                          <span>curtis.d@example.com</span>
                        </div>
                        <div>
                          <strong>$11,234</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-3">
                      <div className="customertablerow">
                        <img src="images/customer2.png" className="logoimg" />
                        <div>
                          <strong>Dianne Russell</strong> <br />
                          <span>curtis.d@example.com</span>
                        </div>
                        <div>
                          <strong>$11,234</strong> <br />
                          <span>Austin</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default History;
