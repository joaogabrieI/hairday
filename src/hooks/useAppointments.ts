import { useContext } from 'react'
import { AppointmentsContext } from '../context/AppointmentsContext'

/** Acessa o contexto de agendamentos. Deve ser usado dentro de <AppointmentsProvider>. */
export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (!context) throw new Error('useAppointments deve ser usado dentro de AppointmentsProvider')
  return context
}
