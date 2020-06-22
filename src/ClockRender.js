// @flow
import React from "react"

import { Controls } from "./Controls"
import { Colors } from "./Colors"

import type { ClockState } from "./appstate"

export const ClockRender = (clock: Object, state: ClockState, calc: Object) => {
  const viewport_style = {
    position: "absolute",
    margin: "auto",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }

  const message_style = {
    color: "white",
    fontSize: calc.message_h + "px",
    height: calc.message_h + "px",
  }

  const time_style = {
    color: calc.color,
    fontSize: calc.time_h + "px",
  }

  const date_style = {
    color: calc.color,
    fontSize: calc.date_h + "px",
  }

  return (
    <div style={viewport_style}>
      <div
        onTouchStart={clock.brightnessStart}
        onTouchMove={clock.brightnessMove}
        onTouchEnd={clock.brightnessEnd}
        onTouchCancel={clock.brightnessEnd}
        onClick={clock.showControlsClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div style={time_style}>{calc.time_s}</div>

        <div style={message_style}>{state.message}</div>

        {state.showDate ? (
          <div style={date_style}>{calc.date_s}</div>
        ) : undefined}
      </div>

      {state.showControls ? (
        state.showColors ? (
          <Colors size={calc.control_h} click={clock.setColorClick} />
        ) : (
          <Controls size={calc.control_h} clock={clock} />
        )
      ) : undefined}
    </div>
  )
}
