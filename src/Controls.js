// @flow
import React from "react";
import PropTypes from "prop-types";

import plusCircle from "./images/plus-circle.svg";
import minusCircle from "./images/minus-circle.svg";
import colors from "./images/colors.svg";
import seconds from "./images/seconds.svg";
import showDate from "./images/show-date.svg";

type ControlsType = {
  size: number,
  clock: Object
};

export const Controls = (props: ControlsType) => {
  const size = props.size;
  const clock = props.clock;

  const control = {
    height: size + "px",
    width: size + "px",
    margin: "5px"
  };

  return (
    <div>
      <img
        src={minusCircle}
        style={control}
        alt="Dimmer"
        onContextMenu={e => e.preventDefault()}
        onTouchStart={clock.dimmerTouch}
        onTouchEnd={clock.endTouch}
        onClick={clock.dimmerClick}
      />

      <img
        src={plusCircle}
        style={control}
        alt="Brighter"
        onContextMenu={e => e.preventDefault()}
        onTouchStart={clock.brighterTouch}
        onTouchEnd={clock.endTouch}
        onClick={clock.brighterClick}
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
  size: PropTypes.number.isRequired,
  clock: PropTypes.object.isRequired
};
