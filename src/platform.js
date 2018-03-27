// @flow
/* React.js utilities. */

import type { ClockState } from "./appstate";
import { SETTINGS_KEY } from "./appstate";

// Save state in browser storage.
export const saveState = (state: ClockState) => {
  const settings = JSON.stringify(state);
  localStorage.setItem(SETTINGS_KEY, settings);
};

// Get state from browser storage.
export const getOldState = () => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    if (settings) {
      return JSON.parse(settings);
    }
  } catch (err) {}
  return {}; // Discard missing or corrupted old state.
};

// Viewport dimensions.
export const viewWidth = () => window.innerWidth;
export const viewHeight = () => window.innerHeight;

// Prevent default in JS only.
// $FlowFixMe
export const preventDefault = e => {
  if (e) e.preventDefault();
};
