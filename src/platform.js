// @flow
/* React.js utilities. */
import type { ClockState } from "./appstate";

const settingsKey = "clockSettings";

// Save state in browser storage.
export const saveState = (state: ClockState) => {
  const settings = JSON.stringify(state);
  localStorage.setItem(settingsKey, settings);
};

// Get state from browser storage.
export const getOldState = () => {
  try {
    const settings = localStorage.getItem(settingsKey);
    if (settings) {
      return JSON.parse(settings);
    }
  } catch (err) {}
  return {}; // Discard missing or corrupted old state.
};
