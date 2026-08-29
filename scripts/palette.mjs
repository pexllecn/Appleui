// Apple's system palette — the anchors every ramp in this design system is built from.
// Values are Apple's published light/dark system colours (HIG · Color).

export const SYSTEM = {
  red:    { light: "#FF3B30", dark: "#FF453A" },
  orange: { light: "#FF9500", dark: "#FF9F0A" },
  yellow: { light: "#FFCC00", dark: "#FFD60A" },
  green:  { light: "#34C759", dark: "#30D158" },
  mint:   { light: "#00C7BE", dark: "#63E6E2" },
  teal:   { light: "#30B0C7", dark: "#40C8E0" },
  cyan:   { light: "#32ADE6", dark: "#64D2FF" },
  blue:   { light: "#007AFF", dark: "#0A84FF" },
  indigo: { light: "#5856D6", dark: "#5E5CE6" },
  purple: { light: "#AF52DE", dark: "#BF5AF2" },
  pink:   { light: "#FF2D55", dark: "#FF375F" },
  brown:  { light: "#A2845E", dark: "#AC8E68" },
  // Not an Apple system colour: the signature lime the templates lead with.
  // Kept in the same OKLCH pipeline so its ramp behaves like the others.
  lime:   { light: "#A3D91E", dark: "#B4E63A" },
}

// Apple's six neutral greys, light and dark, laid out as one continuous ramp.
export const GRAY = {
  50:  "#F9F9FB",
  100: "#F2F2F7", // systemGray6 light
  200: "#E5E5EA", // systemGray5 light
  300: "#D1D1D6", // systemGray4 light
  400: "#C7C7CC", // systemGray3 light
  500: "#AEAEB2", // systemGray2 light
  600: "#8E8E93", // systemGray  (identical in both appearances)
  700: "#636366", // systemGray2 dark
  800: "#48484A", // systemGray3 dark
  850: "#3A3A3C", // systemGray4 dark
  900: "#2C2C2E", // systemGray5 dark
  950: "#1C1C1E", // systemGray6 dark
  1000: "#000000",
}

// Perceptual lightness targets, in OKLCH L. A hue's anchor snaps to the nearest
// step, so #007AFF lands on blue-500 while #FFCC00 lands high on the yellow ramp.
export const L_SCALE = {
  50: 0.972, 100: 0.940, 200: 0.892, 300: 0.836, 400: 0.760,
  500: 0.680, 600: 0.596, 700: 0.512, 800: 0.440, 900: 0.386, 950: 0.290,
}

// Chroma falls away from the anchor so tints stay clean and shades stay rich.
export const C_SCALE = {
  50: 0.16, 100: 0.28, 200: 0.48, 300: 0.68, 400: 0.88,
  500: 1.0, 600: 0.99, 700: 0.92, 800: 0.82, 900: 0.72, 950: 0.52,
}

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
