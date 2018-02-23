import React from "react";
import PropTypes from "prop-types";

const infoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "9999",
  background: "#fff"
};

type InfoType = {
  userMessage: string,
  userMessageTimeoutID?: TimeoutID
};

export const InfoMessage = (props: InfoType) => {
  if (!props.userMessage || !props.userMessageTimeoutID) {
    return null;
  }
  return <div style={infoStyle}>{props.userMessage}</div>;
};

InfoMessage.propTypes = {
  userMessage: PropTypes.string,
  userMessageTimeoutID: PropTypes.number
};
