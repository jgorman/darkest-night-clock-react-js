// @flow
import React from "react";
import PropTypes from "prop-types";
import { formatColor } from "./utils";

type ColorType = {
  color: number,
  click: Function
};

const Color = (props: ColorType) => {
  const color = formatColor(props.color);
  const paintChip = {
    display: "inline-block",
    height: "60px",
    width: "60px",
    margin: "5px",
    background: color
  };

  return <div style={paintChip} onClick={() => props.click(props.color)} />;
};

Color.propTypes = {
  color: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired
};

export const Colors = (props: { click: Function }) => {
  const click = props.click;
  return (
    <div>
      <Color click={click} color={0xff0000} />
      <Color click={click} color={0xff00ff} />
      <Color click={click} color={0x0000ff} />
      <Color click={click} color={0xffff00} />
      <Color click={click} color={0xffffff} />
    </div>
  );
};

Colors.propTypes = {
  click: PropTypes.func.isRequired
};
