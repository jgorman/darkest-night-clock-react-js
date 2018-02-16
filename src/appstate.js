/* Clock App State Management. */

import { saveState } from "./platform";

const MIN_BRIGHTNESS = 0.05;
const MAX_BRIGHTNESS = 1.0;
const DIMMER_RATIO = 0.666;
const DEFAULT_COLOR = 0x0000ff;

// App startup state from defaults and local browser storage.
const initialState = () => {
  // App defaults.
  const state = {
    date: new Date(),
    brightness: 1.0,
    color: DEFAULT_COLOR,
    showSeconds: false,
    showDate: false,
    showControls: true,
    showColors: false
  };

  return state;
};

const mergeOldState = (state, old) => {
  const news = { ...state };

  try {
    const ob = old.brightness;
    if (
      typeof ob === "number" &&
      ob >= MIN_BRIGHTNESS &&
      ob <= MAX_BRIGHTNESS
    ) {
      news.brightness = ob;
    }

    const oc = old.color;
    if (typeof oc === "number" && 1 <= oc && oc <= 0xffffff) {
      news.color = oc;
    }

    if (old.showControls === true || old.showControls === false) {
      news.showControls = old.showControls;
    }
    if (old.showSeconds === true || old.showSeconds === false) {
      news.showSeconds = old.showSeconds;
    }
    if (old.showDate === true || old.showDate === false) {
      news.showDate = old.showDate;
    }
  } catch (err) {
    return state; // Discard corrupted old state.
  }

  return news;
};

export const reducer = (state = initialState(), action) => {
  let new_brightness;
  switch (action.type) {
    case "TOGGLE_CONTROLS":
      return { ...state, showControls: !state.showControls, dirty: true };
    case "TOGGLE_COLORS":
      return { ...state, showColors: !state.showColors };
    case "TOGGLE_SECONDS":
      return { ...state, showSeconds: !state.showSeconds, dirty: true };
    case "TOGGLE_DATE":
      return { ...state, showDate: !state.showDate, dirty: true };
    case "DIMMER":
      new_brightness = state.brightness * DIMMER_RATIO;
      if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
      return { ...state, brightness: new_brightness, dirty: true };
    case "BRIGHTER":
      new_brightness = state.brightness / DIMMER_RATIO;
      if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
      return { ...state, brightness: new_brightness, dirty: true };
    case "SET_COLOR":
      return {
        ...state,
        color: action.color || DEFAULT_COLOR,
        brightness: 1,
        showColors: false,
        dirty: true
      };
    case "SET_DATE":
      return { ...state, date: action.date };
    case "REDUX_STORAGE_LOAD":
      return mergeOldState(state, action.oldState);
    case "REDUX_STORAGE_SAVE":
      saveState(mergeOldState({}, state));
      return { ...state, dirty: false };

    default:
      return state;
  }
};
