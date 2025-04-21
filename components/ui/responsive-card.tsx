import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveCardProps {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  fullWidth?: boolean
  noPadding?: boolean
}

export function ResponsiveCard({
  title,
  description,
  children,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  fullWidth = false,
  noPadding = false,
}: ResponsiveCardProps) {
  return (
    <Card
      className={cn(
        "border rounded-lg overflow-hidden",
        fullWidth ? "w-full" : "w-full sm:max-w-md md:max-w-lg lg:max-w-xl",
        className,
      )}
    >
      {(title || description) && (
        <CardHeader className={cn("px-4 py-3 sm:px-6 sm:py-4", headerClassName)}>
          {title && <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(noPadding ? "p-0" : "px-4 py-3 sm:px-6 sm:py-4", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter
          className={cn("px-4 py-3 sm:px-6 sm:py-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-4", footerClassName)}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
