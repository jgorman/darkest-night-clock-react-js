// @flow
/* Clock App State Management. */

import { saveState } from "./platform";
import build_stamp from "./build.js";

export const MIN_BRIGHTNESS = 0.05;
export const MAX_BRIGHTNESS = 1.0;
export const DEFAULT_COLOR = 0x0000ff;
export const DIMMER_RATIO = 0.666;
export const MESSAGE_DWELL = 1000;
export const SETTINGS_KEY = "clockSettings";
export const BUILD_ID = build_stamp;

export const TOGGLE_SECONDS = "TOGGLE_SECONDS";
export const TOGGLE_DATE = "TOGGLE_DATE";
export const TOGGLE_CONTROLS = "TOGGLE_CONTROLS";
export const TOGGLE_COLORS = "TOGGLE_COLORS";
export const SET_DATE = "SET_DATE";
export const SET_BRIGHTNESS = "SET_BRIGHTNESS";
export const SET_COLOR = "SET_COLOR";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";
export const REDUX_STORAGE_LOAD = "REDUX_STORAGE_LOAD";
export const REDUX_STORAGE_SAVE = "REDUX_STORAGE_SAVE";

export type ClockState = {
  date: Date,
  brightness: number,
  color: number,
  showSeconds: boolean,
  showDate: boolean,
  showControls: boolean,
  showColors?: boolean,
  unsavedState?: boolean,
  userMessage?: string,
  userMessageTimeoutID?: TimeoutID
};

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
  brightness: number,
  color: number,
  oldState: ClockState,
  userMessage: string,
  userMessageTimeoutID: TimeoutID
};

export const reducer = (
  state: ClockState = initialState(),
  action: ActionType
) => {
  switch (action.type) {
    case TOGGLE_SECONDS:
      return { ...state, showSeconds: !state.showSeconds, unsavedState: true };
    case TOGGLE_DATE:
      return { ...state, showDate: !state.showDate, unsavedState: true };

    case TOGGLE_CONTROLS:
      return {
        ...state,
        showControls: !state.showControls,
        showColors: false,
        unsavedState: true
      };
    case TOGGLE_COLORS:
      return { ...state, showColors: !state.showColors };

    case SET_DATE:
      return { ...state, date: action.date };
    case SET_BRIGHTNESS:
      return {
        ...state,
        brightness: action.brightness,
        unsavedState: true
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.color || DEFAULT_COLOR,
        brightness: MAX_BRIGHTNESS,
        showColors: false,
        unsavedState: true
      };

    case SHOW_MESSAGE:
      return {
        ...state,
        userMessage: action.userMessage,
        userMessageTimeoutID: action.userMessageTimeoutID
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        userMessageTimeoutID: undefined
      };

    case REDUX_STORAGE_LOAD:
      return mergeOldState(state, action.oldState);
    case REDUX_STORAGE_SAVE:
      saveState(mergeOldState({}, state));
      return { ...state, unsavedState: false };

    default:
      return state;
  }
};
