
export function zeropad(num, len) {
  const str = num.toString();
  return str.padStart(len, "0");
}

// Takes [r, g, b] and returns ""#rrggbb" scaled by optional brightness.
export function formatColor(color_a, brightness = 1.0) {
  let color_s = "#";
  color_a.forEach((n) => {
    color_s += Math.round(n * brightness).toString(16).padStart(2, "0");
  });
  return color_s;
}
