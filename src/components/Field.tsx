import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor?: string
  error?: string
  children: ReactNode
}

/** Agrupa label + controle + mensagem de erro. */
export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="field">
      {htmlFor ? (
        <label className="field__label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : (
        <span className="field__label">{label}</span>
      )}
      {children}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
