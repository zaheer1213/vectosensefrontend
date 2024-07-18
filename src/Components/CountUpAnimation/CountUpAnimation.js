import React from "react";
import CountUp from "react-countup";
import "./CountUpAnimation.css"; // Import your CSS for styling

const CountUpAnimation = ({ start, end, duration, className }) => {
  return (
    <div className={`count-up-animation ${className}`}>
      <CountUp start={start} end={end} duration={duration} />
    </div>
  );
};

export default CountUpAnimation;
