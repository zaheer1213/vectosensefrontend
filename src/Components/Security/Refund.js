import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Headar/Header";
import Footer from "../Footer/Footer";
import Topbar from "../Client/Topbar/Topbar";

const Refund = () => {
  const userRole = localStorage.getItem("role");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userRole == "Admin" ? <Header /> : <Topbar />}
      <Container className="py-5 privacy-policy-container">
        <Row>
          <Col>
            <h1>Refund Policy</h1>
            <strong>Conditions for Refunds:</strong>
            <ul>
              <li>
                Service Dissatisfaction: If you are not satisfied with our
                service, you may request a refund within 7 days of service
                completion.
              </li>
              <li>
                Cancellation: You can cancel a scheduled service and request a
                refund up to 24 hours before the scheduled appointment.
              </li>
            </ul>
            <h3>Refund Process:</h3>
            <ul>
              <li>
                Contact Us: To initiate a refund, please contact our customer
                support team at hello@connectingdotsbs.com.
              </li>
              <li>
                Provide Details: Provide your order number and reason for
                requesting a refund.
              </li>
              <li>
                Processing Time: Refunds will be processed within 5 business
                days after approval.
              </li>
            </ul>
            <h3>Refund Method:</h3>
            <ul>
              <li>
                Refunds will be issued using the original method of payment.
                Please note that it may take up to 7-10 business days for the
                refund to reflect in your account.
              </li>
            </ul>
            <h3>Exceptions:</h3>
            <ul>
              <li>
                No-Show: Refunds will not be issued for services where the
                customer fails to show up without prior notice.
              </li>
              <li>
                Discounted Services: Services purchased under special promotions
                or discounts may have different refund conditions. Please check
                the specific terms during purchase.
              </li>
            </ul>
            <h3>Contact Us:</h3>
            <p>
              For any questions about our refund policy, please contact us at
              connectingdotsbs.
            </p>
            <p>
              <strong>Connect and Discover Business Solutions Pvt. Ltd.</strong>
              <br />
              <strong>Email:</strong> hello@connectingdotsbs.com <br />
              <strong>Address:</strong> Office No. 105, The Core Business
              Center, Lane Number 21, NIBM, Kondhwa, Pune, Maharashtra 411048.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Refund;
