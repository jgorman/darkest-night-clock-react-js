import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Timer from "./Timer";
import Clock from "./Clock";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/timer" component={Timer} />
            <Route path="/clock" component={Clock} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
