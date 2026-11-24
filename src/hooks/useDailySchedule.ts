import { useMemo } from 'react'
import type { AppointmentsByPeriod } from '../types/appointment'
import { getPeriodId } from '../utils/date'
import { useAppointments } from './useAppointments'

/**
 * Retorna os agendamentos de uma data, ordenados por horário e agrupados
 * por período (filter -> sort -> reduce).
 */
export function useDailySchedule(date: string) {
  const { appointments } = useAppointments()

  return useMemo(() => {
    const ofDay = appointments
      .filter((a) => a.date === date)
      .sort((a, b) => a.hour.localeCompare(b.hour))

    const byPeriod = ofDay.reduce<AppointmentsByPeriod>(
      (acc, appointment) => {
        acc[getPeriodId(appointment.hour)].push(appointment)
        return acc
      },
      { morning: [], afternoon: [], night: [] },
    )

    return { total: ofDay.length, byPeriod }
  }, [appointments, date])
}
