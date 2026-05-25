import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

export function Chip({ selected = false, children, className = "", ...props }: ChipProps) {
  return (
    <button
      className={`chip ${selected ? "chip-selected" : ""} ${className}`.trim()}
      type="button"
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}
