import type { Period } from '../types/appointment'

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => `${String(start + i).padStart(2, '0')}:00`)

/** Períodos e horários disponíveis, em ordem crescente. */
export const PERIODS: Period[] = [
  { id: 'morning', label: 'Manhã', range: '09h-12h', hours: range(9, 12) },
  { id: 'afternoon', label: 'Tarde', range: '13h-18h', hours: range(13, 18) },
  { id: 'night', label: 'Noite', range: '19h-21h', hours: range(19, 21) },
]

export const STORAGE_KEY = '@hairday:appointments'
