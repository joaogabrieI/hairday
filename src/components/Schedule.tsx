import { PERIODS } from '../constants/schedule'
import { useAppointments } from '../hooks/useAppointments'
import { useDailySchedule } from '../hooks/useDailySchedule'
import { DateInput } from './DateInput'
import { PeriodSection } from './PeriodSection'

/** Área principal: agenda do dia filtrada pela data selecionada. */
export function Schedule() {
  const { selectedDate, setSelectedDate, removeAppointment } = useAppointments()
  const { byPeriod } = useDailySchedule(selectedDate)

  return (
    <main className="schedule">
      <header className="schedule__header">
        <div>
          <h2>Sua agenda</h2>
          <p>Consulte os seus cortes de cabelo agendados por dia</p>
        </div>
        <DateInput
          id="schedule-date"
          ariaLabel="Filtrar agenda por data"
          value={selectedDate}
          compact
          onChange={(v) => v && setSelectedDate(v)}
        />
      </header>

      <div className="schedule__periods">
        {PERIODS.map((period) => (
          <PeriodSection
            key={period.id}
            period={period}
            appointments={byPeriod[period.id]}
            onRemove={removeAppointment}
          />
        ))}
      </div>
    </main>
  )
}
