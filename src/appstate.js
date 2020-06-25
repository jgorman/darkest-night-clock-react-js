/* Application state. */

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
export const SETTINGS_KEY = "clockSettings"

// Default startup state.
export const defaultState = () => {
  const state = {
    date: new Date(),
    brightness: MAX_BRIGHTNESS,
    color: DEFAULT_COLOR,
    showSeconds: true,
  }
  return state
}

// Merge saved state, being careful to not crash or insert unacceptable values.
export const mergeOldState = (state, old) => {
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
