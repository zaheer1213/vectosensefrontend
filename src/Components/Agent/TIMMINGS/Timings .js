import React from "react";
import { Container, Table } from "react-bootstrap";
import "./Timings.css";

const timings = [
  { day: "Monday", opening: "9:00 AM", closing: "5:00 PM" },
  { day: "Tuesday", opening: "9:00 AM", closing: "5:00 PM" },
  { day: "Wednesday", opening: "9:00 AM", closing: "5:00 PM" },
  { day: "Thursday", opening: "9:00 AM", closing: "5:00 PM" },
  { day: "Friday", opening: "9:00 AM", closing: "5:00 PM" },
  { day: "Saturday", opening: "10:00 AM", closing: "4:00 PM" },
  { day: "Sunday", opening: "Closed", closing: "Closed" },
];

const Timings = () => {
  return (
    <div className="timings-container">
      <Container>
        <h1 className="text-center my-5" style={{color:"#FCF20D"}}>TIMINGS</h1>
        <Table   hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Days</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
            </tr>
          </thead>
          <tbody>
            {timings.map((timing, index) => (
              <tr key={index}>
                <td style={{color:"#FCF20D"}}>{timing.day}</td>
                <td>{timing.opening}</td>
                <td>{timing.closing}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Timings;
