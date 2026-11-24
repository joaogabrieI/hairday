import { PERIODS } from '../constants/schedule'
import { HourButton } from './HourButton'

interface HourPickerProps {
  value: string
  onChange: (hour: string) => void
  isUnavailable: (hour: string) => boolean
}

/** Lista os horários agrupados por período (Manhã, Tarde, Noite). */
export function HourPicker({ value, onChange, isUnavailable }: HourPickerProps) {
  return (
    <div className="hour-picker">
      {PERIODS.map((period) => (
        <div key={period.id} className="hour-picker__group">
          <span className="hour-picker__title">{period.label}</span>
          <div className="hour-picker__list" role="group" aria-label={`Horários da ${period.label.toLowerCase()}`}>
            {period.hours.map((hour) => (
              <HourButton
                key={hour}
                hour={hour}
                selected={value === hour}
                disabled={isUnavailable(hour)}
                onSelect={onChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
