import type { Appointment, Period } from '../types/appointment'
import { AppointmentItem } from './AppointmentItem'
import { PeriodIcon } from './icons'

interface PeriodSectionProps {
  period: Period
  appointments: Appointment[]
  onRemove: (id: string) => void
}

/** Bloco de um período (Manhã/Tarde/Noite) com a lista de agendamentos. */
export function PeriodSection({ period, appointments, onRemove }: PeriodSectionProps) {
  return (
    <section className="period" aria-labelledby={`period-${period.id}`} data-testid={`period-${period.id}`}>
      <header className="period__header">
        <div className="period__title">
          <PeriodIcon period={period.id} />
          <h3 id={`period-${period.id}`}>{period.label}</h3>
        </div>
        <span className="period__range">{period.range}</span>
      </header>

      {appointments.length > 0 ? (
        <ul className="period__list">
          {appointments.map((appointment) => (
            <AppointmentItem key={appointment.id} appointment={appointment} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <p className="period__empty">Nenhum agendamento para este período</p>
      )}
    </section>
  )
}
