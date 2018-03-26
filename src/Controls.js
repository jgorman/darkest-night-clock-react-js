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
  Clock: Object
};

export const Controls = (props: ControlsType) => {
  const size = props.size;
  const Clock = props.Clock;

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
        onTouchStart={Clock.dimmerTouch}
        onTouchEnd={Clock.endTouch}
        onTouchCancel={Clock.endTouch}
        onClick={Clock.dimmerClick}
      />

      <img
        src={plusCircle}
        style={control}
        alt="Brighter"
        onContextMenu={e => e.preventDefault()}
        onTouchStart={Clock.brighterTouch}
        onTouchEnd={Clock.endTouch}
        onTouchCancel={Clock.endTouch}
        onClick={Clock.brighterClick}
      />

      <img
        onClick={Clock.showColorClick}
        src={colors}
        style={control}
        alt="Select color"
      />

      <img
        onClick={Clock.showSecondsClick}
        src={seconds}
        style={control}
        alt="Show seconds"
      />

      <img
        onClick={Clock.showDateClick}
        src={showDate}
        style={control}
        alt="Show date"
      />
    </div>
  );
};

Controls.propTypes = {
  size: PropTypes.number.isRequired,
  Clock: PropTypes.object.isRequired
};
