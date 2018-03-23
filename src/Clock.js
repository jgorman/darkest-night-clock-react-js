// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { ShowTime, ShowDate } from "./ShowTime";
import { Controls } from "./Controls";
import { Colors } from "./Colors";
import { formatColor, scaleColor, fontFit } from "./utils";
import { viewWidth } from "./platform";

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
  clock: ClockState
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

  brightnessTimeoutID = undefined;
  gotTouch = false;

  // Sometimes we get touch events. If so they are before the click.

  brighterTouch = () => {
    this.gotTouch = true;
    this.endTouch();
    this.brighterNow();
    this.brightnessTimeoutID = setTimeout(this.brighterTouch, DIMMER_DWELL);
  };

  dimmerTouch = () => {
    this.gotTouch = true;
    this.endTouch();
    this.dimmerNow();
    this.brightnessTimeoutID = setTimeout(this.dimmerTouch, DIMMER_DWELL);
  };

  endTouch = () => {
    if (this.brightnessTimeoutID) {
      clearTimeout(this.brightnessTimeoutID);
      this.brightnessTimeoutID = undefined;
    }
  };

  // We always get click events. After any touch events.

  brighterClick = () => {
    if (!this.gotTouch) {
      this.brighterNow();
    }
    this.gotTouch = false;
  };

  dimmerClick = () => {
    if (!this.gotTouch) {
      this.dimmerNow();
    }
    this.gotTouch = false;
  };

  brighterNow = () => {
    const old_brightness = this.props.clock.brightness;
    let new_brightness = old_brightness / DIMMER_RATIO;
    if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
    if (new_brightness !== old_brightness) {
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
    let message = `${Math.round(new_brightness * 100)}%`;
    if (new_brightness === old_brightness && this.props.clock.userMessage) {
      message = `${message} Darkest Night Clock ${VERSION}`;
    }
    this.showMessage(message);
  };

  dimmerNow = () => {
    const old_brightness = this.props.clock.brightness;
    let new_brightness = old_brightness * DIMMER_RATIO;
    if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
    if (new_brightness !== old_brightness) {
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
    this.showMessage(`${Math.round(new_brightness * 100)}%`);
  };

  showControlsClick = () => {
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
    const clock = this.props.clock;
    const color = formatColor(scaleColor(clock.color, clock.brightness));
    const width = viewWidth();
    const controlWidth = fontFit("Control Icons", width, 0.8) + "px";

    const viewport = {
      position: "absolute",
      margin: "auto",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    };

    const message = {
      color: "white",
      height: "5px"
    };

    return (
      <div style={viewport}>
        <div onClick={this.showControlsClick}>
          <div style={message}>{clock.userMessage}</div>

          <ShowTime
            date={clock.date}
            showSeconds={clock.showSeconds}
            color={color}
          />

          {clock.showDate ? (
            <ShowDate date={clock.date} color={color} />
          ) : (
            undefined
          )}
        </div>

        {clock.showControls ? (
          <div>
            {clock.showColors ? (
              <Colors size={controlWidth} click={this.setColorClick} />
            ) : (
              <Controls size={controlWidth} clock={this} />
            )}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

function mapStateToProps(state: ClockState) {
  return { clock: state };
}

export default connect(mapStateToProps)(Clock);
