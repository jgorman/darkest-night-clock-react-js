
export function zeropad(num, len) {
  const str = num.toString();
  return str.padStart(len, "0");
}

// Takes [r, g, b] and returns #rrggbb scaled by brightness.
export function formatColor(color, brightness = 1.0) {
  let col = "#";
  color.forEach((n) => {
    col = col + Math.round(n * brightness).toString(16).padStart(2, "0");
  });
  return col;
}
