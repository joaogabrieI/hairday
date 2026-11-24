import { useState, type FormEvent } from 'react'
import type { FormErrors, NewAppointment } from '../types/appointment'
import { useAppointments } from '../hooks/useAppointments'
import { isPast, todayISO } from '../utils/date'
import { validateAppointment } from '../utils/validation'
import { Field } from './Field'
import { DateInput } from './DateInput'
import { HourPicker } from './HourPicker'
import { TextInput } from './TextInput'
import { Button } from './Button'
import { UserIcon } from './icons'

const initialForm = (): NewAppointment => ({ date: todayISO(), hour: '', clientName: '' })

/** Painel lateral com o formulário de novo agendamento. */
export function ScheduleForm() {
  const { appointments, addAppointment, setSelectedDate } = useAppointments()
  const [form, setForm] = useState<NewAppointment>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})

  function update<K extends keyof NewAppointment>(key: K, value: NewAppointment[K]) {
    setForm((prev) => ({ ...prev, [key]: value, ...(key === 'date' ? { hour: '' } : {}) }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const isUnavailable = (hour: string) =>
    !form.date ||
    isPast(form.date, hour) ||
    appointments.some((a) => a.date === form.date && a.hour === hour)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateAppointment(form, appointments)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    addAppointment(form)
    setSelectedDate(form.date)
    setForm({ ...initialForm(), date: form.date })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <header className="form__header">
        <h1>Agende um atendimento</h1>
        <p>Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
      </header>

      <Field label="Data" htmlFor="form-date" error={errors.date}>
        <DateInput
          id="form-date"
          value={form.date}
          min={todayISO()}
          invalid={!!errors.date}
          onChange={(v) => update('date', v)}
        />
      </Field>

      <Field label="Horários" error={errors.hour}>
        <HourPicker value={form.hour} onChange={(v) => update('hour', v)} isUnavailable={isUnavailable} />
      </Field>

      <Field label="Cliente" htmlFor="form-client" error={errors.clientName}>
        <TextInput
          id="form-client"
          icon={<UserIcon />}
          placeholder="Helena Souza"
          autoComplete="off"
          maxLength={60}
          value={form.clientName}
          invalid={!!errors.clientName}
          onChange={(e) => update('clientName', e.target.value)}
        />
      </Field>

      <Button type="submit" className="form__submit">
        Agendar
      </Button>
    </form>
  )
}
