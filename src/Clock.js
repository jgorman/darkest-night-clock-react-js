// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { ShowTime, ShowDate } from "./ShowTime";
import { Colors } from "./Colors";
import { formatColor, scaleColor } from "./utils";
import type { ClockState } from "./appstate";
import {
  MIN_BRIGHTNESS,
  MAX_BRIGHTNESS,
  DIMMER_RATIO,
  MESSAGE_DWELL
} from "./appstate";

import {
  TOGGLE_SECONDS,
  TOGGLE_DATE,
  TOGGLE_CONTROLS,
  TOGGLE_COLORS,
  SET_DATE,
  SET_BRIGHTNESS,
  SET_COLOR,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from "./appstate";

import plusCircle from "./images/plus-circle.svg";
import minusCircle from "./images/minus-circle.svg";
import colors from "./images/colors.svg";
import seconds from "./images/seconds.svg";
import showDate from "./images/show-date.svg";

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

  showMessage = message => {
    const clock = this.props.clock;
    const dispatch = this.props.dispatch;

    // Clear any pending timeout.
    if (clock.userMessageTimeoutID) {
      clearTimeout(clock.userMessageTimeoutID);
    }

    // Set a new timeout.
    const timeoutID = setTimeout(
      () => dispatch({ type: HIDE_MESSAGE }),
      MESSAGE_DWELL
    );

    // Activate the message.
    dispatch({
      type: SHOW_MESSAGE,
      userMessage: message,
      userMessageTimeoutID: timeoutID
    });
  };

  brighterClick = () => {
    const clock = this.props.clock;
    if (clock.brightness === MAX_BRIGHTNESS) {
      this.showMessage(`Maximum ${clock.brightness * 100}% brightness.`);
    } else {
      let new_brightness = clock.brightness / DIMMER_RATIO;
      if (new_brightness > MAX_BRIGHTNESS) new_brightness = MAX_BRIGHTNESS;
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
  };

  dimmerClick = () => {
    const clock = this.props.clock;
    if (clock.brightness === MIN_BRIGHTNESS) {
      this.showMessage(`Minimum ${clock.brightness * 100}% brightness.`);
    } else {
      let new_brightness = clock.brightness * DIMMER_RATIO;
      if (new_brightness < MIN_BRIGHTNESS) new_brightness = MIN_BRIGHTNESS;
      this.props.dispatch({ type: SET_BRIGHTNESS, brightness: new_brightness });
    }
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
    const control = {
      height: "60px",
      width: "60px",
      margin: "5px"
    };
    return (
      <div style={viewport}>
        <div onClick={this.showControlsClick}>
          {clock.userMessage && clock.userMessageTimeoutID ? (
            <div style={{ color: "white" }}>{clock.userMessage}</div>
          ) : (
            undefined
          )}

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
              <Colors click={this.setColorClick} />
            ) : (
              undefined
            )}

            <img
              onClick={this.brighterClick}
              src={plusCircle}
              style={control}
              alt="Brighter"
            />

            <img
              onClick={this.dimmerClick}
              src={minusCircle}
              style={control}
              alt="Dimmer"
            />

            <img
              onClick={this.showColorClick}
              src={colors}
              style={control}
              alt="Select color"
            />

            <img
              onClick={this.showSecondsClick}
              src={seconds}
              style={control}
              alt="Show seconds"
            />
            
            <img
              onClick={this.showDateClick}
              src={showDate}
              style={control}
              alt="Show date"
            />
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
