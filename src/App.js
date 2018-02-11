import React, { Component } from "react";
import Clock from "./Clock";
import { reducer } from "./appstate";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Clock />
      </Provider>
    );
  }
}

export default App;
