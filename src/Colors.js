// @flow
import React from "react";
import PropTypes from "prop-types";
import { formatColor } from "./utils";

type ColorType = {
  color: number,
  size: string,
  click: Function
};

const Color = (props: ColorType) => {
  const color = formatColor(props.color);
  const size = props.size;

  const paintChip = {
    display: "inline-block",
    height: size,
    width: size,
    margin: "5px",
    background: color
  };

  return <div style={paintChip} onClick={() => props.click(props.color)} />;
};

Color.propTypes = {
  color: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};

type ColorsType = {
  size: string,
  click: Function
};

export const Colors = (props: ColorsType) => {
  const size = props.size;
  const click = props.click;
  return (
    <div>
      <Color size={size} click={click} color={0xff0000} />
      <Color size={size} click={click} color={0x00bb00} />
      <Color size={size} click={click} color={0x6666ff} />
      <Color size={size} click={click} color={0xffd700} />
      <Color size={size} click={click} color={0xffffff} />
    </div>
  );
};

Colors.propTypes = {
  size: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};
