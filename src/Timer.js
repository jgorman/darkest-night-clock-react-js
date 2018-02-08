import React, { Component } from 'react';
import { Link } from "react-router-dom";
import home from "./home.svg";
import clock from "./clock.svg";


class Timer extends Component {
  render() {
    return (
      <div className="controls">
        <h1>Timer setup.</h1>
        <Link to="/"><img src={home} alt="Home" /></Link>
        <Link to="/clock"><img src={clock} alt="Clock" /></Link>
      </div>
    );
  }
}

export default Timer;
