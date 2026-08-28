// Minimal sRGB <-> OKLab/OKLCH color math (Björn Ottosson's formulation).

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n))

export function hexToRgb(hex) {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ]
}

export function rgbToHex([r, g, b]) {
  const to = (n) => clamp(Math.round(n * 255), 0, 255).toString(16).padStart(2, "0")
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase()
}

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const toGamma = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)

export function rgbToOklab([r, g, b]) {
  const R = toLinear(r), G = toLinear(g), B = toLinear(b)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function oklabToRgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    toGamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ]
}

export function oklabToOklch([L, a, b]) {
  const C = Math.hypot(a, b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  return [L, C, h]
}

export function oklchToOklab([L, C, h]) {
  const rad = (h * Math.PI) / 180
  return [L, C * Math.cos(rad), C * Math.sin(rad)]
}

export const hexToOklch = (hex) => oklabToOklch(rgbToOklab(hexToRgb(hex)))

const inGamut = ([r, g, b]) => [r, g, b].every((c) => c >= -0.0005 && c <= 1.0005)

/** Reduce chroma by bisection until the colour fits inside sRGB. */
export function oklchToHex([L, C, h]) {
  if (inGamut(oklabToRgb(oklchToOklab([L, C, h])))) {
    return rgbToHex(oklabToRgb(oklchToOklab([L, C, h])).map((c) => clamp(c)))
  }
  let lo = 0, hi = C
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklabToRgb(oklchToOklab([L, mid, h])))) lo = mid
    else hi = mid
  }
  return rgbToHex(oklabToRgb(oklchToOklab([L, lo, h])).map((c) => clamp(c)))
}

/** Relative luminance + WCAG contrast, used to pick readable on-colours. */
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a, b) {
  const la = luminance(a), lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
