/* Utilities. */

export const formatColor = color => "#" + color.toString(16).padStart(6, "0");

export const scaleColor = (color, brightness) => {
  const color_a = [];
  for (let i = 0; i < 3; i++) {
    color_a.unshift(Math.round((color & 0xff) * brightness));
    color >>= 8;
  }
  return color_a.reduce((acc, c) => (acc << 8) + c);
};
