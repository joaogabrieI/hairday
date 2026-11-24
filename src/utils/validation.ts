import type { Appointment, FormErrors, NewAppointment } from '../types/appointment'
import { PERIODS } from '../constants/schedule'
import { isPast, todayISO } from './date'

const ALL_HOURS = PERIODS.flatMap((p) => p.hours)

/** Valida os dados do formulário e retorna os erros por campo. */
export function validateAppointment(data: NewAppointment, existing: Appointment[]): FormErrors {
  const errors: FormErrors = {}
  const name = data.clientName.trim()

  if (!data.date) errors.date = 'Selecione uma data.'
  else if (data.date < todayISO()) errors.date = 'Não é possível agendar em uma data passada.'

  if (!data.hour) errors.hour = 'Selecione um horário.'
  else if (!ALL_HOURS.includes(data.hour)) errors.hour = 'Horário inválido.'
  else if (data.date && isPast(data.date, data.hour)) errors.hour = 'Este horário já passou.'
  else if (existing.some((a) => a.date === data.date && a.hour === data.hour))
    errors.hour = 'Este horário já está ocupado.'

  if (!name) errors.clientName = 'Informe o nome do cliente.'
  else if (name.length < 3) errors.clientName = 'O nome deve ter pelo menos 3 caracteres.'
  else if (name.length > 60) errors.clientName = 'O nome deve ter no máximo 60 caracteres.'
  else if (!/^[\p{L}\s'.-]+$/u.test(name)) errors.clientName = 'Use apenas letras no nome.'

  return errors
}
