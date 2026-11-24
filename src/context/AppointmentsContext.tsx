import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Appointment, NewAppointment } from '../types/appointment'
import { STORAGE_KEY } from '../constants/schedule'
import { todayISO } from '../utils/date'

export interface AppointmentsContextData {
  appointments: Appointment[]
  /** Data escolhida no filtro da agenda (lado direito). */
  selectedDate: string
  setSelectedDate: (date: string) => void
  addAppointment: (data: NewAppointment) => Appointment
  removeAppointment: (id: string) => void
}

export const AppointmentsContext = createContext<AppointmentsContextData | null>(null)

function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Appointment[]) : []
  } catch {
    return []
  }
}

interface AppointmentsProviderProps {
  children: ReactNode
}

export function AppointmentsProvider({ children }: AppointmentsProviderProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments)
  const [selectedDate, setSelectedDate] = useState<string>(todayISO)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
    } catch {
      /* armazenamento indisponível: mantém apenas em memória */
    }
  }, [appointments])

  const addAppointment = useCallback((data: NewAppointment) => {
    const appointment: Appointment = {
      ...data,
      clientName: data.clientName.trim(),
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    setAppointments((prev) => [...prev, appointment])
    return appointment
  }, [])

  const removeAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const value = useMemo(
    () => ({ appointments, selectedDate, setSelectedDate, addAppointment, removeAppointment }),
    [appointments, selectedDate, addAppointment, removeAppointment],
  )

  return <AppointmentsContext value={value}>{children}</AppointmentsContext>
}
