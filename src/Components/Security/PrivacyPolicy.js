import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Headar/Header";
import Topbar from "../Client/Topbar/Topbar";
import "./PrivacyPolicy.css"; // Assuming you have a CSS file for custom styles

const PrivacyPolicy = () => {
  const userRole = localStorage.getItem("role");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {userRole === "Admin" ? <Header /> : <Topbar />}
      <Container className="py-5 privacy-policy-container">
        <Row>
          <Col className="privacy-policy-content">
            <h1>Privacy Policy</h1>
            <p>
              <strong>Welcome to Vecto Sense</strong>
            </p>
            <p>
              This privacy policy describes how Vecto Sense ("we", "our", "us")
              collects, uses, and shares personal information when you use our
              service booking application and website{" "}
              <a href="https://vectosense.com/">https://vectosense.com/</a>. By
              using our services, you agree to the collection and use of
              information in accordance with this policy.
            </p>
            <section>
              <h3>1. Information Collection</h3>
              <p>
                We collect the following information to provide and improve our
                services:
              </p>
              <ul>
                <li>
                  Personal Identification Information: Name, email address,
                  phone number, and address.
                </li>
                <li>
                  Payment Information: Payment card details and transaction
                  information.
                </li>
                <li>
                  Service Details: Booking history, preferences, and feedback.
                </li>
                <li>
                  Usage Data: Information on how you use our website and
                  services.
                </li>
              </ul>
            </section>
            <section>
              <h3>2. Use of Information</h3>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul>
                <li>To provide, operate, and maintain our services.</li>
                <li>To process transactions and manage your bookings.</li>
                <li>
                  To communicate with you, including responding to inquiries and
                  providing customer support.
                </li>
                <li>
                  To send you updates, promotions, and marketing communications
                  (you can opt-out at any time).
                </li>
                <li>
                  To comply with legal obligations and enforce our terms and
                  policies.
                </li>
              </ul>
            </section>
            <section>
              <h3>3. Sharing of Information</h3>
              <p>
                We do not share your personal information with third parties
                except in the following circumstances:
              </p>
              <ul>
                <li>
                  Service Providers: We may share information with vendors and
                  service providers who perform services on our behalf, such as
                  payment processing (PhonePe), customer support, and data
                  analysis.
                </li>
                <li>
                  Legal Requirements: We may disclose your information if
                  required by law or in response to valid requests by public
                  authorities.
                </li>
                <li>
                  Business Transfers: In the event of a merger, acquisition, or
                  sale of all or a portion of our assets, your information may
                  be transferred as part of the transaction.
                </li>
              </ul>
            </section>
            <section>
              <h3>4. Payment Information</h3>
              <p>
                All payment transactions are processed securely by our payment
                processor, PhonePe. We do not store your payment card details on
                our servers. PhonePe adheres to the standards set by PCI-DSS as
                managed by the PCI Security Standards Council, which ensures the
                secure handling of payment information.
              </p>
            </section>
            <section>
              <h3>5. Data Security</h3>
              <p>
                We take the security of your personal information seriously and
                implement appropriate technical and organizational measures to
                protect it. However, please note that no method of transmission
                over the internet or method of electronic storage is 100%
                secure.
              </p>
            </section>
            <section>
              <h3>6. User Rights</h3>
              <p>
                You have the following rights regarding your personal
                information:
              </p>
              <ul>
                <li>
                  Access: You can request a copy of the information we hold
                  about you.
                </li>
                <li>
                  Correction: You can request that we correct any inaccurate or
                  incomplete information.
                </li>
                <li>
                  Deletion: You can request that we delete your personal
                  information, subject to certain exceptions.
                </li>
                <li>
                  Objection: You can object to the processing of your personal
                  information under certain circumstances.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                information below.
              </p>
            </section>
            <section>
              <h3>7. Contact Us</h3>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <p>
                <strong>
                  Connect and Discover Business Solutions Pvt. Ltd.
                </strong>{" "}
                <br />
                <strong>Email:</strong> hello@connectingdotsbs.com <br />
                <strong>Address:</strong> Office No. 105, The Core Business
                Center, Lane Number 21, NIBM, Kondhwa, Pune, Maharashtra 411048.
              </p>
            </section>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
