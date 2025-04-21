import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Columns = 1 | 2 | 3 | 4 | 5 | 6

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  xs?: Columns
  sm?: Columns
  md?: Columns
  lg?: Columns
  xl?: Columns
}

export function ResponsiveGrid({ children, className, gap = "md", xs = 1, sm, md, lg, xl }: ResponsiveGridProps) {
  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  }

  const getColumnsClass = (cols: Columns, breakpoint: string) => {
    if (breakpoint === "") {
      return `grid-cols-${cols}`
    }
    return `${breakpoint}:grid-cols-${cols}`
  }

  return (
    <div
      className={cn(
        "grid",
        getColumnsClass(xs, ""),
        sm && getColumnsClass(sm, "sm"),
        md && getColumnsClass(md, "md"),
        lg && getColumnsClass(lg, "lg"),
        xl && getColumnsClass(xl, "xl"),
        gapClasses[gap],
        className,
      )}
    >
      {children}
    </div>
  )
}
