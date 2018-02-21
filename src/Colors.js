// @flow
import React from "react";
import PropTypes from "prop-types";
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

Color.propTypes = {
  color: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired
};

const Colors = (props: { click: Function }) => {
  const click = props.click;
  return (
    <div className="colors">
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

export default Colors;
