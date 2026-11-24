interface HourButtonProps {
  hour: string
  selected: boolean
  disabled: boolean
  onSelect: (hour: string) => void
}

export function HourButton({ hour, selected, disabled, onSelect }: HourButtonProps) {
  return (
    <button
      type="button"
      className={`hour ${selected ? 'hour--selected' : ''}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(hour)}
    >
      {hour}
    </button>
  )
}
