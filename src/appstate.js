/* Clock App State Management. */

const MIN_BRIGHTNESS = 0.05;
const MAX_BRIGHTNESS = 1.0;
const DIMMER_RATIO = 0.666;
const DEFAULT_COLOR = 0x0000ff;

// App startup state from defaults and local browser storage.
function initialState() {
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

  // Read any saved configuration values.
  const old = getOldState();
  if (old !== null) {
    try {
      const ob = old.brightness;
      if (
        typeof ob === "number" &&
        ob >= MIN_BRIGHTNESS &&
        ob <= MAX_BRIGHTNESS
      ) {
        state.brightness = ob;
      }

      const oc = old.color;
      if (typeof oc === "number" && 1 <= oc && oc <= 0xffffff) {
        state.color = oc;
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
      return {
        ...state,
        color: action.color || DEFAULT_COLOR,
        brightness: 1,
        showColors: false
      };
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
