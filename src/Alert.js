import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { lastMsg: "" }
  }

  render() {
    return (
      <p>Look: { this.props.children }</p>
    )
  }
}

export default Alert;
