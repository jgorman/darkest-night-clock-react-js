import React from "react"

import { formatColor } from "./utils"
import {
  COLOR_RED,
  COLOR_GREEN,
  COLOR_BLUE,
  COLOR_YELLOW,
  COLOR_WHITE,
} from "./appstate"

const Color = (props) => {
  const color = formatColor(props.color)
  const size = props.size

  // Control icons are 24x24 with 1px transparent margin, circle diameter is 22.
  const dotSize = (size * 22) / 24
  const extraMargin = (size - dotSize) / 2

  const paintChip = {
    display: "inline-block",
    height: dotSize + "px",
    width: dotSize + "px",
    borderRadius: dotSize + "px",
    margin: 5 + extraMargin + "px",
    background: color,
  }

  return <div style={paintChip} onClick={() => props.click(props.color)} />
}

export const Colors = (props) => {
  const size = props.size
  const click = props.click
  return (
    <div>
      <Color size={size} click={click} color={COLOR_RED} />
      <Color size={size} click={click} color={COLOR_GREEN} />
      <Color size={size} click={click} color={COLOR_BLUE} />
      <Color size={size} click={click} color={COLOR_YELLOW} />
      <Color size={size} click={click} color={COLOR_WHITE} />
    </div>
  )
}
