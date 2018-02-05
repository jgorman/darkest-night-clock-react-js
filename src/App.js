import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";

import Home from "./Home";
import Timer from "./Timer";
import Session from "./Session";
import Clock from "./Clock";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/timer">Timer</NavLink>
            <NavLink to="/session">Session</NavLink>
            <NavLink to="/clock">Clock</NavLink>
          </div>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/timer" component={Timer} />
            <Route path="/session" component={Session} />
            <Route path="/clock" component={Clock} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
