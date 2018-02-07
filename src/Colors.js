import React, { Component } from "react";
import { formatColor } from "./utils";

class Color extends Component {
  render() {

  //   return (
  //     <div onClick={this.props.click(this.props.color)}
  //          style={{ color: formatColor(this.props.color) }}>
  //       {this.props.children}
  //     </div>
  //   );
  // }

    const color = formatColor(this.props.color);
    return (
      <div className="color" onClick={() => { this.props.click(this.props.color) } }
           style={{ background: color }}>
        {this.props.children}
      </div>
    );
  }

}

class Colors extends Component {
  render() {
    return (
      <div className="colors">
        <Color click={this.props.click} color={[0xff, 0x00, 0x00]}></Color>
        <Color click={this.props.click} color={[0x00, 0xff, 0x00]}></Color>
        <Color click={this.props.click} color={[0x00, 0x00, 0xff]}></Color>
        <Color click={this.props.click} color={[0xff, 0x00, 0xff]}></Color>
        <Color click={this.props.click} color={[0xff, 0xff, 0x00]}></Color>
        <Color click={this.props.click} color={[0xff, 0xff, 0xff]}></Color>
      </div>
    );
  }
}

export default Colors;
