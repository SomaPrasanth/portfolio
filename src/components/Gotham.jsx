import { useEffect, useMemo, useRef } from 'react'
import { BAT_PATH } from './Icons'

// Deterministic RNG so the skyline is the same on every visit.
function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildings(seed, { minH, maxH, minW, maxW, windows, spires }) {
  const r = rng(seed)
  const out = []
  let x = -20
  while (x < 1460) {
    const w = minW + r() * (maxW - minW)
    const h = minH + r() * (maxH - minH)
    const b = { x, w, h, lights: [], top: null }
    if (spires && r() < 0.18) b.top = { kind: 'spire', h: 30 + r() * 60 }
    else if (r() < 0.22) b.top = { kind: 'antenna', h: 14 + r() * 36 }
    else if (r() < 0.2) b.top = { kind: 'step', h: 10 + r() * 18 }
    if (windows) {
      for (let wy = 320 - h + 14; wy < 312; wy += 13) {
        for (let wx = x + 7; wx < x + w - 8; wx += 11) {
          if (r() < windows) b.lights.push({ x: wx, y: wy, o: 0.35 + r() * 0.6 })
        }
      }
    }
    out.push(b)
    x += w + (r() < 0.3 ? 4 + r() * 10 : 0)
  }
  return out
}

function Layer({ data, fill, lights }) {
  return (
    <g>
      {data.map((b, i) => {
        const y = 320 - b.h
        return (
          <g key={i}>
            <rect x={b.x} y={y} width={b.w} height={b.h + 2} fill={fill} />
            {b.top?.kind === 'spire' && (
              <polygon
                points={`${b.x + b.w * 0.2},${y} ${b.x + b.w / 2},${y - b.top.h} ${b.x + b.w * 0.8},${y}`}
                fill={fill}
              />
            )}
            {b.top?.kind === 'antenna' && (
              <rect x={b.x + b.w / 2 - 1} y={y - b.top.h} width="2" height={b.top.h} fill={fill} />
            )}
            {b.top?.kind === 'step' && (
              <rect x={b.x + b.w * 0.2} y={y - b.top.h} width={b.w * 0.6} height={b.top.h} fill={fill} />
            )}
            {lights &&
              b.lights.map((l, j) => (
                <rect key={j} x={l.x} y={l.y} width="3.5" height="5.5" fill="var(--gold)" opacity={l.o} />
              ))}
          </g>
        )
      })}
    </g>
  )
}

export function Skyline({ className = '' }) {
  const far = useMemo(
    () => buildings(7, { minH: 110, maxH: 230, minW: 34, maxW: 90, windows: 0, spires: true }),
    [],
  )
  const near = useMemo(
    () => buildings(42, { minH: 50, maxH: 190, minW: 44, maxW: 130, windows: 0.07, spires: true }),
    [],
  )
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <Layer data={far} fill="var(--city-far)" />
      <Layer data={near} fill="var(--city-near)" lights />
    </svg>
  )
}

/** A subtle bat-signal: a faint beam from a rooftop to a soft pool of light on the clouds. */
export function BatSignal() {
  const svgRef = useRef(null)
  const beamRef = useRef(null)
  const spotRef = useRef(null)
  const batRef = useRef(null)

  useEffect(() => {
    // On narrow screens only the right edge of the sky is visible, so park the light top-right.
    const place = () => {
      const narrow = window.innerWidth < 720
      const src = narrow ? { x: 1400, y: 900 } : { x: 1250, y: 900 }
      const { x, y } = narrow ? { x: 1320, y: 135 } : { x: 1090, y: 250 }
      const k = narrow ? 0.72 : 1
      const rx = 165 * k
      const ry = 100 * k
      beamRef.current?.setAttribute(
        'points',
        `${src.x - 14},${src.y} ${src.x + 14},${src.y} ${x + rx * 0.92},${y + ry * 0.25} ${x - rx * 0.92},${y + ry * 0.25}`,
      )
      spotRef.current?.setAttribute('cx', x)
      spotRef.current?.setAttribute('cy', y)
      spotRef.current?.setAttribute('rx', rx)
      spotRef.current?.setAttribute('ry', ry)
      batRef.current?.setAttribute('transform', `translate(${x - 125 * k} ${y - 66 * k}) scale(${2.5 * k})`)
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [])

  return (
    <svg
      ref={svgRef}
      className="bat-signal"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff6cf" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffe9a3" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="spot">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#f5d76e" stopOpacity="0.75" />
          <stop offset="0.85" stopColor="#f5c518" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f5c518" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="cloudblur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>

      <g className="clouds" filter="url(#cloudblur)">
        <ellipse cx="980" cy="220" rx="320" ry="70" fill="var(--cloud)" />
        <ellipse cx="1260" cy="300" rx="280" ry="60" fill="var(--cloud)" />
        <ellipse cx="720" cy="140" rx="260" ry="50" fill="var(--cloud)" />
      </g>

      <polygon ref={beamRef} fill="url(#beam)" filter="url(#soft)" className="beam" />
      <g className="spot-group">
        <ellipse ref={spotRef} rx="165" ry="100" fill="url(#spot)" filter="url(#soft)" />
        <path ref={batRef} d={BAT_PATH} fill="#0b0b0d" opacity="0.88" />
      </g>
    </svg>
  )
}
