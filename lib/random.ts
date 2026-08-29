/** Deterministic pseudo-random numbers (mulberry32). Sample data has to be
 * identical on the server and the client or React will complain about a
 * hydration mismatch, so nothing here may use Math.random. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seededInts(seed: number, count: number, min: number, max: number) {
  const rand = seeded(seed)
  return Array.from({ length: count }, () => min + Math.floor(rand() * (max - min + 1)))
}
