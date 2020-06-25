import React from "react"

import { geometry } from "./utils"
import { Controls } from "./Controls"
import { Colors } from "./Colors"
import { getViewPort } from "./platform"

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
  backgroundColor: "black",
  fontFamily: "sans-serif",
  fontWeight: "100",
}

export const ClockRender = (state, actions) => {
  const viewPort = getViewPort()
  if (!viewPort) {
    setTimeout(actions.redisplay, 0)
    return <div id="clock-face" style={viewport_style}></div>
  }

  const geo = geometry(viewPort, state)

  const message_style = {
    color: "white",
    fontSize: geo.message_h + "px",
    height: geo.message_h + "px",
  }

  const time_style = {
    color: geo.color,
    fontSize: geo.time_h + "px",
  }

  const date_style = {
    color: geo.color,
    fontSize: geo.date_h + "px",
  }

  return (
    <div id="clock-face" style={viewport_style}>
      <div
        onTouchStart={actions.brightnessStart}
        onTouchMove={actions.brightnessMove}
        onTouchEnd={actions.brightnessEnd}
        onTouchCancel={actions.brightnessEnd}
        onClick={actions.showControlsClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div style={time_style}>{geo.time_s}</div>

        <div style={message_style}>{state.message}</div>

        {state.showDate ? (
          <div style={date_style}>{geo.date_s}</div>
        ) : undefined}
      </div>

      {state.showControls ? (
        state.showColors ? (
          <Colors size={geo.control_h} click={actions.setColorClick} />
        ) : (
          <Controls size={geo.control_h} actions={actions} />
        )
      ) : undefined}
    </div>
  )
}
