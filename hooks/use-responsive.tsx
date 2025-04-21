"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  breakpoint: Breakpoint
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: "lg",
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      let breakpoint: Breakpoint = "xs"
      if (width >= 1536) breakpoint = "2xl"
      else if (width >= 1280) breakpoint = "xl"
      else if (width >= 1024) breakpoint = "lg"
      else if (width >= 768) breakpoint = "md"
      else if (width >= 640) breakpoint = "sm"
      else breakpoint = "xs"

      setState({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
        breakpoint,
      })
    }

    // Inicializar
    handleResize()

    // Adicionar event listener
    window.addEventListener("resize", handleResize)

    // Limpar event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return state
}
