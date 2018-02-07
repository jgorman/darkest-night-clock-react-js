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

    return (
      <div onClick={() => { this.props.click(this.props.color) } }
           style={{ color: formatColor(this.props.color) }}>
        {this.props.children}
      </div>
    );
  }

}

class Colors extends Component {
  render() {
    return (
      <div>
        <Color click={this.props.click} color={[  0,   0, 255]}>Blue</Color>
        <Color click={this.props.click} color={[  0, 255,   0]}>Green</Color>
        <Color click={this.props.click} color={[  0, 255, 255]}>Yellow</Color>
        <Color click={this.props.click} color={[255,   0,   0]}>White</Color>
        <Color click={this.props.click} color={[255,   0, 255]}>Orange</Color>
        <Color click={this.props.click} color={[255, 255,   0]}>Red</Color>
        <Color click={this.props.click} color={[255, 255, 255]}>Purple</Color>
      </div>
    );
  }
}

export default Colors;
