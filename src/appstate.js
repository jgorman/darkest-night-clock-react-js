// @flow
/* Clock App State Management. */

import { getOldState, saveState } from "./platform"

export const COLOR_RED = 0xff0000
export const COLOR_GREEN = 0x00bb00
export const COLOR_BLUE = 0x6666ff
export const COLOR_YELLOW = 0xffd700
export const COLOR_WHITE = 0xffffff

export const VERSION = "1.0.7"
export const MIN_BRIGHTNESS = 0.02
export const MAX_BRIGHTNESS = 1.0
export const DEFAULT_COLOR = COLOR_BLUE
export const DIMMER_RATIO = 0.8
export const DIMMER_DWELL = 150
export const MESSAGE_DWELL = 3000
export const MIN_SLIDING = 2.0

export type ClockState = {
  date: Date,
  brightness: number,
  color: number,
  showSeconds?: boolean,
  showDate?: boolean,
  showControls?: boolean,
  showColors?: boolean,
  message?: string,
}

// Default startup state.
const defaultState = (): ClockState => {
  const state = {
    date: new Date(),
    brightness: MAX_BRIGHTNESS,
    color: DEFAULT_COLOR,
  }
  return state
}

// Read saved state.
export const initialState = () => {
  return mergeOldState(defaultState(), getOldState())
}

export const keepState = (state) => {
  saveState(mergeOldState({}, state))
}

// Merge saved state, being careful to not crash or insert unacceptable values.
const mergeOldState = (
  state: ClockState | Object,
  old: ClockState
): ClockState => {
  const news = { ...state }

  try {
    const ob = old.brightness
    if (
      typeof ob === "number" &&
      ob >= MIN_BRIGHTNESS &&
      ob <= MAX_BRIGHTNESS
    ) {
      news.brightness = ob
    }

    const oc = old.color
    if (typeof oc === "number" && 1 <= oc && oc <= 0xffffff) {
      news.color = oc
    }

    if (old.showSeconds) {
      news.showSeconds = true
    }

    if (old.showDate) {
      news.showDate = true
    }
  } catch (err) {
    return state // Discard corrupted old state.
  }

  return news
}

type ActionType = {
  type: string,
  date: Date,
  brightness: number,
  color: number,
  message: string,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "clock_tick":
      return { ...state, date: new Date() }

    case "toggle_seconds":
      state = { ...state, showSeconds: !state.showSeconds }
      keepState(state)
      return state

    case "toggle_date":
      state = { ...state, showDate: !state.showDate }
      keepState(state)
      return state

    case "toggle_controls":
      return { ...state, showControls: !state.showControls, showColors: false }

    case "toggle_colors":
      return { ...state, showColors: !state.showColors }

    case "set_brightness":
      state = { ...state, brightness: action.brightness }
      keepState(state)
      return state

    case "set_color":
      state = {
        ...state,
        color: action.color || DEFAULT_COLOR,
        brightness: MAX_BRIGHTNESS,
        showColors: false,
      }
      keepState(state)
      return state

    case "show_message":
      return { ...state, message: action.message }

    default:
      return state
  }
}
