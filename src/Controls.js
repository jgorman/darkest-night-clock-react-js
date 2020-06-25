import React from "react"

import plusCircle from "./images/plus-circle.svg"
import minusCircle from "./images/minus-circle.svg"
import colors from "./images/colors.svg"
import seconds from "./images/seconds.svg"
import showDate from "./images/show-date.svg"

export const Controls = (props) => {
  const size = props.size
  const actions = props.actions

  const control = {
    height: size + "px",
    width: size + "px",
    margin: "5px",
  }
  return (
    <div>
      <img
        src={minusCircle}
        style={control}
        alt="Dimmer"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={actions.dimmerPress}
        onTouchEnd={actions.endPress}
        onTouchCancel={actions.endPress}
        onClick={actions.dimmerClick}
      />

      <img
        src={plusCircle}
        style={control}
        alt="Brighter"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={actions.brighterPress}
        onTouchEnd={actions.endPress}
        onTouchCancel={actions.endPress}
        onClick={actions.brighterClick}
      />

      <img
        onClick={actions.showColorClick}
        src={colors}
        style={control}
        alt="Select color"
      />

      <img
        onClick={actions.showSecondsClick}
        src={seconds}
        style={control}
        alt="Show seconds"
      />

      <img
        onClick={actions.showDateClick}
        src={showDate}
        style={control}
        alt="Show date"
      />
    </div>
  )
}
