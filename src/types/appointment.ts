/** Identificador dos três períodos do dia exibidos na agenda. */
export type PeriodId = 'morning' | 'afternoon' | 'night'

/** Um agendamento cadastrado. `date` no formato YYYY-MM-DD e `hour` no formato HH:mm. */
export interface Appointment {
  id: string
  clientName: string
  date: string
  hour: string
  createdAt: number
}

/** Dados enviados pelo formulário para criar um agendamento. */
export type NewAppointment = Omit<Appointment, 'id' | 'createdAt'>

/** Definição de um período (Manhã, Tarde, Noite). */
export interface Period {
  id: PeriodId
  label: string
  range: string
  hours: string[]
}

/** Agendamentos agrupados por período. */
export type AppointmentsByPeriod = Record<PeriodId, Appointment[]>

/** Erros de validação do formulário, por campo. */
export type FormErrors = Partial<Record<keyof NewAppointment, string>>
