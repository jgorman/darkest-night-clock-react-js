// @flow
import React, { Component } from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { reducer } from "./appstate"
import { getOldState } from "./platform"
import Clock from "./Clock"
import { REDUX_STORAGE_LOAD, REDUX_STORAGE_SAVE } from "./appstate"

const store = createStore(reducer)

class App extends Component<Object> {
  componentDidMount = () => {
    const oldState = getOldState()
    store.dispatch({ type: REDUX_STORAGE_LOAD, oldState: oldState })

    // Watch to see when we need to save the ClockState.
    store.subscribe(() => {
      const state = store.getState()
      if (state.unsavedState) {
        store.dispatch({ type: REDUX_STORAGE_SAVE })
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Clock />
      </Provider>
    )
  }
}

export default App
