// @flow
import React from "react";
import PropTypes from "prop-types";

import plusCircle from "./images/plus-circle.svg";
import minusCircle from "./images/minus-circle.svg";
import colors from "./images/colors.svg";
import seconds from "./images/seconds.svg";
import showDate from "./images/show-date.svg";

type ControlsType = {
  size: string,
  clock: Object
};

export const Controls = (props: ControlsType) => {
  const size = props.size;
  const clock = props.clock;

  const control = {
    height: size,
    width: size,
    margin: "5px"
  };

  return (
    <div>
      <img
        onClick={clock.dimmerClick}
        src={minusCircle}
        style={control}
        alt="Dimmer"
      />

      <img
        onClick={clock.brighterClick}
        src={plusCircle}
        style={control}
        alt="Brighter"
      />

      <img
        onClick={clock.showColorClick}
        src={colors}
        style={control}
        alt="Select color"
      />

      <img
        onClick={clock.showSecondsClick}
        src={seconds}
        style={control}
        alt="Show seconds"
      />

      <img
        onClick={clock.showDateClick}
        src={showDate}
        style={control}
        alt="Show date"
      />
    </div>
  );
};

Controls.propTypes = {
  size: PropTypes.string.isRequired,
  clock: PropTypes.object.isRequired
};
