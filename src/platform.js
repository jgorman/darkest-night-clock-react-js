// @flow
/* Platform specific functions. */

import type { ClockState } from "./appstate"

const SETTINGS_KEY = "clockSettings"

export const isNative = false

// Save state in browser storage.
export const saveState = (state: ClockState) => {
  const settings = JSON.stringify(state)
  localStorage.setItem(SETTINGS_KEY, settings)
}

// Get state from browser storage.
export const getOldState = () => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY)
    if (settings) {
      return JSON.parse(settings)
    }
  } catch (err) {}
  return {} // Discard missing or corrupted old state.
}

// Viewport dimensions.
export const getViewPort = () => {
  const clock = document.getElementById("clock-face")
  if (clock) {
    return [clock.clientWidth, clock.clientHeight]
  } else {
    return [window.innerWidth, window.innerHeight]
  }
}
