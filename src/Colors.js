import React, { Component } from "react";
import { formatColor } from "./utils";

class Color extends Component {
  render() {
    const color = formatColor(this.props.color);
    return (
      <div className="color"
           onClick={() => { this.props.click(this.props.color) } }
           style={{ background: color }}></div>
    );
  }

}

class Colors extends Component {
  render() {
    if (!this.props.show) { return null; }
    const click = this.props.click;
    return (
      <div className="colors">
        <Color click={click} color={[0xff, 0x00, 0x00]}></Color>
        <Color click={click} color={[0x00, 0xff, 0x00]}></Color>
        <Color click={click} color={[0x00, 0x00, 0xff]}></Color>
        <Color click={click} color={[0xff, 0x00, 0xff]}></Color>
        <Color click={click} color={[0xff, 0xff, 0x00]}></Color>
        <Color click={click} color={[0xff, 0xff, 0xff]}></Color>
      </div>
    );
  }
}

export default Colors;
