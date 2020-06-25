// @flow
/* Utilities. */

// Calculate the clock geometry.
export const geometry = ([width, height], state) => {
  const geo = {}

  geo.color = formatColor(scaleColor(state.color, state.brightness))

  // Calculate the time height.
  geo.time_s = formatTime(state.date, state.showSeconds)
  geo.time_h = fontFit(geo.time_s, width)

  // Calculate the optional date height.
  geo.date_s = undefined
  geo.date_h = 0
  if (state.showDate) {
    geo.date_s = formatDate(state.date)
    geo.date_h = fontFit(geo.date_s, width, 0.6)
  }

  // Calculate the optional controls height.
  geo.control_h = 0
  if (state.showControls) {
    geo.control_h = fontFit("Control Icons", width, 0.8)
  }

  // Calculate the message height.
  geo.message_h = geo.time_h * 0.12

  // Scale for vertical fit if necessary, leaving room for padding.
  let total_h = geo.time_h + geo.date_h + geo.control_h + geo.message_h
  let target_h = height * 0.9
  if (total_h > target_h) {
    const ratio = target_h / total_h
    geo.time_h *= ratio
    geo.date_h *= ratio
    geo.control_h *= ratio
    geo.message_h *= ratio
  }

  return geo
}

export const formatColor = (color: number): string => {
  return "#" + zeropad(color.toString(16), 6)
}

const zeropad = (num: number | string, len: number): string => {
  const str = num.toString()
  if (str.length >= len) return str
  return "0".repeat(len - str.length) + str
}

const scaleColor = (color: number, brightness: number): number => {
  const color_a = []
  for (let i = 0; i < 3; i++) {
    color_a.unshift(Math.round((color & 0xff) * brightness))
    color >>= 8
  }
  return color_a.reduce((acc, c) => (acc << 8) + c)
}

const formatTime = (date: Date, showSeconds: boolean): string => {
  let str = zeropad(date.getHours(), 2)
  str += ":" + zeropad(date.getMinutes(), 2)
  if (showSeconds) {
    str += ":" + zeropad(date.getSeconds(), 2)
  }
  return str
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const day2 = zeropad(day, 2)
  const month2 = zeropad(month, 2)
  return `${year}-${month2}-${day2}`
}

const fontFit = (str: string, width: number, fill: number = 1.0): number => {
  const fontScale = 1.8 // 1.9 is too big for iPhone 5s.
  const px = Math.round((width / str.length) * fontScale * fill)
  return px
}
