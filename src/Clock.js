import React, { Component } from "react";
import { connect } from "react-redux";

import { ShowTime, ShowDate } from "./ShowTime";
import Colors from "./Colors";
import { formatColor, scaleColor } from "./utils";

import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import seconds from "./seconds.svg";
import showDate from "./show-date.svg";

class Clock extends Component {
  componentDidMount = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  tick = () => {
    this.props.dispatch({ type: "SET_DATE", date: new Date() });
    this.props.dispatch({ type: "REDUX_STORAGE_SAVE" });
  };

  brighterClick = () => {
    this.props.dispatch({ type: "BRIGHTER" });
  };

  dimmerClick = () => {
    this.props.dispatch({ type: "DIMMER" });
  };

  showControlsClick = () => {
    this.props.dispatch({ type: "TOGGLE_CONTROLS" });
  };

  showColorClick = () => {
    this.props.dispatch({ type: "TOGGLE_COLORS" });
  };

  setColorClick = color => {
    this.props.dispatch({ type: "SET_COLOR", color: color });
  };

  showSecondsClick = () => {
    this.props.dispatch({ type: "TOGGLE_SECONDS" });
  };

  showDateClick = () => {
    this.props.dispatch({ type: "TOGGLE_DATE" });
  };

  render() {
    const clock = this.props.clock;
    const color = formatColor(scaleColor(clock.color, clock.brightness));
    return (
      <div className="viewport">
        <div onClick={this.showControlsClick}>
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
          <div className="controls">
            {clock.showColors ? (
              <Colors click={this.setColorClick} />
            ) : (
              undefined
            )}
            <img onClick={this.brighterClick} src={plusCircle} alt="Brighter" />
            <img onClick={this.dimmerClick} src={minusCircle} alt="Dimmer" />
            <img
              onClick={this.showColorClick}
              src={colors}
              alt="Select color"
            />
            <img
              onClick={this.showSecondsClick}
              src={seconds}
              alt="Show seconds"
            />
            <img onClick={this.showDateClick} src={showDate} alt="Show date" />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { clock: state };
}

export default connect(mapStateToProps)(Clock);
