import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./OurTeam.css";

const teamMembers = [
  {
    img: "images/team1.png", // Replace with your image paths
    name: "John Doe",
    designation: "CEO",
    description:
      "John is the CEO of the company and has over 20 years of experience in the industry.",
    social: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    img: "images/team2.png",
    name: "Jane Smith",
    designation: "CTO",
    description:
      "Jane is the CTO and leads the technology and development teams.",
    social: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    img: "images/team3.png",
    name: "Alice Johnson",
    designation: "COO",
    description:
      "Alice is the COO and ensures the smooth operation of our daily business.",
    social: {
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
      github: "https://github.com/alicejohnson",
    },
  },
  {
    img: "images/team4.png",
    name: "Demi Wilkinson",
    designation: "COO",
    description:
      "Alice is the COO and ensures the smooth operation of our daily business.",
    social: {
      twitter: "https://twitter.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
      github: "https://github.com/alicejohnson",
    },
  },
];

const OurTeam = () => {
  return (
    <div className="our-team-container">
      <Container>
        <h1 className="text-center py-5" style={{color:"#FCF20D"}}>MEET THE TEAM</h1>
        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="h-100 text-center teamcard">
                <Card.Img variant="top" src={member.img} />
                <Card.Body>
                  <Card.Title className="text-start">{member.name}</Card.Title>
                  <Card.Subtitle
                    className="mb-2"
                    style={{ marginLeft: "10px" ,color:"#FCF20D"}}
                  >
                    {member.designation}
                  </Card.Subtitle>
                  <Card.Text className="text-start">
                    {member.description}
                  </Card.Text>
                  <div className="social-icons">
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-3"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-3"
                    >
                      <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OurTeam;
