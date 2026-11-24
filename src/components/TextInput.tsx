import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  invalid?: boolean
}

export function TextInput({ icon, invalid, ...props }: TextInputProps) {
  return (
    <div className={`input ${invalid ? 'input--invalid' : ''}`}>
      {icon}
      <input type="text" aria-invalid={invalid || undefined} {...props} />
    </div>
  )
}
