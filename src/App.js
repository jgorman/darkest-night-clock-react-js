import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./appstate";
import Clock from "./Clock";

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
