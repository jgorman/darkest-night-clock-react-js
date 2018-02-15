/* React.js utilities. */

// Save state in browser storage.
export const saveState = state => {
  const settings = JSON.stringify(state);
  localStorage.setItem("clock-settings", settings);
};

// Get state from browser storage.
export const getOldState = () => {
  try {
    const settings = localStorage.getItem("clock-settings");
    return JSON.parse(settings);
  } catch (err) {
    return null;  // Discard corrupted old state.
  }
};

