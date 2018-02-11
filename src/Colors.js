import React from "react";
import { formatColor } from "./utils";

const Color = props => {
  const color = formatColor(props.color);
  return (
    <div
      className="color"
      onClick={() => {
        props.click(props.color);
      }}
      style={{ background: color }}
    />
  );
};

const Colors = props => {
  const click = props.click;
  return (
    <div className="colors">
      <Color click={click} color={[0xff, 0x00, 0x00]} />
      <Color click={click} color={[0x00, 0xff, 0x00]} />
      <Color click={click} color={[0x00, 0x00, 0xff]} />
      <Color click={click} color={[0xff, 0x00, 0xff]} />
      <Color click={click} color={[0xff, 0xff, 0x00]} />
      <Color click={click} color={[0xff, 0xff, 0xff]} />
    </div>
  );
};

export default Colors;
