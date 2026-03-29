'use client'

interface ScoreRingProps {
  label: string
  value: number
  locked?: boolean
}

export function ScoreRing({ label, value, locked = false }: ScoreRingProps) {
  const radius = 24
  const circ = 2 * Math.PI * radius
  const fill = locked ? 0 : (value / 10) * circ
  const color = locked ? '#d4cdc0' : value >= 7 ? '#2a6b4a' : value >= 5 ? '#c9a84c' : '#b85c38'
  const textColor = locked ? '#d4cdc0' : value >= 7 ? '#2a6b4a' : value >= 5 ? '#c9a84c' : '#b85c38'

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke="#e8e0d0"
            strokeWidth="4"
          />
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${fill} ${circ}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {locked ? (
            <svg className="w-4 h-4 text-[#d4cdc0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            <span className="text-xs font-bold" style={{ color: textColor }}>{value}</span>
          )}
        </div>
      </div>
      <span className="font-body text-xs text-[#6b6560] text-center leading-tight">{label}</span>
    </div>
  )
}
