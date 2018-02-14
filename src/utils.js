/* Utilities. */

export const zeropad = (num, len) => {
  const str = num.toString();
  if (str.length >= len) return str;
  return "0".repeat(len - str.length) + str;
};

export const formatColor = color => "#" + zeropad(color.toString(16), 6);

export const scaleColor = (color, brightness) => {
  const color_a = [];
  for (let i = 0; i < 3; i++) {
    color_a.unshift(Math.round((color & 0xff) * brightness));
    color >>= 8;
  }
  return color_a.reduce((acc, c) => (acc << 8) + c);
};
