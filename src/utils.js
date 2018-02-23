// @flow
/* Utilities. */

export type ClockState = {
  date: Date,
  brightness: number,
  color: number,
  showSeconds: boolean,
  showDate: boolean,
  showControls: boolean,
  showColors: boolean,
  unsavedState?: boolean
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

export const formatTime = (date: Date, showSeconds: boolean): string => {
  let str = zeropad(date.getHours(), 2);
  str += ":" + zeropad(date.getMinutes(), 2);
  if (showSeconds) {
    str += ":" + zeropad(date.getSeconds(), 2);
  }
  return str;
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const day2 = zeropad(day, 2);
  const month2 = zeropad(month, 2);
  return `${year}-${month2}-${day2}`;
};
