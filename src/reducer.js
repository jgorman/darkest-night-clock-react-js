/* State reducer. */

import { keepState } from "./platform"
import { MAX_BRIGHTNESS, DEFAULT_COLOR } from "./appstate"

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

    case "set_state":
      return action.state

    case "redisplay":
      return { ...state }

    default:
      console.log(`?????? unknown reducer action.type: "${action.type}"`)
      return state
  }
}
