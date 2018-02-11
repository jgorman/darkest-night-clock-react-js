import React, { Component } from "react";
import { connect } from "react-redux";

import ShowTime from "./ShowTime";
import ShowDate from "./ShowDate";
import Colors from "./Colors";
import { formatColor } from "./utils";
import { saveState } from "./appstate";

import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import seconds from "./seconds.svg";
import showDate from "./show-date.svg";

class Clock extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.props.dispatch({ type: "SET_DATE", date: new Date() });
    saveState(this.props.clock);
  }

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

  setColorClick = newColor => {
    this.props.dispatch({ type: "SET_COLOR", color: newColor });
  };

  showSecondsClick = () => {
    this.props.dispatch({ type: "TOGGLE_SECONDS" });
  };

  showDateClick = () => {
    this.props.dispatch({ type: "TOGGLE_DATE" });
  };

  render() {
    const clock = this.props.clock;
    const color = formatColor(clock.color, clock.brightness);
    return (
      <div>
        <div onClick={this.showControlsClick}>
          <ShowTime
            date={clock.date}
            showSeconds={clock.showSeconds}
            color={color}
          />

          {clock.showDate ? <ShowDate date={clock.date} color={color} /> : ""}
        </div>

        {clock.showControls ? (
          <div className="controls">
            {clock.showColors ? (
              <Colors click={this.setColorClick} show={clock.showColors} />
            ) : (
              ""
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
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { clock: state };
}

export default connect(mapStateToProps)(Clock);
