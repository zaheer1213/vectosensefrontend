import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Headar/Header";
import Topbar from "../Client/Topbar/Topbar";
import "./TermsAndConditions.css"; // Import the CSS file

const TermsAndConditions = () => {
  const userRole = localStorage.getItem("role");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {userRole === "Admin" ? <Header /> : <Topbar />}
      <Container className="py-5">
        <Row>
          <Col className="terms-container">
            <h1>Terms and Conditions</h1>
            <strong>Welcome to Vecto Sense</strong>
            <p>
              These terms and conditions outline the rules and regulations for
              the use of Vecto Sense's website and service booking application,
              located at{" "}
              <a href="https://vectosense.com/">https://vectosense.com/</a>. By
              accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Vecto Sense if you do not agree
              to take all of the terms and conditions stated on this page.
            </p>
            <section>
              <h3>1. Terminology</h3>
              <p>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement, and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person logging on
                this website and compliant with the Company's terms and
                conditions. "The Company", "Ourselves", "We", "Our", and "Us",
                refers to our Company. "Party", "Parties", or "Us", refers to
                both the Client and ourselves.
              </p>
            </section>
            <section>
              <h3>2. Services</h3>
              <p>
                Vecto Sense provides a platform for users to book various
                services online. We act as an intermediary between you and the
                service providers listed on our platform.
              </p>
              <ul>
                <li>
                  <strong>Booking:</strong> By making a booking through Vecto
                  Sense, you agree to the terms and conditions of the specific
                  service provider.
                </li>
                <li>
                  <strong>Payment:</strong> Payments for services are made
                  through our platform using secure payment processors. You
                  agree to provide accurate payment information and authorize us
                  to charge the specified amount.
                </li>
              </ul>
            </section>
            <section>
              <h3>3. User Responsibilities</h3>
              <p>
                By using our services, you agree to provide accurate, current,
                and complete information during the booking process.
              </p>
              <ul>
                <li>
                  <strong>Account Security:</strong> You are responsible for
                  maintaining the confidentiality of your account information
                  and for all activities that occur under your account.
                </li>
                <li>
                  <strong>Prohibited Activities:</strong> You agree not to
                  engage in any unlawful activities or activities that may harm
                  our platform or users.
                </li>
              </ul>
            </section>
            <section>
              <h3>4. Service Provider Responsibilities</h3>
              <p>
                Service providers listed on our platform are responsible for the
                quality and performance of the services they offer. We do not
                guarantee the quality or availability of any services listed on
                our platform.
              </p>
            </section>
            <section>
              <h3>5. Limitation of Liability</h3>
              <p>
                Vecto Sense is not liable for any damages arising out of or in
                connection with your use of our services. This includes, but is
                not limited to, direct, indirect, incidental, punitive, and
                consequential damages.
              </p>
            </section>
            <section>
              <h3>6. Privacy Policy</h3>
              <p>
                Our Privacy Policy, which describes how we handle your personal
                information, is incorporated into these Terms and Conditions. By
                using our services, you agree to the terms of our Privacy
                Policy.
              </p>
            </section>
            <section>
              <h3>7. Termination</h3>
              <p>
                We may terminate or suspend your account and access to our
                services immediately, without prior notice or liability, if you
                breach these Terms and Conditions.
              </p>
            </section>
            <section>
              <h3>8. Changes to Terms and Conditions</h3>
              <p>
                We may update our Terms and Conditions from time to time. We
                will notify you of any changes by posting the new Terms and
                Conditions on this page. You are advised to review these Terms
                and Conditions periodically for any changes. Changes to these
                Terms and Conditions are effective when they are posted on this
                page.
              </p>
            </section>
            <section>
              <h3>9. Contact Us</h3>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <p>
                <strong>
                  Connect and Discover Business Solutions Pvt. Ltd.
                </strong>
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

export default TermsAndConditions;
