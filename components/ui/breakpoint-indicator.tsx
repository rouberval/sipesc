"use client"

import { useResponsive } from "@/hooks/use-responsive"

interface BreakpointIndicatorProps {
  showAlways?: boolean
}

export function BreakpointIndicator({ showAlways = false }: BreakpointIndicatorProps) {
  const { breakpoint, width } = useResponsive()

  // Apenas mostrar em desenvolvimento, a menos que showAlways seja true
  if (process.env.NODE_ENV !== "development" && !showAlways) {
    return null
  }

  const getColor = () => {
    switch (breakpoint) {
      case "xs":
        return "bg-pink-500"
      case "sm":
        return "bg-red-500"
      case "md":
        return "bg-orange-500"
      case "lg":
        return "bg-green-500"
      case "xl":
        return "bg-blue-500"
      case "2xl":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <div className={`px-2 py-1 rounded-md text-white text-xs font-mono ${getColor()}`}>
        {breakpoint} ({width}px)
      </div>
    </div>
  )
}
