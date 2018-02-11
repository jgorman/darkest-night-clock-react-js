/* Clock App State Management. */

const MIN_BRIGHTNESS = 0.05;
const MAX_BRIGHTNESS = 1.0;
const DIMMER_RATIO = 0.666;

// App startup state from defaults and local browser storage.
function initialState() {
  // App defaults.
  const state = {
    date: new Date(),
    brightness: 1.0,
    color: [0, 0, 255],
    showSeconds: false,
    showDate: false,
    showControls: true,
    showColors: false
  };

  // Read any saved configuration values.
  const old = getOldState();
  console.log('Old state:', old);
  if (old !== null) {
    try {
      if (
        typeof old.brightness === "number" &&
        old.brightness >= MIN_BRIGHTNESS &&
        old.brightness <= MAX_BRIGHTNESS
      ) {
        state.brightness = old.brightness;
      }

      // Check old color values!
      let okay = true;
      let lumins = 0;
      for (let i = 0; i < 3; i++) {
        let oc = old.color[i];
        if (typeof oc === "number" && 0 <= oc && oc <= 255) {
          lumins += oc;
        } else {
          okay = false;
        }
      }
      if (okay && lumins > 100 && old.color.length === 3) {
        state.color = old.color;
      }

      if (old.showControls === true || old.showControls === false) {
        state.showControls = old.showControls;
      }
      if (old.showSeconds === true || old.showSeconds === false) {
        state.showSeconds = old.showSeconds;
      }
      if (old.showDate === true || old.showDate === false) {
        state.showDate = old.showDate;
      }
    } catch (err) {
      console.error("Bad saved state:", err.message);
    }
  }

  return state;
}

export function reducer(state = initialState(), action) {
  let new_brightness;
  switch (action.type) {
    case "TOGGLE_CONTROLS":
      return { ...state, showControls: !state.showControls };
    case "TOGGLE_COLORS":
      return { ...state, showColors: !state.showColors };
    case "TOGGLE_SECONDS":
      return { ...state, showSeconds: !state.showSeconds };
    case "TOGGLE_DATE":
      return { ...state, showDate: !state.showDate };
    case "DIMMER":
      new_brightness = state.brightness * DIMMER_RATIO;
      if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
      return { ...state, brightness: new_brightness };
    case "BRIGHTER":
      new_brightness = state.brightness / DIMMER_RATIO;
      if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
      return { ...state, brightness: new_brightness };
    case "SET_COLOR":
      return { ...state, color: action.color, showColors: false };
    case "SET_DATE":
      return { ...state, date: action.date };

    default:
      return state;
  }
}

// Save state in browser storage.
export function saveState(state) {
  const settings = JSON.stringify(state);
  localStorage.setItem("clock-settings", settings);
}

// Get state from browser storage.
function getOldState() {
  try {
    const settings = localStorage.getItem("clock-settings");
    return JSON.parse(settings);
  } catch (err) {
    console.error("getOldState:", err.message);
    return null;
  }
}
