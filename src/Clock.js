// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { Controls } from "./Controls";
import { Colors } from "./Colors";
import { formatTime, formatDate, formatColor } from "./utils";
import { scaleColor, fontFit } from "./utils";

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

  // If the browser implements touches, we cancel the resulting clicks.

  brighterTouch = () => {
    this.endTouch();
    this.brighterClick();
    this.brightnessTimeoutID = setTimeout(this.brighterTouch, DIMMER_DWELL);
  };

  dimmerTouch = () => {
    this.endTouch();
    this.dimmerClick();
    this.brightnessTimeoutID = setTimeout(this.dimmerTouch, DIMMER_DWELL);
  };

  endTouch = (e) => {
    if (e) e.preventDefault(); // Cancel the click.
    if (this.brightnessTimeoutID) {
      clearTimeout(this.brightnessTimeoutID);
      this.brightnessTimeoutID = undefined;
    }
  };

  brighterClick = () => {
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

  dimmerClick = () => {
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

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate the time height.
		let time_s = formatTime(clock.date, clock.showSeconds);
		let time_h = fontFit(time_s, width);

    // Calculate the optional date height.
		let date_s = undefined;
		let date_h = 0;
    if (clock.showDate) {
      date_s = formatDate(clock.date);
      date_h = fontFit(date_s, width, 0.6);
    }

    // Calculate the optional controls height.
    let control_h = 0;
    if (clock.showControls) {
      control_h = fontFit("Control Icons", width, 0.8);
    }

    // Leave room for the (usually hidden) message.
    let total_h = time_h + date_h + control_h;
    let message_h = total_h * 0.08;
    total_h += message_h;

    // Scale them all to fit vertically.
    if (total_h > height) {
      const ratio = height / total_h;
      time_h *= ratio;
      date_h *= ratio;
      control_h *= ratio;
      message_h *= ratio;
    }

    const viewport_style = {
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

    const message_style = {
      color: "white",
      fontSize: message_h + "px",
      height: message_h + "px"
    };

		const time_style = {
			color: color,
			fontSize: time_h + "px",
			lineHeight: 0.9
		};

		const date_style = {
			color: color,
			fontSize: date_h + "px",
			lineHeight: 0.9
		};

    return (
      <div style={viewport_style}>
        <div onClick={this.showControlsClick}>
          <div style={message_style}>{clock.userMessage}</div>
					<div style={time_style}>{time_s}</div>
          {clock.showDate ? (
						<div style={date_style}>{date_s}</div>
          ) : (
            undefined
          )}
        </div>

        {clock.showControls ? (
          <div>
            {clock.showColors ? (
              <Colors size={control_h} click={this.setColorClick} />
            ) : (
              <Controls size={control_h} clock={this} />
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
