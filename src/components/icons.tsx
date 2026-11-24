import { CalendarDays, CloudSun, Moon, Sun, Trash2, UserSquare } from 'lucide-react'
import type { PeriodId } from '../types/appointment'

export const CalendarBlank = () => <CalendarDays size={20} className="input__icon" aria-hidden />
export const UserIcon = () => <UserSquare size={20} className="input__icon" aria-hidden />
export const TrashIcon = () => <Trash2 size={18} aria-hidden />

const PERIOD_ICONS = { morning: Sun, afternoon: CloudSun, night: Moon } as const

export function PeriodIcon({ period }: { period: PeriodId }) {
  const Icon = PERIOD_ICONS[period]
  return <Icon size={20} className="period__icon" aria-hidden />
}
