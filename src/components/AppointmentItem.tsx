import type { Appointment } from '../types/appointment'
import { TrashIcon } from './icons'

interface AppointmentItemProps {
  appointment: Appointment
  onRemove: (id: string) => void
}

export function AppointmentItem({ appointment, onRemove }: AppointmentItemProps) {
  return (
    <li className="appointment">
      <strong className="appointment__hour">{appointment.hour}</strong>
      <span className="appointment__client">{appointment.clientName}</span>
      <button
        type="button"
        className="appointment__remove"
        aria-label={`Remover agendamento de ${appointment.clientName} às ${appointment.hour}`}
        title="Remover agendamento"
        onClick={() => onRemove(appointment.id)}
      >
        <TrashIcon />
      </button>
    </li>
  )
}
