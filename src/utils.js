// @flow
/* Utilities. */

export type ClockState = {
  date: Date,
  brightness: number,
  color: number,
  showSeconds: boolean,
  showDate: boolean,
  showControls: boolean,
  showColors: boolean
};

export const zeropad = (num: number | string, len: number): string => {
  const str = num.toString();
  if (str.length >= len) return str;
  return "0".repeat(len - str.length) + str;
};

export const formatColor = (color: number): string => {
  return "#" + zeropad(color.toString(16), 6);
};

export const scaleColor = (color: number, brightness: number): number => {
  const color_a = [];
  for (let i = 0; i < 3; i++) {
    color_a.unshift(Math.round((color & 0xff) * brightness));
    color >>= 8;
  }
  return color_a.reduce((acc, c) => (acc << 8) + c);
};
