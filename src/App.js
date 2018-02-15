import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./appstate";
import { getOldState } from "./platform";
import Clock from "./Clock";

const store = createStore(reducer);

class App extends Component {
  componentDidMount = () => {
    const oldState = getOldState();
    store.dispatch({
      type: "REDUX_STORAGE_LOAD",
      oldState: oldState
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Clock />
      </Provider>
    );
  }
}

export default App;
