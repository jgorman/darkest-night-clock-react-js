// @flow
import { Component } from "react";
// $FlowFixMe
import { connect } from "react-redux";

import { formatTime, formatDate, formatColor } from "./utils";
import { scaleColor, fontFit } from "./utils";
import { viewWidth, viewHeight, isNative } from "./platform";
import { ClockRender } from "./ClockRender";
import type { ClockState } from "./appstate";

import {
  MIN_BRIGHTNESS,
  MAX_BRIGHTNESS,
  DIMMER_RATIO,
  DIMMER_DWELL,
  MESSAGE_DWELL,
  VERSION
} from "./appstate";

import {
  TOGGLE_SECONDS,
  TOGGLE_DATE,
  TOGGLE_CONTROLS,
  TOGGLE_COLORS,
  SET_DATE,
  SET_BRIGHTNESS,
  SET_COLOR,
  SHOW_MESSAGE
} from "./appstate";

type ClockType = {
  dispatch: Function,
  state: ClockState
};

class Clock extends Component<ClockType> {
  timerID: IntervalID;

  componentDidMount = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  tick = () => {
    this.props.dispatch({ type: SET_DATE, date: new Date() });
  };

  userMessageTimeoutID = undefined;

  showMessage = message => {
    const dispatch = this.props.dispatch;

    // Clear any pending timeout.
    if (this.userMessageTimeoutID) {
      clearTimeout(this.userMessageTimeoutID);
      this.userMessageTimeoutID = undefined;
    }

    // Set a new timeout.
    this.userMessageTimeoutID = setTimeout(
      () => dispatch({ type: SHOW_MESSAGE, userMessage: undefined }),
      MESSAGE_DWELL
    );

    // Activate the message.
    dispatch({
      type: SHOW_MESSAGE,
      userMessage: message
    });
  };

  /*
   * These functions handle brightness swiping on the time & date display.
   */

  touchInterface = false; // If we are getting touch events we disable clicks.
  touchId = undefined; // Are we still in an ongoing touch stream?
  touchFirstX = 0; // First x in this touch stream.
  touchLatestX = 0; // Latest or last x in this touch stream.

  brightnessStart = e => {
    if (e.nativeEvent) e = e.nativeEvent;
    const touch = e.changedTouches[0];
    if (touch) {
      this.touchId = touch.identifier;
      this.touchFirstX = touch.pageX;
      this.touchLatestX = touch.pageX;
    }
  };

  brightnessMove = e => {
    if (e.nativeEvent) e = e.nativeEvent;
    const touch = e.changedTouches[0];
    if (touch) {
      this.brightnessDiff(touch.identifier, touch.pageX);
    }
  };

  brightnessEnd = e => {
    e.preventDefault(); // Prevent text highlighting in phone browsers.
    if (e.nativeEvent) e = e.nativeEvent;
    const touch = e.changedTouches[0];
    if (touch) {
      this.brightnessDiff(touch.identifier, touch.pageX);
    }
    if (Math.abs(this.touchFirstX - this.touchLatestX) < 2.0) {
      // If there was very little movement, treat it like a click.
      if (!this.touchInterface) {
        this.showMessage("Swipe left to dim.");
      }
      this.showControlsClick();
    }
    this.touchInterface = true;
    this.touchId = undefined;
  };

  brightnessDiff = (id, x) => {
    if (id === this.touchId && this.touchLatestX !== x) {
      const width = viewWidth();
      const diff = x - this.touchLatestX;
      const old_brightness = this.props.state.brightness;
      let new_brightness = old_brightness + 2 * diff / width;
      if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
      if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
      if (new_brightness !== old_brightness) {
        this.props.dispatch({
          type: SET_BRIGHTNESS,
          brightness: new_brightness
        });
      }
      this.touchLatestX = x;
      this.showMessage(`${Math.round(new_brightness * 100)}%`);
    }
  };

  /*
   * These functions handle presses and clicks on the brighter / dimmer buttons.
   * Phone browsers call onTouchStart/onTouchEnd so we can run continuous
   * brightening or dimming while pressing and ignore the click events.
   * Desktop browsers run on clicks alone.
   */
  pressingTimeoutID = undefined;

  // Keep calling ourselves until endPress cancels the timer.
  brighterPress = e => {
    this.touchInterface = true;
    this.endTimer();
    this.pressingTimeoutID = setTimeout(this.brighterPress, DIMMER_DWELL);
    this.brighterTick();
  };

  // Keep calling ourselves until endPress cancels the timer.
  dimmerPress = e => {
    this.touchInterface = true;
    this.endTimer();
    this.pressingTimeoutID = setTimeout(this.dimmerPress, DIMMER_DWELL);
    this.dimmerTick();
  };

  // Cancel the timer.
  endPress = e => {
    this.endTimer();
  };

  // Cancel the timer.
  endTimer = () => {
    if (this.pressingTimeoutID) {
      clearTimeout(this.pressingTimeoutID);
      this.pressingTimeoutID = undefined;
    }
  };

  // If we have a touch interface we use that and ignore the click.
  brighterClick = e => {
    if (this.touchInterface) return;
    this.brighterTick();
  };

  // If we have a touch interface we use that and ignore the click.
  dimmerClick = e => {
    if (this.touchInterface) return;
    this.dimmerTick();
  };

  // One tick brighter.
  brighterTick = () => {
    const old_brightness = this.props.state.brightness;
    let new_brightness = old_brightness / DIMMER_RATIO;
    if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
    let message = `${Math.round(new_brightness * 100)}%`;
    if (new_brightness === old_brightness) {
      this.endTimer(); // Catch runaway brighterPress on ios.chrome.
      if (this.props.state.userMessage) {
        message += ` Darkest Night Clock ${isNative ? "App" : ""} ${VERSION}`;
      }
    } else {
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
    this.showMessage(message);
  };

  // One tick dimmer.
  dimmerTick = () => {
    const old_brightness = this.props.state.brightness;
    let new_brightness = old_brightness * DIMMER_RATIO;
    if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
    if (new_brightness === old_brightness) {
      this.endTimer(); // Catch runaway dimmerPress on ios.chrome.
    } else {
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
    this.showMessage(`${Math.round(new_brightness * 100)}%`);
  };

  showControlsClick = e => {
    if (e && this.touchInterface) return;
    this.props.dispatch({ type: TOGGLE_CONTROLS });
  };

  showColorClick = () => {
    this.props.dispatch({ type: TOGGLE_COLORS });
  };

  setColorClick = color => {
    this.props.dispatch({ type: SET_COLOR, color: color });
  };

  showSecondsClick = () => {
    this.props.dispatch({ type: TOGGLE_SECONDS });
  };

  showDateClick = () => {
    this.props.dispatch({ type: TOGGLE_DATE });
  };

  render() {
    const state = this.props.state;
    const calc = {};
    calc.color = formatColor(scaleColor(state.color, state.brightness));

    const width = viewWidth();
    const height = viewHeight();

    // Calculate the time height.
    calc.time_s = formatTime(state.date, state.showSeconds);
    calc.time_h = fontFit(calc.time_s, width);

    // Calculate the optional date height.
    calc.date_s = undefined;
    calc.date_h = 0;
    if (state.showDate) {
      calc.date_s = formatDate(state.date);
      calc.date_h = fontFit(calc.date_s, width, 0.6);
    }

    // Calculate the optional controls height.
    calc.control_h = 0;
    if (state.showControls) {
      calc.control_h = fontFit("Control Icons", width, 0.8);
    }

    // Calculate the message height.
    calc.message_h = (calc.time_h + calc.date_h + calc.control_h) * 0.08;

    // Scale for vertical fit if necessary, leaving room for padding.
    let total_h = calc.time_h + calc.date_h + calc.control_h + calc.message_h;
    let target_h = height * 0.9;
    if (total_h > target_h) {
      const ratio = target_h / total_h;
      calc.time_h *= ratio;
      calc.date_h *= ratio;
      calc.control_h *= ratio;
      calc.message_h *= ratio;
    }

    return ClockRender(this, state, calc);
  }
}

function mapStateToProps(state: ClockState) {
  return { state: state };
}

export default connect(mapStateToProps)(Clock);
