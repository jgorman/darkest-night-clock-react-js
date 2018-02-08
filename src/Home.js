import React, { Component } from 'react';
import { Link } from "react-router-dom";
import gong from "./gong.svg";
import clock from "./clock.svg";

class Home extends Component {
  render() {
    return (
      <div className="controls">
        <h1>SPA Timer Home Page</h1>
        <Link to="/timer"><img src={gong} alt="Timer" /></Link>
        <Link to="/clock"><img src={clock} alt="Clock" /></Link>
      </div>
    );
  }
}

export default Home;
