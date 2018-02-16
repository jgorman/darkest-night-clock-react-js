/* React.js utilities. */

const settingsKey = "clockSettings";

// Save state in browser storage.
export const saveState = state => {
  const settings = JSON.stringify(state);
  localStorage.setItem(settingsKey, settings);
};

// Get state from browser storage.
export const getOldState = () => {
  try {
    const settings = localStorage.getItem(settingsKey);
    return JSON.parse(settings);
  } catch (err) {
    return {};  // Discard corrupted old state.
  }
};
