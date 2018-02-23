// @flow
/* Clock App State Management. */

import { saveState } from "./platform";
import type { ClockState } from "./utils";

const MIN_BRIGHTNESS = 0.05;
const MAX_BRIGHTNESS = 1.0;
const DIMMER_RATIO = 0.666;
const DEFAULT_COLOR = 0x0000ff;

// App startup state.
const initialState = (): ClockState => {
  const state = {
    date: new Date(),
    brightness: MAX_BRIGHTNESS,
    color: DEFAULT_COLOR,
    showSeconds: false,
    showDate: false,
    showControls: true
  };
  return state;
};

// Merge saved state, being careful to not crash or insert unacceptable values.
const mergeOldState = (
  state: ClockState | Object,
  old: ClockState
): ClockState => {
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

type ActionType = {
  type: string,
  date: Date,
  oldState: ClockState
};

export const reducer = (
  state: ClockState = initialState(),
  action: ActionType
) => {
  switch (action.type) {
    case "TOGGLE_CONTROLS":
      return {
        ...state,
        showControls: !state.showControls,
        showColors: false,
        unsavedState: true
      };
    case "TOGGLE_COLORS":
      return { ...state, showColors: !state.showColors };
    case "TOGGLE_SECONDS":
      return { ...state, showSeconds: !state.showSeconds, unsavedState: true };
    case "TOGGLE_DATE":
      return { ...state, showDate: !state.showDate, unsavedState: true };
    case "DIMMER":
      {
        let new_brightness = state.brightness * DIMMER_RATIO;
        if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
        return { ...state, brightness: new_brightness, unsavedState: true };
      }
    case "BRIGHTER":
      {
        let new_brightness = state.brightness / DIMMER_RATIO;
        if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
        return { ...state, brightness: new_brightness, unsavedState: true };
      }
    case "SET_COLOR":
      return {
        ...state,
        color: action.color || DEFAULT_COLOR,
        brightness: MAX_BRIGHTNESS,
        showColors: false,
        unsavedState: true
      };
    case "SET_DATE":
      return { ...state, date: action.date };
    case "REDUX_STORAGE_LOAD":
      return mergeOldState(state, action.oldState);
    case "REDUX_STORAGE_SAVE":
      saveState(mergeOldState({}, state));
      return { ...state, unsavedState: false };

    default:
      return state;
  }
};
