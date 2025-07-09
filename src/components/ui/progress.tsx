import * as React from "react"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

export function Progress({ value = 0, className, ...props }: ProgressProps) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className || ""}`} {...props}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
} 