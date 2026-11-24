import { CalendarBlank } from './icons'
import { ChevronDown } from 'lucide-react'

interface DateInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  min?: string
  invalid?: boolean
  compact?: boolean
  ariaLabel?: string
}

/** Input de data reutilizado no formulário e no filtro da agenda. */
export function DateInput({ id, value, onChange, min, invalid, compact, ariaLabel }: DateInputProps) {
  return (
    <div className={`input ${invalid ? 'input--invalid' : ''} ${compact ? 'input--compact' : ''}`}>
      <CalendarBlank />
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />
      <ChevronDown size={16} className="input__chevron" aria-hidden />
    </div>
  )
}
