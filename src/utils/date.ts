import type { PeriodId } from '../types/appointment'
import { PERIODS } from '../constants/schedule'

/** Data local de hoje no formato YYYY-MM-DD. */
export function todayISO(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

/** Verifica se data+hora já passaram. */
export function isPast(date: string, hour: string): boolean {
  return new Date(`${date}T${hour}:00`).getTime() < Date.now()
}

/** Descobre a qual período um horário pertence. */
export function getPeriodId(hour: string): PeriodId {
  const period = PERIODS.find((p) => p.hours.includes(hour))
  return period ? period.id : 'night'
}
