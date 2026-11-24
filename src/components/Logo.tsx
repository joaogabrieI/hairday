import { Scissors } from 'lucide-react'

export function Logo() {
  return (
    <div className="logo" aria-label="HairDay">
      <Scissors size={18} aria-hidden />
      <span>
        Hair<strong>Day</strong>
      </span>
    </div>
  )
}
