import React from "react";
import { formatColor } from "./appstate";

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
      <Color click={click} color={0xff0000} />
      <Color click={click} color={0x00ff00} />
      <Color click={click} color={0x0000ff} />
      <Color click={click} color={0xff00ff} />
      <Color click={click} color={0xffff00} />
      <Color click={click} color={0xffffff} />
    </div>
  );
};

export default Colors;
