import { useEffect, useState } from 'react'

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const mins = Math.floor((ms % 3600000) / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return { days, hours, mins, secs, done: ms === 0 }
}

export default function Countdown({ date, compact = false }) {
  const [t, setT] = useState(() => diff(date))

  useEffect(() => {
    const id = setInterval(() => setT(diff(date)), 1000)
    return () => clearInterval(id)
  }, [date])

  if (t.done) return <span className="countdown countdown--live">Happening now</span>

  const units = [
    { v: t.days, l: 'd' },
    { v: t.hours, l: 'h' },
    { v: t.mins, l: 'm' },
    { v: t.secs, l: 's' },
  ]

  return (
    <div className={`countdown ${compact ? 'countdown--compact' : ''}`} aria-label="Time until event">
      {units.map((u) => (
        <div key={u.l} className="countdown__unit">
          <span className="countdown__num">{String(u.v).padStart(2, '0')}</span>
          <span className="countdown__label">{u.l}</span>
        </div>
      ))}
    </div>
  )
}
